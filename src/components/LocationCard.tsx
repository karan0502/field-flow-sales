import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Clock, Navigation, CheckCircle } from "lucide-react";

interface LocationCardProps {
  companyName: string;
  address: string;
  distance: string;
  isCheckedIn?: boolean;
  visitTime?: string;
  onCheckIn?: () => void;
  onNavigate?: () => void;
}

export function LocationCard({
  companyName,
  address,
  distance,
  isCheckedIn = false,
  visitTime,
  onCheckIn,
  onNavigate
}: LocationCardProps) {
  const [checkedIn, setCheckedIn] = useState(isCheckedIn);

  const handleCheckIn = () => {
    setCheckedIn(true);
    onCheckIn?.();
  };

  return (
    <Card className={`${checkedIn ? 'border-green-200 bg-green-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{companyName}</h3>
              {checkedIn && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Checked In
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{distance} away</span>
              {visitTime && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{visitTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigate}
            className="flex items-center gap-1 flex-1"
          >
            <Navigation className="h-4 w-4" />
            Navigate
          </Button>
          {!checkedIn ? (
            <Button
              size="sm"
              onClick={handleCheckIn}
              className="flex items-center gap-1 flex-1"
            >
              <CheckCircle className="h-4 w-4" />
              Check In
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              disabled
            >
              Checked In
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}