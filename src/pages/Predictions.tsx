import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell } from "recharts";
import { useState } from "react";
import { TrendingUp, Calendar, Target, Lightbulb, AlertTriangle, DollarSign, Activity, Brain, Droplet, Sun, Wind, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      riskLevel: "low",
      roi: 142,
      forecast: [
        { month: "Jul", historical: 3.8, predicted: 4.2, lower: 3.9, upper: 4.5, optimistic: 4.8, pessimistic: 3.7 },
        { month: "Aug", historical: 4.0, predicted: 4.4, lower: 4.1, upper: 4.7, optimistic: 5.0, pessimistic: 3.9 },
        { month: "Sep", historical: 4.2, predicted: 4.6, lower: 4.3, upper: 4.9, optimistic: 5.2, pessimistic: 4.1 },
        { month: "Oct", historical: 4.1, predicted: 4.5, lower: 4.2, upper: 4.8, optimistic: 5.1, pessimistic: 4.0 },
        { month: "Nov", historical: 4.3, predicted: 4.7, lower: 4.4, upper: 5.0, optimistic: 5.3, pessimistic: 4.2 },
        { month: "Dec", historical: 4.2, predicted: 4.8, lower: 4.5, upper: 5.1, optimistic: 5.4, pessimistic: 4.3 },
      ],
      factors: [
        { factor: "Rainfall", impact: 85, optimal: 78 },
        { factor: "Temperature", impact: 72, optimal: 68 },
        { factor: "Soil Quality", impact: 68, optimal: 75 },
        { factor: "Fertilizer", impact: 90, optimal: 85 },
        { factor: "Pest Control", impact: 65, optimal: 80 },
      ],
      accuracy: [
        { period: "Jan-Feb", predicted: 4.1, actual: 4.0, accuracy: 97 },
        { period: "Mar-Apr", predicted: 4.3, actual: 4.2, accuracy: 98 },
        { period: "May-Jun", predicted: 4.0, actual: 4.1, accuracy: 97 },
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
      riskLevel: "medium",
      roi: 128,
      forecast: [
        { month: "Jul", historical: 1.6, predicted: 1.9, lower: 1.7, upper: 2.1, optimistic: 2.3, pessimistic: 1.6 },
        { month: "Aug", historical: 1.7, predicted: 2.0, lower: 1.8, upper: 2.2, optimistic: 2.4, pessimistic: 1.7 },
        { month: "Sep", historical: 1.8, predicted: 2.1, lower: 1.9, upper: 2.3, optimistic: 2.5, pessimistic: 1.8 },
        { month: "Oct", historical: 1.7, predicted: 2.0, lower: 1.8, upper: 2.2, optimistic: 2.4, pessimistic: 1.7 },
        { month: "Nov", historical: 1.9, predicted: 2.2, lower: 2.0, upper: 2.4, optimistic: 2.6, pessimistic: 1.9 },
        { month: "Dec", historical: 1.8, predicted: 2.1, lower: 1.9, upper: 2.3, optimistic: 2.5, pessimistic: 1.8 },
      ],
      factors: [
        { factor: "Rainfall", impact: 88, optimal: 82 },
        { factor: "Temperature", impact: 75, optimal: 72 },
        { factor: "Soil Quality", impact: 70, optimal: 78 },
        { factor: "Fertilizer", impact: 65, optimal: 70 },
        { factor: "Pest Control", impact: 80, optimal: 85 },
      ],
      accuracy: [
        { period: "Jan-Feb", predicted: 1.8, actual: 1.7, accuracy: 94 },
        { period: "Mar-Apr", predicted: 1.9, actual: 1.9, accuracy: 100 },
        { period: "May-Jun", predicted: 1.7, actual: 1.8, accuracy: 94 },
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
      riskLevel: "low",
      roi: 156,
      forecast: [
        { month: "Jul", historical: 4.8, predicted: 5.3, lower: 5.0, upper: 5.6, optimistic: 6.0, pessimistic: 4.8 },
        { month: "Aug", historical: 5.0, predicted: 5.5, lower: 5.2, upper: 5.8, optimistic: 6.2, pessimistic: 5.0 },
        { month: "Sep", historical: 5.2, predicted: 5.7, lower: 5.4, upper: 6.0, optimistic: 6.4, pessimistic: 5.2 },
        { month: "Oct", historical: 5.1, predicted: 5.6, lower: 5.3, upper: 5.9, optimistic: 6.3, pessimistic: 5.1 },
        { month: "Nov", historical: 5.3, predicted: 5.9, lower: 5.6, upper: 6.2, optimistic: 6.6, pessimistic: 5.3 },
        { month: "Dec", historical: 5.2, predicted: 5.8, lower: 5.5, upper: 6.1, optimistic: 6.5, pessimistic: 5.2 },
      ],
      factors: [
        { factor: "Rainfall", impact: 95, optimal: 90 },
        { factor: "Temperature", impact: 80, optimal: 78 },
        { factor: "Soil Quality", impact: 72, optimal: 80 },
        { factor: "Fertilizer", impact: 85, optimal: 82 },
        { factor: "Pest Control", impact: 70, optimal: 75 },
      ],
      accuracy: [
        { period: "Jan-Feb", predicted: 5.1, actual: 5.0, accuracy: 98 },
        { period: "Mar-Apr", predicted: 5.3, actual: 5.2, accuracy: 98 },
        { period: "May-Jun", predicted: 5.0, actual: 5.1, accuracy: 98 },
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
      riskLevel: "medium",
      roi: 135,
      forecast: [
        { month: "Jul", historical: 11.8, predicted: 13.2, lower: 12.5, upper: 13.9, optimistic: 15.0, pessimistic: 11.5 },
        { month: "Aug", historical: 12.0, predicted: 13.5, lower: 12.8, upper: 14.2, optimistic: 15.3, pessimistic: 11.8 },
        { month: "Sep", historical: 12.5, predicted: 14.0, lower: 13.3, upper: 14.7, optimistic: 15.8, pessimistic: 12.3 },
        { month: "Oct", historical: 12.3, predicted: 13.8, lower: 13.1, upper: 14.5, optimistic: 15.6, pessimistic: 12.1 },
        { month: "Nov", historical: 12.7, predicted: 14.3, lower: 13.6, upper: 15.0, optimistic: 16.1, pessimistic: 12.5 },
        { month: "Dec", historical: 12.5, predicted: 14.2, lower: 13.5, upper: 14.9, optimistic: 16.0, pessimistic: 12.4 },
      ],
      factors: [
        { factor: "Rainfall", impact: 60, optimal: 65 },
        { factor: "Temperature", impact: 82, optimal: 80 },
        { factor: "Soil Quality", impact: 75, optimal: 82 },
        { factor: "Fertilizer", impact: 70, optimal: 75 },
        { factor: "Pest Control", impact: 68, optimal: 78 },
      ],
      accuracy: [
        { period: "Jan-Feb", predicted: 12.3, actual: 12.1, accuracy: 98 },
        { period: "Mar-Apr", predicted: 12.8, actual: 12.5, accuracy: 98 },
        { period: "May-Jun", predicted: 12.0, actual: 12.3, accuracy: 97 },
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

  const getRiskColor = (level: string) => {
    switch(level) {
      case "low": return "text-primary";
      case "medium": return "text-accent";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadge = (level: string) => {
    switch(level) {
      case "low": return { variant: "default" as const, text: "Low Risk" };
      case "medium": return { variant: "secondary" as const, text: "Medium Risk" };
      case "high": return { variant: "destructive" as const, text: "High Risk" };
      default: return { variant: "outline" as const, text: "Unknown" };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Crop Yield Predictions
          </h1>
          <p className="text-muted-foreground text-lg">Advanced machine learning forecasts and data-driven recommendations</p>
        </div>
        <Badge variant={getRiskBadge(currentData.riskLevel).variant} className="text-sm px-4 py-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          {getRiskBadge(currentData.riskLevel).text}
        </Badge>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Select Crop for Analysis</p>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-full md:w-[280px] h-12 text-base">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value} className="text-base">
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Yield
            </CardTitle>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.currentYield} t/ha
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Latest harvest data
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Predicted Yield
            </CardTitle>
            <div className="p-2 bg-accent/20 rounded-lg">
              <Target className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.predictedYield} t/ha
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <p className="text-xs text-primary font-medium">
                +{yieldIncrease}% increase
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Model Confidence
            </CardTitle>
            <div className="p-2 bg-chart-2/20 rounded-lg">
              <Brain className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.confidence}%
            </div>
            <Progress value={currentData.confidence} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expected ROI
            </CardTitle>
            <div className="p-2 bg-chart-3/20 rounded-lg">
              <DollarSign className="h-4 w-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {currentData.roi}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Return on investment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Forecast with Confidence Intervals */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Yield Forecast with Confidence Intervals</CardTitle>
            </div>
            <CardDescription>
              Predicted yields with 95% confidence bounds
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={currentData.forecast}>
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
                  dataKey="upper" 
                  fill="hsl(var(--primary) / 0.2)" 
                  stroke="none"
                  name="Upper Bound"
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  fill="hsl(var(--background))" 
                  stroke="none"
                  name="Lower Bound"
                />
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  name="Historical"
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Predicted"
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              <CardTitle>Scenario Analysis</CardTitle>
            </div>
            <CardDescription>
              Best, realistic, and worst-case scenarios
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
                  dataKey="optimistic" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Optimistic"
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Realistic"
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pessimistic" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Pessimistic"
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--destructive))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Factor Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-chart-3" />
              <CardTitle>Environmental Impact Factors</CardTitle>
            </div>
            <CardDescription>
              Current conditions vs optimal levels
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={currentData.factors}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="factor" stroke="hsl(var(--foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Current Impact" 
                  dataKey="impact" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <Radar 
                  name="Optimal Level" 
                  dataKey="optimal" 
                  stroke="hsl(var(--chart-2))" 
                  fill="hsl(var(--chart-2))" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                  strokeDasharray="5 5"
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
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-chart-4" />
              <CardTitle>Prediction Accuracy History</CardTitle>
            </div>
            <CardDescription>
              Model performance over recent periods
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={currentData.accuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Legend />
                <Bar yAxisId="left" dataKey="predicted" fill="hsl(var(--primary))" name="Predicted" />
                <Bar yAxisId="left" dataKey="actual" fill="hsl(var(--accent))" name="Actual" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  name="Accuracy %"
                  dot={{ fill: "hsl(var(--chart-2))", r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights Table */}
      <Card className="hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Data Science Insights</CardTitle>
          </div>
          <CardDescription>
            Detailed analysis and predictions for {crops.find(c => c.value === selectedCrop)?.label}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Predicted Value</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Yield (t/ha)</TableCell>
                <TableCell>{currentData.currentYield}</TableCell>
                <TableCell>{currentData.predictedYield}</TableCell>
                <TableCell className="text-primary">+{yieldIncrease}%</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Improving
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Model Confidence</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{currentData.confidence}%</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Badge variant="secondary">High</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Risk Level</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="capitalize">{currentData.riskLevel}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Badge variant={getRiskBadge(currentData.riskLevel).variant}>
                    {currentData.riskLevel}
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Expected ROI</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{currentData.roi}%</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Badge variant="default">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Excellent
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 hover:shadow-xl transition-shadow border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Actionable insights to maximize your {crops.find(c => c.value === selectedCrop)?.label.toLowerCase()} yield
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {currentData.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:border-primary/50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-sm text-foreground flex-1 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;
