import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { MapPin, Wheat, TrendingUp, Users } from "lucide-react";

const Regions = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("kigali");

  const districts = [
    { value: "kigali", label: "Kigali" },
    { value: "huye", label: "Huye" },
    { value: "musanze", label: "Musanze" },
    { value: "rusizi", label: "Rusizi" },
    { value: "rubavu", label: "Rubavu" },
    { value: "nyagatare", label: "Nyagatare" },
  ];

  const districtData: Record<string, any> = {
    kigali: {
      farmers: 12450,
      production: "45,200 tons",
      yield: "4.2 tons/ha",
      area: "10,800 ha",
      cropData: [
        { crop: "Maize", production: 15200 },
        { crop: "Beans", production: 12800 },
        { crop: "Vegetables", production: 10500 },
        { crop: "Cassava", production: 6700 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 3800 },
        { month: "Feb", value: 4100 },
        { month: "Mar", value: 4500 },
        { month: "Apr", value: 4200 },
        { month: "May", value: 4800 },
        { month: "Jun", value: 5200 },
      ],
    },
    huye: {
      farmers: 18900,
      production: "62,400 tons",
      yield: "3.8 tons/ha",
      area: "16,400 ha",
      cropData: [
        { crop: "Maize", production: 22400 },
        { crop: "Beans", production: 18200 },
        { crop: "Rice", production: 12800 },
        { crop: "Cassava", production: 9000 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 5200 },
        { month: "Feb", value: 5500 },
        { month: "Mar", value: 5800 },
        { month: "Apr", value: 5400 },
        { month: "May", value: 6100 },
        { month: "Jun", value: 6800 },
      ],
    },
    musanze: {
      farmers: 15600,
      production: "58,900 tons",
      yield: "4.5 tons/ha",
      area: "13,100 ha",
      cropData: [
        { crop: "Potatoes", production: 24500 },
        { crop: "Maize", production: 16200 },
        { crop: "Beans", production: 11400 },
        { crop: "Vegetables", production: 6800 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 4900 },
        { month: "Feb", value: 5100 },
        { month: "Mar", value: 5400 },
        { month: "Apr", value: 5200 },
        { month: "May", value: 5800 },
        { month: "Jun", value: 6200 },
      ],
    },
    rusizi: {
      farmers: 21200,
      production: "52,300 tons",
      yield: "3.2 tons/ha",
      area: "16,300 ha",
      cropData: [
        { crop: "Rice", production: 18900 },
        { crop: "Maize", production: 14200 },
        { crop: "Beans", production: 11800 },
        { crop: "Cassava", production: 7400 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 4300 },
        { month: "Feb", value: 4600 },
        { month: "Mar", value: 4900 },
        { month: "Apr", value: 4700 },
        { month: "May", value: 5200 },
        { month: "Jun", value: 5600 },
      ],
    },
    rubavu: {
      farmers: 14800,
      production: "48,700 tons",
      yield: "3.9 tons/ha",
      area: "12,500 ha",
      cropData: [
        { crop: "Maize", production: 16800 },
        { crop: "Beans", production: 13200 },
        { crop: "Vegetables", production: 11400 },
        { crop: "Cassava", production: 7300 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 4000 },
        { month: "Feb", value: 4300 },
        { month: "Mar", value: 4600 },
        { month: "Apr", value: 4400 },
        { month: "May", value: 4900 },
        { month: "Jun", value: 5300 },
      ],
    },
    nyagatare: {
      farmers: 24600,
      production: "72,100 tons",
      yield: "3.5 tons/ha",
      area: "20,600 ha",
      cropData: [
        { crop: "Maize", production: 28900 },
        { crop: "Rice", production: 21200 },
        { crop: "Beans", production: 14600 },
        { crop: "Cassava", production: 7400 },
      ],
      monthlyProduction: [
        { month: "Jan", value: 5900 },
        { month: "Feb", value: 6200 },
        { month: "Mar", value: 6600 },
        { month: "Apr", value: 6400 },
        { month: "May", value: 7100 },
        { month: "Jun", value: 7800 },
      ],
    },
  };

  const currentData = districtData[selectedDistrict];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Regional Statistics</h1>
        <p className="text-muted-foreground">Detailed agricultural data by district</p>
      </div>

      <div className="flex items-center gap-4">
        <MapPin className="h-5 w-5 text-primary" />
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.value} value={district.value}>
                {district.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Farmers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.farmers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Production
            </CardTitle>
            <Wheat className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.production}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Yield
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.yield}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cultivated Area
            </CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.area}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="crops" className="w-full">
        <TabsList>
          <TabsTrigger value="crops">Crop Production</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production by Crop Type</CardTitle>
              <CardDescription>Total production in tons for {districts.find(d => d.value === selectedDistrict)?.label}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.cropData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="crop" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Bar dataKey="production" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Production Trends</CardTitle>
              <CardDescription>Production output over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.monthlyProduction}>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Regions;
