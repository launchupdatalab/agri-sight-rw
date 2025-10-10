import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CommodityData {
  id: string;
  name: string;
  currentPrice: number;
  change: number;
  trend: "up" | "down";
  volume: string;
  markets: string;
}

const Market = () => {
  const { toast } = useToast();
  const [commodities, setCommodities] = useState<CommodityData[]>([]);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchMarketData = async (showToast = false) => {
    try {
      setRefreshing(true);
      
      // Call the edge function to simulate API and update database
      const { data: apiData, error: apiError } = await supabase.functions.invoke('market-data');
      
      if (apiError) throw apiError;

      // Fetch current prices from database
      const { data: prices, error: pricesError } = await supabase
        .from('market_prices')
        .select(`
          *,
          commodities (*)
        `)
        .order('recorded_at', { ascending: false });

      if (pricesError) throw pricesError;

      // Get unique latest prices for each commodity
      const latestPrices = prices?.reduce((acc: any[], price: any) => {
        if (!acc.find((p: any) => p.commodities.id === price.commodities.id)) {
          acc.push(price);
        }
        return acc;
      }, []);

      // Format commodities data
      const formattedCommodities: CommodityData[] = latestPrices?.map((price: any) => ({
        id: price.commodities.id,
        name: price.commodities.name,
        currentPrice: parseFloat(price.price),
        change: parseFloat(price.change_percent),
        trend: parseFloat(price.change_percent) > 0 ? "up" : "down",
        volume: price.volume,
        markets: `${price.active_markets} active markets`,
      })) || [];

      setCommodities(formattedCommodities);

      // Fetch price history for chart
      const { data: history, error: historyError } = await supabase
        .from('price_history')
        .select(`
          *,
          commodities (name)
        `)
        .order('recorded_at', { ascending: true });

      if (historyError) throw historyError;

      // Format chart data
      const chartData: any = {};
      history?.forEach((record: any) => {
        if (!chartData[record.week_label]) {
          chartData[record.week_label] = { week: record.week_label };
        }
        chartData[record.week_label][record.commodities.name.toLowerCase()] = parseFloat(record.price);
      });

      setPriceData(Object.values(chartData));
      setLastUpdate(new Date().toLocaleTimeString());
      
      if (showToast) {
        toast({
          title: "Market data refreshed",
          description: "Latest prices have been updated",
        });
      }
    } catch (error: any) {
      console.error('Error fetching market data:', error);
      toast({
        title: "Error fetching market data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchMarketData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Insights</h1>
          <p className="text-muted-foreground">
            Live crop prices and market trends across Rwanda
            {lastUpdate && <span className="ml-2 text-xs">• Last updated: {lastUpdate}</span>}
          </p>
        </div>
        <Button
          onClick={() => fetchMarketData(true)}
          disabled={refreshing}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Loading market data...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Market;
