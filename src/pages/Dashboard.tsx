import { TrendingUp, Users, Wheat, DollarSign, BarChart3, TrendingDown, MapPin, Calendar, Filter, Download, RefreshCw, Sprout, CloudRain, Sun, Snowflake } from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, ReferenceLine 
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-agriculture.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedSeason, setSelectedSeason] = useState<string>("current");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [marketData, setMarketData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Detect current season based on Rwanda's agricultural calendar
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // 1-12
    // Season A: September to February (main planting)
    // Season B: March to August (secondary planting)
    if (month >= 9 || month <= 2) {
      return { name: "Season A 2024", icon: CloudRain, period: "Sept - Feb" };
    } else {
      return { name: "Season B 2024", icon: Sun, period: "Mar - Aug" };
    }
  };

  const currentSeason = getCurrentSeason();

  // Fetch real market data
  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('market_prices')
          .select(`
            *,
            commodities (name, category, unit)
          `)
          .order('recorded_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setMarketData(data || []);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const productionData = [
    { month: "Jan", value: 2400 },
    { month: "Feb", value: 2800 },
    { month: "Mar", value: 3200 },
    { month: "Apr", value: 3600 },
    { month: "May", value: 4200 },
    { month: "Jun", value: 4800 },
  ];
  
  const cropDistribution = [
    { name: "Maize", value: 35, color: "hsl(var(--chart-1))" },
    { name: "Beans", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Rice", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Cassava", value: 12, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 8, color: "hsl(var(--chart-5))" },
  ];
  
  const districtYields = [
    { district: "Kigali", yield: 4.2 },
    { district: "Huye", yield: 3.8 },
    { district: "Musanze", yield: 4.5 },
    { district: "Rusizi", yield: 3.2 },
    { district: "Rubavu", yield: 3.9 },
  ];

  const seasonalTrends = [
    { season: "Q1 2024", maize: 52000, beans: 38000, rice: 45000, cassava: 32000 },
    { season: "Q2 2024", maize: 58000, beans: 42000, rice: 48000, cassava: 35000 },
    { season: "Q3 2024", maize: 64000, beans: 47000, rice: 52000, cassava: 38000 },
    { season: "Q4 2024", maize: 70000, beans: 51000, rice: 56000, cassava: 41000 },
  ];

  const topFarmers = [
    { rank: 1, name: "Jean Mukasa", district: "Musanze", yield: "5.2 t/ha", crops: "Maize, Beans", performance: 95 },
    { rank: 2, name: "Marie Uwase", district: "Huye", yield: "4.9 t/ha", crops: "Rice, Vegetables", performance: 92 },
    { rank: 3, name: "Patrick Nkusi", district: "Kigali", yield: "4.7 t/ha", crops: "Maize, Cassava", performance: 90 },
    { rank: 4, name: "Grace Ingabire", district: "Nyagatare", yield: "4.6 t/ha", crops: "Beans, Maize", performance: 88 },
    { rank: 5, name: "Joseph Habimana", district: "Rubavu", yield: "4.5 t/ha", crops: "Vegetables, Rice", performance: 87 },
  ];

  const districtComparison = [
    { 
      district: "Kigali", 
      production: 45200, 
      farmers: 12450, 
      avgYield: 4.2, 
      area: 10800,
      trend: "up",
      growth: "+12%"
    },
    { 
      district: "Huye", 
      production: 62400, 
      farmers: 18900, 
      avgYield: 3.8, 
      area: 16400,
      trend: "up",
      growth: "+8%"
    },
    { 
      district: "Musanze", 
      production: 58900, 
      farmers: 15600, 
      avgYield: 4.5, 
      area: 13100,
      trend: "up",
      growth: "+15%"
    },
    { 
      district: "Rusizi", 
      production: 52300, 
      farmers: 21200, 
      avgYield: 3.2, 
      area: 16300,
      trend: "down",
      growth: "-3%"
    },
    { 
      district: "Rubavu", 
      production: 48700, 
      farmers: 14800, 
      avgYield: 3.9, 
      area: 12500,
      trend: "up",
      growth: "+6%"
    },
    { 
      district: "Nyagatare", 
      production: 72100, 
      farmers: 24600, 
      avgYield: 3.5, 
      area: 20600,
      trend: "up",
      growth: "+10%"
    },
  ];

  const marketPrices = [
    { month: "Jan", maize: 420, beans: 680, rice: 850 },
    { month: "Feb", maize: 435, beans: 695, rice: 865 },
    { month: "Mar", maize: 445, beans: 710, rice: 880 },
    { month: "Apr", maize: 450, beans: 720, rice: 895 },
    { month: "May", maize: 448, beans: 715, rice: 890 },
    { month: "Jun", maize: 455, beans: 725, rice: 900 },
  ];

  // Data Science Visualizations Data
  const yieldVsInvestment = [
    { investment: 50, yield: 2.8, district: "Kigali", size: 400 },
    { investment: 75, yield: 3.2, district: "Huye", size: 600 },
    { investment: 120, yield: 4.5, district: "Musanze", size: 500 },
    { investment: 95, yield: 3.8, district: "Rubavu", size: 450 },
    { investment: 85, yield: 3.5, district: "Nyagatare", size: 800 },
    { investment: 60, yield: 3.0, district: "Rusizi", size: 550 },
    { investment: 110, yield: 4.2, district: "Kayonza", size: 420 },
    { investment: 140, yield: 4.8, district: "Gakenke", size: 380 },
  ];

  const yieldDistribution = [
    { range: "Very Low Yield", label: "1.5-2.0 t/ha", frequency: 5, cumulative: 5 },
    { range: "Low Yield", label: "2.0-2.5 t/ha", frequency: 12, cumulative: 17 },
    { range: "Below Average", label: "2.5-3.0 t/ha", frequency: 28, cumulative: 45 },
    { range: "Average", label: "3.0-3.5 t/ha", frequency: 42, cumulative: 87 },
    { range: "Above Average", label: "3.5-4.0 t/ha", frequency: 38, cumulative: 125 },
    { range: "Good Yield", label: "4.0-4.5 t/ha", frequency: 25, cumulative: 150 },
    { range: "High Yield", label: "4.5-5.0 t/ha", frequency: 15, cumulative: 165 },
    { range: "Excellent", label: "5.0+ t/ha", frequency: 8, cumulative: 173 },
  ];

  const productivityFactors = [
    { factor: "Soil Quality", positive: 85, negative: 15 },
    { factor: "Water Access", positive: 78, negative: 22 },
    { factor: "Fertilizer Use", positive: 92, negative: 8 },
    { factor: "Pest Control", positive: 68, negative: 32 },
    { factor: "Tech Adoption", positive: 55, negative: 45 },
    { factor: "Training", positive: 72, negative: 28 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Enhanced Hero Section with Season Indicator */}
      <div className="relative rounded-2xl overflow-hidden h-[400px] bg-gradient-to-br from-primary via-primary/90 to-accent/80 shadow-2xl">
        <img 
          src={heroImage} 
          alt="Rwanda Agriculture" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-base px-4 py-2 bg-background/90 backdrop-blur-sm border-primary/20">
              <currentSeason.icon className="h-4 w-4 mr-2" />
              {currentSeason.name} • {currentSeason.period}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1.5 bg-background/80 backdrop-blur-sm border-accent/30">
              Live Data
            </Badge>
          </div>
          
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
              Agricultural Intelligence
            </h1>
            <p className="text-xl text-primary-foreground/95 max-w-2xl drop-shadow-md">
              Real-time insights and data-driven analytics empowering Rwanda's agricultural transformation
            </p>
          </div>

          {/* Control Panel */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-[200px] bg-background/90 backdrop-blur-sm border-primary/20">
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Season</SelectItem>
                <SelectItem value="seasonA">Season A 2024</SelectItem>
                <SelectItem value="seasonB">Season B 2024</SelectItem>
                <SelectItem value="2023">Year 2023</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-[200px] bg-background/90 backdrop-blur-sm border-primary/20">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="kigali">Kigali</SelectItem>
                <SelectItem value="huye">Huye</SelectItem>
                <SelectItem value="musanze">Musanze</SelectItem>
                <SelectItem value="rubavu">Rubavu</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="secondary" className="bg-background/90 backdrop-blur-sm border-primary/20">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Key Statistics with Seasonal Context */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Seasonal Production"
          value="245K tons"
          change="+12% vs last season"
          changeType="positive"
          icon={Wheat}
        />
        <StatCard
          title="Active Farmers"
          value="89,432"
          change="+5% this season"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Market Price (Avg)"
          value="RWF 450/kg"
          change="+2.3% seasonal trend"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Crop Yield"
          value="4.2 t/ha"
          change="+8% from last season"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Live Market Insights Card */}
      {marketData.length > 0 && (
        <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  Live Market Insights
                </CardTitle>
                <CardDescription>Real-time commodity prices and trends</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {marketData.slice(0, 3).map((item: any) => (
                <div key={item.id} className="p-4 rounded-lg bg-secondary/50 border border-primary/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-foreground">{item.commodities?.name}</h4>
                    <Badge variant={item.change_percent >= 0 ? "default" : "destructive"} className="text-xs">
                      {item.change_percent >= 0 ? '+' : ''}{item.change_percent}%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary">RWF {item.price}</p>
                  <p className="text-sm text-muted-foreground">per {item.commodities?.unit}</p>
                  <div className="mt-2 pt-2 border-t border-primary/10 flex justify-between text-xs text-muted-foreground">
                    <span>{item.active_markets} markets</span>
                    <span>{item.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Production Overview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Production Overview</h2>
            <p className="text-muted-foreground mt-1">Track agricultural output and crop performance trends</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1.5">
            {currentSeason.name}
          </Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="Monthly Production Trends"
            description="Agricultural output in tons over the last 6 months"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Crop Distribution"
            description="Current crop portfolio by production share"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Seasonal Analysis Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Seasonal Analysis</h2>
            <p className="text-muted-foreground mt-1">Compare crop production across agricultural seasons</p>
          </div>
        </div>
        <ChartCard
          title="Quarterly Production by Crop Type"
          description="Stacked view of crop production trends across quarters"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seasonalTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="season" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Bar dataKey="maize" stackId="a" fill="hsl(var(--chart-1))" name="Maize" />
              <Bar dataKey="beans" stackId="a" fill="hsl(var(--chart-2))" name="Beans" />
              <Bar dataKey="rice" stackId="a" fill="hsl(var(--chart-3))" name="Rice" />
              <Bar dataKey="cassava" stackId="a" fill="hsl(var(--chart-4))" name="Cassava" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Science Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Advanced Analytics</h2>
            <p className="text-muted-foreground mt-1">Data-driven insights for agricultural decision-making</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Scatter Plot - Yield vs Investment */}
          <ChartCard
            title="Yield vs Investment Analysis"
            description="Correlation between investment and crop yield (bubble size = farm area)"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  dataKey="investment" 
                  name="Investment" 
                  unit="K RWF"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  type="number" 
                  dataKey="yield" 
                  name="Yield" 
                  unit=" t/ha"
                  stroke="hsl(var(--muted-foreground))"
                />
                <ZAxis type="number" dataKey="size" range={[60, 400]} name="Area" unit=" ha" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === "Investment") return [`${value}K RWF`, "Investment"];
                    if (name === "Yield") return [`${value} t/ha`, "Yield"];
                    if (name === "Area") return [`${value} ha`, "Farm Area"];
                    return value;
                  }}
                />
                <Legend />
                <ReferenceLine y={3.5} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="Target" />
                <Scatter name="Districts" data={yieldVsInvestment} fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Distribution Chart */}
          <ChartCard
            title="Yield Distribution Analysis"
            description="Frequency distribution of crop yields across farms"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={yieldDistribution} margin={{ bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="range" 
                  stroke="hsl(var(--muted-foreground))"
                  angle={-35}
                  textAnchor="end"
                  height={90}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Number of Farms', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--chart-2))"
                  label={{ value: 'Cumulative Farms', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  formatter={(value: any, name: string, props: any) => {
                    if (name === "Frequency") return [`${value} farms`, "Number of Farms"];
                    if (name === "Cumulative") return [`${value} farms`, "Total Farms"];
                    return value;
                  }}
                  labelFormatter={(label: string) => {
                    const item = yieldDistribution.find(d => d.range === label);
                    return item?.label || label;
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="frequency" 
                  fill="hsl(var(--primary))" 
                  name="Frequency"
                  radius={[8, 8, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Cumulative"
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Productivity Factors Analysis */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Productivity Insights</h2>
            <p className="text-muted-foreground mt-1">Key factors affecting agricultural productivity</p>
          </div>
        </div>
        <ChartCard
          title="Impact Factor Analysis"
          description="Positive vs negative impact factors on crop yield"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={productivityFactors}
              layout="vertical"
              margin={{ left: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                type="category" 
                dataKey="factor" 
                stroke="hsl(var(--muted-foreground))"
                width={90}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Bar 
                dataKey="positive" 
                fill="hsl(var(--primary))" 
                stackId="a"
                name="Positive Impact"
              />
              <Bar 
                dataKey="negative" 
                fill="hsl(var(--destructive))" 
                stackId="a"
                name="Negative Impact"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Market Price Trends */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Market Price Trends</h2>
            <p className="text-muted-foreground mt-1">Track commodity price movements and market dynamics</p>
          </div>
        </div>
        <ChartCard
          title="Commodity Prices (RWF/kg)"
          description="Price movements over the last 6 months"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={marketPrices}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="maize" 
                fill="hsl(var(--chart-1))" 
                stroke="hsl(var(--chart-1))"
                fillOpacity={0.2}
                name="Maize"
              />
              <Line 
                type="monotone" 
                dataKey="beans" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                name="Beans"
              />
              <Line 
                type="monotone" 
                dataKey="rice" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                name="Rice"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* District Analysis Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">District Analysis</h2>
            <p className="text-muted-foreground mt-1">Performance comparison across different regions</p>
          </div>
        </div>
        <ChartCard
          title="District Yield Comparison"
          description="Average crop yield by district (tons per hectare)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtYields}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="district" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Bar dataKey="yield" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Tables Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Detailed Analytics</h2>
        
        {/* District Comparison Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">District Performance Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Comprehensive comparison across all districts</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    District
                  </div>
                </TableHead>
                <TableHead>Production (tons)</TableHead>
                <TableHead>Active Farmers</TableHead>
                <TableHead>Avg Yield (t/ha)</TableHead>
                <TableHead>Area (ha)</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districtComparison.map((row) => (
                <TableRow key={row.district} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{row.district}</TableCell>
                  <TableCell>{row.production.toLocaleString()}</TableCell>
                  <TableCell>{row.farmers.toLocaleString()}</TableCell>
                  <TableCell>{row.avgYield}</TableCell>
                  <TableCell>{row.area.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={row.trend === "up" ? "default" : "destructive"}>
                      {row.growth}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Top Farmers Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Top Performing Farmers</h3>
            <p className="text-sm text-muted-foreground mt-1">Leading farmers by yield performance</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Farmer Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Avg Yield</TableHead>
                <TableHead>Primary Crops</TableHead>
                <TableHead>Performance Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topFarmers.map((farmer) => (
                <TableRow key={farmer.rank} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 font-bold text-primary">
                      {farmer.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{farmer.name}</TableCell>
                  <TableCell>{farmer.district}</TableCell>
                  <TableCell>{farmer.yield}</TableCell>
                  <TableCell className="text-muted-foreground">{farmer.crops}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all" 
                          style={{ width: `${farmer.performance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{farmer.performance}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
