import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, Wind, Droplets, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const Weather = () => {
  const currentWeather = {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    icon: Cloud,
  };

  const forecast = [
    { day: "Monday", temp: 25, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Tuesday", temp: 23, condition: "Partly Cloudy", icon: Cloud, rainfall: 1.2 },
    { day: "Wednesday", temp: 22, condition: "Rainy", icon: CloudRain, rainfall: 8.5 },
    { day: "Thursday", temp: 21, condition: "Rainy", icon: CloudRain, rainfall: 12.3 },
    { day: "Friday", temp: 24, condition: "Partly Cloudy", icon: Cloud, rainfall: 2.1 },
    { day: "Saturday", temp: 26, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Sunday", temp: 25, condition: "Sunny", icon: Sun, rainfall: 0 },
  ];

  const alerts = [
    {
      title: "Heavy Rainfall Alert",
      description: "Expected 15-25mm of rain in Northern Province. Prepare drainage systems.",
      severity: "warning",
      region: "Musanze, Gicumbi",
    },
    {
      title: "Optimal Planting Conditions",
      description: "Good soil moisture levels in Eastern Province. Ideal for maize planting.",
      severity: "info",
      region: "Nyagatare, Kayonza",
    },
  ];

  const regionalWeather = [
    { region: "Kigali", temp: 24, condition: "Partly Cloudy", humidity: 65 },
    { region: "Huye", temp: 22, condition: "Cloudy", humidity: 72 },
    { region: "Musanze", temp: 19, condition: "Rainy", humidity: 85 },
    { region: "Rusizi", temp: 26, condition: "Sunny", humidity: 58 },
    { region: "Rubavu", temp: 21, condition: "Partly Cloudy", humidity: 70 },
    { region: "Nyagatare", temp: 27, condition: "Sunny", humidity: 52 },
  ];

  const WeatherIcon = currentWeather.icon;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Weather Forecast</h1>
        <p className="text-muted-foreground">Real-time weather updates for agricultural planning</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Active Alerts</h2>
          {alerts.map((alert, index) => (
            <Alert key={index} variant={alert.severity === "warning" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                {alert.description}
                <Badge variant="outline" className="ml-2">{alert.region}</Badge>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Current Conditions</CardTitle>
          <CardDescription>Kigali Region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-foreground">{currentWeather.temp}°C</div>
              <p className="text-xl text-muted-foreground">{currentWeather.condition}</p>
            </div>
            <WeatherIcon className="h-24 w-24 text-primary" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{currentWeather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Rainfall</p>
                <p className="font-semibold">{currentWeather.rainfall} mm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">7-Day Forecast</h2>
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
          {forecast.map((day) => {
            const DayIcon = day.icon;
            return (
              <Card key={day.day} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <DayIcon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold">{day.temp}°C</div>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                  {day.rainfall > 0 && (
                    <p className="text-xs text-primary">{day.rainfall}mm rain</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Regional Weather */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Regional Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {regionalWeather.map((region) => (
            <Card key={region.region}>
              <CardHeader>
                <CardTitle className="text-lg">{region.region}</CardTitle>
                <CardDescription>{region.condition}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{region.temp}°C</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Humidity: {region.humidity}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
