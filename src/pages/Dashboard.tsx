import { TrendingUp, Users, Wheat, DollarSign, BarChart3, TrendingDown, MapPin, Calendar } from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, ReferenceLine 
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

  const correlationMatrix = [
    { metric: "Yield", yield: 1.00, rainfall: 0.82, temp: -0.35, soil: 0.78, fertilizer: 0.91 },
    { metric: "Rainfall", yield: 0.82, rainfall: 1.00, temp: -0.15, soil: 0.45, fertilizer: 0.68 },
    { metric: "Temperature", yield: -0.35, rainfall: -0.15, temp: 1.00, soil: -0.25, fertilizer: -0.42 },
    { metric: "Soil Quality", yield: 0.78, rainfall: 0.45, temp: -0.25, soil: 1.00, fertilizer: 0.72 },
    { metric: "Fertilizer", yield: 0.91, rainfall: 0.68, temp: -0.42, soil: 0.72, fertilizer: 1.00 },
  ];

  const yieldDistribution = [
    { range: "1.5-2.0", frequency: 5, cumulative: 5 },
    { range: "2.0-2.5", frequency: 12, cumulative: 17 },
    { range: "2.5-3.0", frequency: 28, cumulative: 45 },
    { range: "3.0-3.5", frequency: 42, cumulative: 87 },
    { range: "3.5-4.0", frequency: 38, cumulative: 125 },
    { range: "4.0-4.5", frequency: 25, cumulative: 150 },
    { range: "4.5-5.0", frequency: 15, cumulative: 165 },
    { range: "5.0+", frequency: 8, cumulative: 173 },
  ];

  const timeSeriesDecomposition = [
    { month: "Jan", actual: 2400, trend: 2350, seasonal: 50, residual: 0 },
    { month: "Feb", actual: 2800, trend: 2550, seasonal: 240, residual: 10 },
    { month: "Mar", actual: 3200, trend: 2750, seasonal: 430, residual: 20 },
    { month: "Apr", actual: 3600, trend: 2950, seasonal: 640, residual: 10 },
    { month: "May", actual: 4200, trend: 3150, seasonal: 1020, residual: 30 },
    { month: "Jun", actual: 4800, trend: 3350, seasonal: 1410, residual: 40 },
  ];

  const productivityFactors = [
    { factor: "Soil Quality", positive: 85, negative: 15 },
    { factor: "Water Access", positive: 78, negative: 22 },
    { factor: "Fertilizer Use", positive: 92, negative: 8 },
    { factor: "Pest Control", positive: 68, negative: 32 },
    { factor: "Tech Adoption", positive: 55, negative: 45 },
    { factor: "Training", positive: 72, negative: 28 },
  ];

  const multiVariateAnalysis = [
    { district: "Kigali", production: 45, efficiency: 82, sustainability: 75, innovation: 88 },
    { district: "Huye", production: 62, efficiency: 78, sustainability: 85, innovation: 72 },
    { district: "Musanze", production: 59, efficiency: 88, sustainability: 68, innovation: 90 },
    { district: "Rusizi", production: 52, efficiency: 65, sustainability: 92, innovation: 58 },
    { district: "Rubavu", production: 49, efficiency: 72, sustainability: 78, innovation: 68 },
    { district: "Nyagatare", production: 72, efficiency: 70, sustainability: 62, innovation: 75 },
  ];

  const getCorrelationColor = (value: number) => {
    if (value > 0.7) return "hsl(var(--primary))";
    if (value > 0.3) return "hsl(var(--chart-2))";
    if (value > -0.3) return "hsl(var(--muted))";
    if (value > -0.7) return "hsl(var(--accent))";
    return "hsl(var(--destructive))";
  };

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

      {/* Data Science Analytics Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Data Science Analytics</h2>
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
              <ComposedChart data={yieldDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="range" 
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--chart-2))"
                  label={{ value: 'Cumulative', angle: 90, position: 'insideRight' }}
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

      {/* Time Series Decomposition */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Time Series Decomposition</h2>
        <ChartCard
          title="Production Time Series Components"
          description="Trend, seasonal, and residual components of production data"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeSeriesDecomposition}>
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
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--foreground))" 
                strokeWidth={2}
                name="Actual"
                dot={{ fill: "hsl(var(--foreground))" }}
              />
              <Line 
                type="monotone" 
                dataKey="trend" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Trend"
              />
              <Area 
                type="monotone" 
                dataKey="seasonal" 
                fill="hsl(var(--chart-2))" 
                stroke="hsl(var(--chart-2))"
                fillOpacity={0.3}
                name="Seasonal"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Advanced Metrics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Advanced Metrics & Correlations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Productivity Factors */}
          <ChartCard
            title="Productivity Factor Analysis"
            description="Positive vs negative impact factors on yield"
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

          {/* Multivariate Analysis */}
          <ChartCard
            title="Multi-Dimensional District Performance"
            description="Radar analysis of key performance indicators"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={multiVariateAnalysis}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="district" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Production" 
                  dataKey="production" 
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  fillOpacity={0.2} 
                />
                <Radar 
                  name="Efficiency" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))" 
                  fillOpacity={0.2} 
                />
                <Radar 
                  name="Sustainability" 
                  dataKey="sustainability" 
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))" 
                  fillOpacity={0.2} 
                />
                <Radar 
                  name="Innovation" 
                  dataKey="innovation" 
                  stroke="hsl(var(--chart-4))" 
                  fill="hsl(var(--chart-4))" 
                  fillOpacity={0.2} 
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
        </div>
      </div>

      {/* Correlation Heatmap */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Correlation Matrix</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Factor Correlation Heatmap</h3>
          <p className="text-sm text-muted-foreground mb-6">Correlation coefficients between key agricultural factors (-1 to 1)</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left font-medium text-muted-foreground">Metric</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Yield</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Rainfall</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Temperature</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Soil Quality</th>
                  <th className="p-2 text-center font-medium text-muted-foreground">Fertilizer</th>
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((row) => (
                  <tr key={row.metric} className="border-t border-border">
                    <td className="p-2 font-medium">{row.metric}</td>
                    <td className="p-2">
                      <div 
                        className="h-12 flex items-center justify-center rounded font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: getCorrelationColor(row.yield) + "33", color: getCorrelationColor(row.yield) }}
                      >
                        {row.yield.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div 
                        className="h-12 flex items-center justify-center rounded font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: getCorrelationColor(row.rainfall) + "33", color: getCorrelationColor(row.rainfall) }}
                      >
                        {row.rainfall.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div 
                        className="h-12 flex items-center justify-center rounded font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: getCorrelationColor(row.temp) + "33", color: getCorrelationColor(row.temp) }}
                      >
                        {row.temp.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div 
                        className="h-12 flex items-center justify-center rounded font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: getCorrelationColor(row.soil) + "33", color: getCorrelationColor(row.soil) }}
                      >
                        {row.soil.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div 
                        className="h-12 flex items-center justify-center rounded font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: getCorrelationColor(row.fertilizer) + "33", color: getCorrelationColor(row.fertilizer) }}
                      >
                        {row.fertilizer.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--primary))" }}></div>
              <span className="text-muted-foreground">Strong Positive (0.7 to 1.0)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
              <span className="text-muted-foreground">Moderate (0.3 to 0.7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--muted))" }}></div>
              <span className="text-muted-foreground">Weak (-0.3 to 0.3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--destructive))" }}></div>
              <span className="text-muted-foreground">Strong Negative (-1.0 to -0.7)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Crop Performance Metrics</h2>
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
