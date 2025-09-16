import { Button } from "../ui/button";
import { Bell, CheckCircle, Clock, MapPin } from "lucide-react";

interface NotificationPermissionProps {
  onComplete: (granted: boolean) => void;
}

export function NotificationPermission({ onComplete }: NotificationPermissionProps) {
  const handleAllow = () => {
    // In a real app, you would request actual notification permission here
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        onComplete(permission === 'granted');
      });
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
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Bell className="h-12 w-12 text-blue-600" />
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Stay Updated</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Allow notifications to receive updates about your visits and route.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-sm">Get notified about appointment reminders</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm">Receive route optimization updates</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm">Stay informed about location-based alerts</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleAllow}
            className="w-full h-12"
          >
            Allow Notifications
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
          <div className="w-2 h-2 bg-primary rounded-full" />
          <div className="w-2 h-2 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}