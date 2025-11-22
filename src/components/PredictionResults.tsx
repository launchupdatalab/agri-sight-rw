import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Brain, DollarSign, AlertTriangle, Lightbulb, Activity, CheckCircle2 } from "lucide-react";

interface PredictionResultsProps {
  prediction: any;
}

const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  const getRiskColor = (level: string) => {
    switch(level.toLowerCase()) {
      case "low": return "text-green-600 dark:text-green-400";
      case "medium": return "text-yellow-600 dark:text-yellow-400";
      case "high": return "text-red-600 dark:text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadge = (level: string) => {
    switch(level.toLowerCase()) {
      case "low": return { variant: "default" as const, text: "Low Risk / Ingorane Nke" };
      case "medium": return { variant: "secondary" as const, text: "Medium Risk / Ingorane Zo Hagati" };
      case "high": return { variant: "destructive" as const, text: "High Risk / Ingorane Nyinshi" };
      default: return { variant: "outline" as const, text: "Unknown" };
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "good": return "text-green-600 dark:text-green-400";
      case "fair": return "text-yellow-600 dark:text-yellow-400";
      case "poor": return "text-red-600 dark:text-red-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Risk Badge */}
      <div className="flex justify-end">
        <Badge variant={getRiskBadge(prediction.riskLevel).variant} className="text-sm px-4 py-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          {getRiskBadge(prediction.riskLevel).text}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Yield / Umusaruro
            </CardTitle>
            <div className="p-2 bg-green-600 rounded-lg">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">
              {prediction.predictedYield} t/ha
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="text-xs text-green-600 font-medium">
                +{prediction.yieldIncrease}% increase / Kwiyongera
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confidence / Ikizere
            </CardTitle>
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              {prediction.confidence}%
            </div>
            <Progress value={prediction.confidence} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expected ROI / Inyungu
            </CardTitle>
            <div className="p-2 bg-purple-600 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
              {prediction.roi}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Return on investment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Level / Ingorane
            </CardTitle>
            <div className="p-2 bg-orange-600 rounded-lg">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getRiskColor(prediction.riskLevel)}`}>
              {prediction.riskLevel.toUpperCase()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Production risk assessment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Factors Analysis */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Key Factors Analysis / Ibintu By'ingenzi</CardTitle>
          </div>
          <CardDescription>
            Impact of various factors on your predicted yield
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prediction.factors?.map((factor: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{factor.name}</span>
                    <Badge variant="outline" className={getStatusColor(factor.status)}>
                      {factor.status}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold">{factor.impact}%</span>
                </div>
                <Progress value={factor.impact} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-green-600" />
              <CardTitle>Recommendations / Inama</CardTitle>
            </div>
            <CardDescription>
              AI-powered insights to improve your yield
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {prediction.recommendations?.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle>Optimization Tips / Uko Wazamura</CardTitle>
            </div>
            <CardDescription>
              Specific actions to maximize your harvest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {prediction.optimizationTips?.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Insight / Isoko</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{prediction.marketInsight}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seasonal Advice / Inama z'Igihembwe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{prediction.seasonalAdvice}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionResults;
