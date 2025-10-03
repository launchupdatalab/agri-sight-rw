import { TrendingUp, Users, Wheat, DollarSign, BarChart3, TrendingDown, MapPin, Calendar } from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-agriculture.jpg";

const Dashboard = () => {
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

  const cropPerformance = [
    { crop: "Maize", production: 85, quality: 92, marketDemand: 88, sustainability: 78 },
    { crop: "Beans", production: 78, quality: 85, marketDemand: 82, sustainability: 88 },
    { crop: "Rice", production: 82, quality: 88, marketDemand: 90, sustainability: 75 },
    { crop: "Cassava", production: 72, quality: 80, marketDemand: 75, sustainability: 92 },
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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden h-[300px] bg-gradient-to-r from-primary/90 to-primary">
        <img 
          src={heroImage} 
          alt="Rwanda Agriculture" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Agricultural Intelligence Platform
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Real-time data insights to empower Rwanda's agricultural sector with data-driven decisions
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Production"
          value="245K tons"
          change="+12% from last quarter"
          changeType="positive"
          icon={Wheat}
        />
        <StatCard
          title="Active Farmers"
          value="89,432"
          change="+5% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Avg. Market Price"
          value="RWF 450/kg"
          change="-3% from last week"
          changeType="negative"
          icon={DollarSign}
        />
        <StatCard
          title="Crop Yield"
          value="4.2 tons/ha"
          change="+8% from last season"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Production Overview Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Production Overview</h2>
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
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Seasonal Analysis</h2>
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

      {/* Performance Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Performance Metrics</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="Crop Performance Radar"
            description="Multi-dimensional analysis of crop performance"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cropPerformance}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="crop" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Production" 
                  dataKey="production" 
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Quality" 
                  dataKey="quality" 
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))" 
                  fillOpacity={0.3} 
                />
                <Radar 
                  name="Market Demand" 
                  dataKey="marketDemand" 
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))" 
                  fillOpacity={0.3} 
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Market Price Trends (RWF/kg)"
            description="Commodity price movements over 6 months"
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
      </div>

      {/* District Comparison Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">District Comparison</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="District Yields"
            description="Average crop yield by district (tons/ha)"
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

          <ChartCard
            title="Quick Insights"
            description="Recent agricultural highlights"
          >
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Maize production increased</p>
                  <p className="text-xs text-muted-foreground">15% growth this quarter</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <BarChart3 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Record bean harvest</p>
                  <p className="text-xs text-muted-foreground">Best season in 5 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-sm">Cassava prices declining</p>
                  <p className="text-xs text-muted-foreground">Monitor market trends</p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
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
