import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  ArrowLeft, 
  Gauge, 
  Clock, 
  CheckCircle, 
  Camera,
  Navigation,
  AlertTriangle,
  Info,
  TrendingUp
} from "lucide-react";

interface EndRouteProps {
  onSubmit: (data: { endOdometer: number; endOdometerPhoto: string }) => void;
  onBack: () => void;
}

export function EndRoute({ onSubmit, onBack }: EndRouteProps) {
  const [endOdometer, setEndOdometer] = useState("");
  const [odometerPhoto, setOdometerPhoto] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Mock route data for comparison
  const routeComparison = {
    startOdometer: 12345,
    gpsDistance: 12.4,
    estimatedOdometerEnd: 12357.4
  };

  const handleOdometerChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setEndOdometer(numericValue);
    updateValidation(numericValue, odometerPhoto);
  };

  const updateValidation = (odometer: string, photo: string | null) => {
    setIsValid(odometer.length > 0 && photo !== null && parseInt(odometer) > routeComparison.startOdometer);
  };

  const handleCapturePhoto = () => {
    // Mock photo capture
    const mockPhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    setOdometerPhoto(mockPhoto);
    updateValidation(endOdometer, mockPhoto);
  };

  const handleSubmit = () => {
    if (endOdometer && odometerPhoto && isValid) {
      onSubmit({
        endOdometer: parseInt(endOdometer),
        endOdometerPhoto: odometerPhoto
      });
    }
  };

  const getCurrentOdometerDistance = () => {
    if (!endOdometer) return 0;
    return parseInt(endOdometer) - routeComparison.startOdometer;
  };

  const getDiscrepancy = () => {
    if (!endOdometer) return 0;
    const odometerDistance = getCurrentOdometerDistance();
    return Math.abs(odometerDistance - routeComparison.gpsDistance);
  };

  const hasSignificantDiscrepancy = () => {
    const discrepancy = getDiscrepancy();
    return discrepancy > 2.0; // Flag if difference > 2km
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-medium">End Route</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Route Completion Status */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-green-900 mb-2">Route Completed!</h3>
            <p className="text-sm text-green-700">
              Great job! You've finished your scheduled visits for today.
            </p>
          </CardContent>
        </Card>

        {/* Route Statistics Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Route Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Start Odometer</p>
                <p className="font-medium">{routeComparison.startOdometer.toLocaleString()} km</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">GPS Distance</p>
                <p className="font-medium">{routeComparison.gpsDistance} km</p>
              </div>
            </div>
            
            {endOdometer && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">End Odometer</p>
                    <p className="font-medium">{parseInt(endOdometer).toLocaleString()} km</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Odometer Distance</p>
                    <p className="font-medium">{getCurrentOdometerDistance()} km</p>
                  </div>
                </div>
                
                {/* Discrepancy Alert */}
                {hasSignificantDiscrepancy() ? (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Significant discrepancy detected:</strong> {getDiscrepancy().toFixed(1)} km difference 
                      between GPS and odometer readings. Please verify your odometer reading.
                    </AlertDescription>
                  </Alert>
                ) : getDiscrepancy() > 0.5 ? (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Small difference of {getDiscrepancy().toFixed(1)} km between GPS and odometer. This is within normal range.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>

        {/* End Odometer Reading */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gauge className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Enter ending odometer reading</h3>
              <p className="text-sm text-muted-foreground">
                This will be compared with GPS data to ensure accuracy
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="end-odometer">Ending Odometer Reading (km)</Label>
              <Input
                id="end-odometer"
                type="tel"
                placeholder="e.g., 12358"
                value={endOdometer}
                onChange={(e) => handleOdometerChange(e.target.value)}
                className="text-center text-lg"
              />
              <p className="text-xs text-muted-foreground text-center">
                Expected reading: ~{routeComparison.estimatedOdometerEnd.toFixed(0)} km
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Photo Capture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Odometer Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-4">
              {odometerPhoto ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Photo captured</span>
                  </div>
                  <img 
                    src={odometerPhoto} 
                    alt="End odometer reading" 
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
                    Capture a photo of your ending odometer reading
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
          </CardContent>
        </Card>

        {/* Final Validation Summary */}
        {endOdometer && odometerPhoto && (
          <Card className={hasSignificantDiscrepancy() ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"}>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Pre-submission Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Distance traveled (odometer):</span>
                  <span className="font-medium">{getCurrentOdometerDistance()} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance traveled (GPS):</span>
                  <span className="font-medium">{routeComparison.gpsDistance} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Difference:</span>
                  <span className={`font-medium ${hasSignificantDiscrepancy() ? 'text-yellow-700' : 'text-green-700'}`}>
                    {getDiscrepancy().toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Odometer photo captured</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          {hasSignificantDiscrepancy() ? 'Submit with Warning' : 'Submit & View Summary'}
        </Button>

        {/* Current Time */}
        <div className="text-center text-sm text-muted-foreground">
          Route ended at: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}