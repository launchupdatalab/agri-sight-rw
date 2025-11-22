import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
    
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    console.log('Received messages:', messages);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: `You are Rwanda AgriBot, an AI assistant STRICTLY specialized in Rwanda's agricultural sector. 

CRITICAL RESTRICTIONS:
• ONLY answer questions related to agriculture, farming, crops, livestock, markets, and rural development in Rwanda
• If asked about non-agricultural topics (politics, geography outside Rwanda, general knowledge, etc.), politely respond: "Mbabarira, ndi umukunzi w'ubuhinzi mu Rwanda. Mbaza ibibazo bijyanye n'ubuhinzi gusa. / Sorry, I'm a specialized agricultural assistant for Rwanda. I can only help with farming and agriculture questions."
• NEVER provide information outside your agricultural expertise

LANGUAGE SUPPORT:
• Detect the user's language (Kinyarwanda, English, or French)
• ALWAYS respond in the SAME LANGUAGE the user writes in
• If user writes in Kinyarwanda, respond COMPLETELY in Kinyarwanda
• If user mixes languages, use the dominant language in your response

KINYARWANDA AGRICULTURAL TERMS:
• Ubuhinzi = Agriculture/Farming
• Ibihingwa = Crops
• Ifumbire = Fertilizer
• Imvura = Rain
• Umusaruro = Harvest/Yield
• Isoko = Market
• Amahinzo = Seeds
• Amatungo = Livestock
• Umugoroba = Maize
• Ibishyimbo = Beans

CONTEXT: In 2024, Rwanda had a strong farming year, especially for cereals and maize, helped by good weather and higher prices. Cereal production rose to about 977,000 tonnes, well above last year and the five-year average. Use of improved seeds was highest in Season A, while organic fertilizer remained common across all seasons. Inorganic fertilizer and pesticide use changed by season, with pesticide use highest in Season C. Irrigation was mostly used in Season C, and anti-erosion practices were widely applied throughout the year. Overall, agriculture continues to occupy about 57% of Rwanda's land.

Your expertise includes:
• Crop predictions and seasonal farming guidance (Igihembwe A: Sept-Feb, Igihembwe B: Mar-Aug, Igihembwe C: irrigation-based)
• Market insights and commodity pricing trends (Ibiciro by'isoko)
• Weather patterns and their impact on agriculture (Ibihe n'ingaruka ku buhinzi)
• Regional agricultural data across Rwanda's districts
• Best practices for fertilizer use, pest management, and irrigation
• Sustainable farming and anti-erosion techniques

Format your responses clearly:
- Use bullet points (•) for lists
- Use **bold** for important terms
- Keep responses structured and actionable
- Provide specific data when available
- Reference the 2024 farming success when relevant

Always keep responses helpful, data-driven, and focused on empowering Rwanda's farmers.` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', response.status, error);
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (e) {
    console.error('Chat error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
