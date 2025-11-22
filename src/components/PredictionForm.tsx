import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PredictionFormProps {
  onPredictionReceived: (prediction: any) => void;
}

const PredictionForm = ({ onPredictionReceived }: PredictionFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "maize",
    landSize: "",
    fertilizer: "organic",
    irrigation: false,
    previousYield: "",
    season: "Season A",
    district: "Kigali"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.landSize || !formData.previousYield) {
      toast({
        title: "Missing Information / Amakuru Yabuze",
        description: "Please fill in all required fields / Uzuza ibisabwa byose",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('predict-yield', {
        body: {
          cropType: formData.cropType,
          landSize: parseFloat(formData.landSize),
          fertilizer: formData.fertilizer,
          irrigation: formData.irrigation,
          previousYield: parseFloat(formData.previousYield),
          season: formData.season,
          district: formData.district
        }
      });

      if (error) throw error;

      if (data.success) {
        onPredictionReceived(data.prediction);
        toast({
          title: "Prediction Generated! / Guhanura Byakozwe!",
          description: "Your AI-powered yield prediction is ready / Guhanura kwawe ni hasi",
        });
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Error / Ikosa",
        description: "Failed to generate prediction. Please try again. / Ntibyashoboka. Ongera ugerageze.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-2 border-green-200 dark:border-green-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Get AI Prediction / Kubona Guhanura</CardTitle>
            <CardDescription className="text-base">
              Enter your farm data for personalized yield predictions / Injiza amakuru y'umurima wawe
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Crop Type */}
            <div className="space-y-2">
              <Label htmlFor="cropType" className="text-base font-semibold">
                Crop Type / Igihingwa
              </Label>
              <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                <SelectTrigger id="cropType" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maize">Maize / Ibigori</SelectItem>
                  <SelectItem value="beans">Beans / Ibishyimbo</SelectItem>
                  <SelectItem value="rice">Rice / Umuceri</SelectItem>
                  <SelectItem value="cassava">Cassava / Imyumbati</SelectItem>
                  <SelectItem value="wheat">Wheat / Ingano</SelectItem>
                  <SelectItem value="sorghum">Sorghum / Amasaka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Land Size */}
            <div className="space-y-2">
              <Label htmlFor="landSize" className="text-base font-semibold">
                Land Size (hectares) / Ubuso bw'ubutaka (hegitari)
              </Label>
              <Input
                id="landSize"
                type="number"
                step="0.1"
                min="0.1"
                placeholder="e.g., 2.5"
                value={formData.landSize}
                onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                className="h-12"
                required
              />
            </div>

            {/* Fertilizer Type */}
            <div className="space-y-2">
              <Label htmlFor="fertilizer" className="text-base font-semibold">
                Fertilizer Type / Ifumbire
              </Label>
              <Select value={formData.fertilizer} onValueChange={(value) => setFormData({...formData, fertilizer: value})}>
                <SelectTrigger id="fertilizer" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic / Kamere</SelectItem>
                  <SelectItem value="inorganic">Inorganic / Ikoreshwa</SelectItem>
                  <SelectItem value="mixed">Mixed / Bivanze</SelectItem>
                  <SelectItem value="none">None / Nta na rimwe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Previous Yield */}
            <div className="space-y-2">
              <Label htmlFor="previousYield" className="text-base font-semibold">
                Previous Yield (tonnes/ha) / Umusaruro wabanjirije
              </Label>
              <Input
                id="previousYield"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 4.2"
                value={formData.previousYield}
                onChange={(e) => setFormData({...formData, previousYield: e.target.value})}
                className="h-12"
                required
              />
            </div>

            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season" className="text-base font-semibold">
                Season / Igihembwe
              </Label>
              <Select value={formData.season} onValueChange={(value) => setFormData({...formData, season: value})}>
                <SelectTrigger id="season" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Season A">Season A (Sept-Feb) / Igihembwe A</SelectItem>
                  <SelectItem value="Season B">Season B (Mar-Aug) / Igihembwe B</SelectItem>
                  <SelectItem value="Season C">Season C (Irrigation) / Igihembwe C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district" className="text-base font-semibold">
                District / Akarere
              </Label>
              <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
                <SelectTrigger id="district" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kigali">Kigali</SelectItem>
                  <SelectItem value="Huye">Huye</SelectItem>
                  <SelectItem value="Musanze">Musanze</SelectItem>
                  <SelectItem value="Rubavu">Rubavu</SelectItem>
                  <SelectItem value="Nyagatare">Nyagatare</SelectItem>
                  <SelectItem value="Rwamagana">Rwamagana</SelectItem>
                  <SelectItem value="Karongi">Karongi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Irrigation Switch */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="irrigation" className="text-base font-semibold">
                Irrigation Available / Kuhira
              </Label>
              <p className="text-sm text-muted-foreground">
                Do you have access to irrigation? / Ufite uburyo bwo kuhira?
              </p>
            </div>
            <Switch
              id="irrigation"
              checked={formData.irrigation}
              onCheckedChange={(checked) => setFormData({...formData, irrigation: checked})}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Prediction... / Guhanura...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-5 w-5" />
                Generate AI Prediction / Kubona Guhanura
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
