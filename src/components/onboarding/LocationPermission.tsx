import { Button } from "../ui/button";
import { MapPin, Shield, Eye, Route } from "lucide-react";

interface LocationPermissionProps {
  onComplete: (granted: boolean) => void;
}

export function LocationPermission({ onComplete }: LocationPermissionProps) {
  const handleAllow = () => {
    // In a real app, you would request actual location permission here
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => onComplete(true),
        () => onComplete(false)
      );
    } else {
      onComplete(false);
    }
  };

  const handleSkip = () => {
    onComplete(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <MapPin className="h-12 w-12 text-green-600" />
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Enable Live Tracking</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Share your live location with Admin while on the field.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Route className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm">Optimize your route planning automatically</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm">Help admin track field activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm">Enhanced safety during field visits</p>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900">Privacy Protected</p>
              <p className="text-xs text-blue-700 mt-1">
                Location data is only shared during active work hours and used solely for business purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleAllow}
            className="w-full h-12"
          >
            Allow Location Sharing
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}