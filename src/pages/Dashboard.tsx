import { TrendingUp, Users, Wheat, DollarSign, BarChart3, TrendingDown } from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Production Trends"
          description="Monthly agricultural output in tons"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productionData}>
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
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
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
  );
};

export default Dashboard;
