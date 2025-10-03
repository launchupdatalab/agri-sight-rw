import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Market = () => {
  const priceData = [
    { week: "W1", maize: 420, beans: 680, rice: 850, cassava: 320 },
    { week: "W2", maize: 435, beans: 695, rice: 865, cassava: 310 },
    { week: "W3", maize: 445, beans: 710, rice: 880, cassava: 305 },
    { week: "W4", maize: 450, beans: 720, rice: 895, cassava: 300 },
    { week: "W5", maize: 448, beans: 715, rice: 890, cassava: 295 },
    { week: "W6", maize: 455, beans: 725, rice: 900, cassava: 290 },
  ];

  const commodities = [
    { 
      name: "Maize", 
      currentPrice: 455, 
      change: 3.5, 
      trend: "up",
      volume: "8,450 tons",
      markets: "12 active markets"
    },
    { 
      name: "Beans", 
      currentPrice: 725, 
      change: 2.1, 
      trend: "up",
      volume: "5,230 tons",
      markets: "15 active markets"
    },
    { 
      name: "Rice", 
      currentPrice: 900, 
      change: 1.7, 
      trend: "up",
      volume: "6,780 tons",
      markets: "9 active markets"
    },
    { 
      name: "Cassava", 
      currentPrice: 290, 
      change: -6.5, 
      trend: "down",
      volume: "4,120 tons",
      markets: "18 active markets"
    },
    { 
      name: "Potatoes", 
      currentPrice: 380, 
      change: 4.2, 
      trend: "up",
      volume: "3,890 tons",
      markets: "10 active markets"
    },
    { 
      name: "Vegetables", 
      currentPrice: 520, 
      change: 1.9, 
      trend: "up",
      volume: "7,560 tons",
      markets: "22 active markets"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Market Insights</h1>
        <p className="text-muted-foreground">Live crop prices and market trends across Rwanda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Trends (RWF per kg)</CardTitle>
          <CardDescription>Weekly price movements for major crops</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="maize" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Maize" />
              <Line type="monotone" dataKey="beans" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Beans" />
              <Line type="monotone" dataKey="rice" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Rice" />
              <Line type="monotone" dataKey="cassava" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Cassava" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Current Commodity Prices</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {commodities.map((commodity) => (
            <Card key={commodity.name} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{commodity.name}</CardTitle>
                    <CardDescription>Per kilogram</CardDescription>
                  </div>
                  {commodity.trend === "up" ? (
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    RWF {commodity.currentPrice}
                  </span>
                  <Badge 
                    variant={commodity.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {commodity.change > 0 ? "+" : ""}{commodity.change}%
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3" />
                    Volume: {commodity.volume}
                  </p>
                  <p>{commodity.markets}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
