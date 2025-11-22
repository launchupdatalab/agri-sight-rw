import { useState } from "react";
import { Sparkles } from "lucide-react";
import PredictionForm from "@/components/PredictionForm";
import PredictionResults from "@/components/PredictionResults";

const Predictions = () => {
  const [prediction, setPrediction] = useState<any>(null);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-4">
          <Sparkles className="h-8 w-8 text-white" />
          <h1 className="text-4xl font-bold text-white">
            AI Crop Yield Predictions
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get personalized, data-driven yield predictions powered by AI / 
          <br />
          Kubona guhanura ku musaruro ukoresheje AI
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            ✓ Based on 2024 Rwanda agricultural success
          </span>
          <span className="flex items-center gap-1">
            ✓ Personalized for your farm
          </span>
          <span className="flex items-center gap-1">
            ✓ Actionable recommendations
          </span>
        </div>
      </div>

      {/* Input Form */}
      <PredictionForm onPredictionReceived={setPrediction} />

      {/* Results */}
      {prediction && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full" />
            <h2 className="text-2xl font-bold text-center">
              Your Personalized Prediction / Guhanura Kwawe
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full" />
          </div>
          <PredictionResults prediction={prediction} />
        </div>
      )}

      {/* Empty State */}
      {!prediction && (
        <div className="text-center py-16 space-y-4">
          <div className="inline-flex p-6 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full">
            <Sparkles className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-semibold">Ready to Get Your Prediction?</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Fill in the form above with your farm details to receive AI-powered yield predictions and recommendations.
            <br />
            <span className="text-sm mt-2 block">
              Uzuza ifishi hejuru kugirango ubone guhanura n'inama.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Predictions;
