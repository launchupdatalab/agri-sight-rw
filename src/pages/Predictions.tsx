import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { TrendingUp, Calendar, Target, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Predictions = () => {
  const [selectedCrop, setSelectedCrop] = useState("maize");

  const crops = [
    { value: "maize", label: "Maize" },
    { value: "beans", label: "Beans" },
    { value: "rice", label: "Rice" },
    { value: "cassava", label: "Cassava" },
  ];

  const yieldPredictions: Record<string, any> = {
    maize: {
      currentYield: 4.2,
      predictedYield: 4.8,
      confidence: 87,
      forecast: [
        { month: "Jul", historical: 3.8, predicted: 4.2 },
        { month: "Aug", historical: 4.0, predicted: 4.4 },
        { month: "Sep", historical: 4.2, predicted: 4.6 },
        { month: "Oct", historical: 4.1, predicted: 4.5 },
        { month: "Nov", historical: 4.3, predicted: 4.7 },
        { month: "Dec", historical: 4.2, predicted: 4.8 },
      ],
      recommendations: [
        "Optimal planting window: Late September to early October",
        "Consider nitrogen-rich fertilizers for 15% yield boost",
        "Monitor soil moisture - current levels favorable",
        "Pest control recommended in weeks 4-6 of growth cycle",
      ],
    },
    beans: {
      currentYield: 1.8,
      predictedYield: 2.1,
      confidence: 82,
      forecast: [
        { month: "Jul", historical: 1.6, predicted: 1.9 },
        { month: "Aug", historical: 1.7, predicted: 2.0 },
        { month: "Sep", historical: 1.8, predicted: 2.1 },
        { month: "Oct", historical: 1.7, predicted: 2.0 },
        { month: "Nov", historical: 1.9, predicted: 2.2 },
        { month: "Dec", historical: 1.8, predicted: 2.1 },
      ],
      recommendations: [
        "Best planting time: Early October after first rains",
        "Intercropping with maize can improve yields by 20%",
        "Current weather conditions are ideal for bean cultivation",
        "Apply organic compost 2 weeks before planting",
      ],
    },
    rice: {
      currentYield: 5.2,
      predictedYield: 5.8,
      confidence: 85,
      forecast: [
        { month: "Jul", historical: 4.8, predicted: 5.3 },
        { month: "Aug", historical: 5.0, predicted: 5.5 },
        { month: "Sep", historical: 5.2, predicted: 5.7 },
        { month: "Oct", historical: 5.1, predicted: 5.6 },
        { month: "Nov", historical: 5.3, predicted: 5.9 },
        { month: "Dec", historical: 5.2, predicted: 5.8 },
      ],
      recommendations: [
        "Maintain water levels at 5-10cm during growth phase",
        "High rainfall expected - excellent for rice cultivation",
        "Consider SRI method for 30% potential yield increase",
        "Harvest timing: 120-130 days after transplanting",
      ],
    },
    cassava: {
      currentYield: 12.5,
      predictedYield: 14.2,
      confidence: 79,
      forecast: [
        { month: "Jul", historical: 11.8, predicted: 13.2 },
        { month: "Aug", historical: 12.0, predicted: 13.5 },
        { month: "Sep", historical: 12.5, predicted: 14.0 },
        { month: "Oct", historical: 12.3, predicted: 13.8 },
        { month: "Nov", historical: 12.7, predicted: 14.3 },
        { month: "Dec", historical: 12.5, predicted: 14.2 },
      ],
      recommendations: [
        "Plant in areas with well-drained soil for best results",
        "Improved varieties can increase yield by 40%",
        "Drought-resistant - good backup crop for dry seasons",
        "Harvest window: 9-12 months after planting",
      ],
    },
  };

  const currentData = yieldPredictions[selectedCrop];
  const yieldIncrease = ((currentData.predictedYield - currentData.currentYield) / currentData.currentYield * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Yield Predictions</h1>
        <p className="text-muted-foreground">AI-powered forecasts and planning recommendations</p>
      </div>

      <div className="flex items-center gap-4">
        <Target className="h-5 w-5 text-primary" />
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop.value} value={crop.value}>
                {crop.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Yield
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.currentYield} t/ha
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on latest harvest data
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Predicted Yield
            </CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.predictedYield} t/ha
            </div>
            <p className="text-xs text-primary mt-1">
              +{yieldIncrease}% potential increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confidence Level
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.confidence}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Model accuracy score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Yield Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Yield Forecast</CardTitle>
          <CardDescription>
            Historical vs predicted yields (tons per hectare)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData.forecast}>
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
                dataKey="historical" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                name="Historical"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            <CardTitle>AI-Powered Recommendations</CardTitle>
          </div>
          <CardDescription>
            Actionable insights to maximize your {crops.find(c => c.value === selectedCrop)?.label.toLowerCase()} yield
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentData.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Badge variant="outline" className="mt-0.5">
                  {index + 1}
                </Badge>
                <p className="text-sm text-foreground flex-1">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;
