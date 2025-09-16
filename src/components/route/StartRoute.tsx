import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, Route, Gauge, MapPin, Camera, CheckCircle } from "lucide-react";

interface StartRouteProps {
  onStartRoute: (data: { startOdometer: number; startOdometerPhoto: string; shareLocation: boolean }) => void;
  onBack: () => void;
}

export function StartRoute({ onStartRoute, onBack }: StartRouteProps) {
  const [startOdometer, setStartOdometer] = useState("");
  const [shareLocation, setShareLocation] = useState(true);
  const [odometerPhoto, setOdometerPhoto] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleOdometerChange = (value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/\D/g, '');
    setStartOdometer(numericValue);
    updateValidation(numericValue, odometerPhoto);
  };

  const updateValidation = (odometer: string, photo: string | null) => {
    setIsValid(odometer.length > 0 && photo !== null);
  };

  const handleCapturePhoto = () => {
    // In a real app, this would open the camera
    // For demo purposes, we'll simulate photo capture
    const mockPhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    setOdometerPhoto(mockPhoto);
    updateValidation(startOdometer, mockPhoto);
  };

  const handleStartRoute = () => {
    if (startOdometer && odometerPhoto && isValid) {
      onStartRoute({
        startOdometer: parseInt(startOdometer),
        startOdometerPhoto: odometerPhoto,
        shareLocation
      });
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-medium">Start Route</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Route Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Planned Visits</p>
                <p className="text-lg font-medium">8</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Est. Distance</p>
                <p className="text-lg font-medium">45 km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Odometer Reading */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gauge className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Enter starting odometer reading</h3>
              <p className="text-sm text-muted-foreground">
                This helps track the actual distance traveled during your route
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="odometer">Odometer Reading (km)</Label>
              <Input
                id="odometer"
                type="tel"
                placeholder="e.g., 12345"
                value={startOdometer}
                onChange={(e) => handleOdometerChange(e.target.value)}
                className="text-center text-lg"
              />
            </div>

            {/* Photo Capture */}
            <div className="space-y-3">
              <Label>Odometer Photo</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-4">
                {odometerPhoto ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Photo captured</span>
                    </div>
                    <img 
                      src={odometerPhoto} 
                      alt="Odometer reading" 
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCapturePhoto}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Retake Photo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Capture a photo of your odometer reading
                    </p>
                    <Button
                      onClick={handleCapturePhoto}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Sharing */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="location-sharing"
                checked={shareLocation}
                onCheckedChange={(checked) => setShareLocation(checked as boolean)}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="location-sharing" className="text-sm font-medium">
                    Share my live location with Admin
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Allow admin to track your location during field visits for safety and route optimization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Safety Reminders</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep your phone charged throughout the day</li>
              <li>• Check weather conditions before starting</li>
              <li>• Inform someone about your planned route</li>
              <li>• Have emergency contacts ready</li>
            </ul>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button
          onClick={handleStartRoute}
          disabled={!isValid}
          className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          <Route className="h-5 w-5 mr-2" />
          Start Route
        </Button>

        {/* Current Time Display */}
        <div className="text-center text-sm text-muted-foreground">
          Current time: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}