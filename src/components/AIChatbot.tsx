import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    streamChat(input);
    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed h-14 w-14 rounded-full shadow-lg z-50 transition-all hover:scale-110",
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
          )}
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card 
          className={cn(
            "fixed shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300",
            isMobile 
              ? "inset-0 rounded-none w-full h-full" 
              : "bottom-4 right-4 w-[400px] h-[600px] rounded-lg"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-600 to-blue-600">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-white" />
              <div>
                <h3 className="font-semibold text-white">Rwanda AgriBot</h3>
                <p className="text-xs text-white/80">Agricultural Intelligence Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl mb-4">
                  <MessageCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-lg mb-2">Welcome to Rwanda AgriBot</h4>
                  <p className="text-muted-foreground text-sm">
                    Your intelligent companion for Rwanda's agricultural insights, crop guidance, and market intelligence.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>💡 Ask about crop recommendations</p>
                  <p>📊 Get market price insights</p>
                  <p>🌾 Learn about seasonal farming</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg px-4 py-2.5 break-words shadow-sm",
                        msg.role === "user"
                          ? "bg-gradient-to-br from-green-600 to-blue-600 text-white"
                          : "bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 text-foreground border border-green-200 dark:border-green-800"
                      )}
                    >
                      <div className={cn(
                        "prose prose-sm max-w-none",
                        msg.role === "assistant" && "prose-headings:text-green-900 dark:prose-headings:text-green-100 prose-strong:text-green-800 dark:prose-strong:text-green-200"
                      )}>
                        {msg.content.split('\n').map((line, i) => {
                          // Handle bullet points
                          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                            return <li key={i} className="ml-4">{line.trim().substring(1).trim()}</li>;
                          }
                          // Handle numbered lists
                          if (/^\d+\./.test(line.trim())) {
                            return <li key={i} className="ml-4">{line.trim().replace(/^\d+\.\s*/, '')}</li>;
                          }
                          // Handle bold text
                          if (line.includes('**')) {
                            const parts = line.split('**');
                            return (
                              <p key={i}>
                                {parts.map((part, j) => 
                                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                )}
                              </p>
                            );
                          }
                          return line.trim() ? <p key={i}>{line}</p> : <br key={i} />;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in-0">
                    <div className="bg-muted rounded-lg px-4 py-2.5">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, markets, or farming..."
                disabled={isLoading}
                className="flex-1 border-green-200 dark:border-green-800 focus-visible:ring-green-500"
                autoFocus={!isMobile}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="shrink-0 bg-gradient-to-br from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
