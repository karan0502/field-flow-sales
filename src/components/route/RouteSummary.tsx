import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  CheckCircle, 
  Navigation, 
  Clock, 
  MapPin,
  Gauge,
  TrendingUp,
  Users,
  Home
} from "lucide-react";

interface RouteData {
  startOdometer: number;
  endOdometer: number;
  startTime: Date;
  endTime?: Date;
  shareLocation: boolean;
  gpsDistance: number;
  visits: {
    customerId: string;
    customerName: string;
    status: "pending" | "visited" | "skipped";
    visitTime?: Date;
  }[];
}

interface RouteSummaryProps {
  routeData: RouteData;
  onFinish: () => void;
}

export function RouteSummary({ routeData, onFinish }: RouteSummaryProps) {
  const calculateTotalTime = () => {
    if (!routeData.endTime) return "0h 0m";
    const elapsed = routeData.endTime.getTime() - routeData.startTime.getTime();
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getOdometerDistance = () => {
    return routeData.endOdometer - routeData.startOdometer;
  };

  const getVisitStats = () => {
    const completed = routeData.visits.filter(v => v.status === "visited").length;
    const pending = routeData.visits.filter(v => v.status === "pending").length;
    const skipped = routeData.visits.filter(v => v.status === "skipped").length;
    return { completed, pending, skipped };
  };

  const stats = getVisitStats();

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-xl font-medium mb-2">Route Summary</h1>
        <p className="text-green-100">Excellent work today!</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Distance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Distance Traveled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Gauge className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-lg font-medium">{getOdometerDistance()} km</p>
                <p className="text-sm text-muted-foreground">Odometer Distance</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-lg font-medium">{routeData.gpsDistance.toFixed(1)} km</p>
                <p className="text-sm text-muted-foreground">GPS Distance</p>
              </div>
            </div>
            
            {/* Distance Comparison */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Distance Variance:</span>
                <span className="font-medium">
                  {Math.abs(getOdometerDistance() - routeData.gpsDistance).toFixed(1)} km
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <h3 className="font-medium">Time Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-medium">{calculateTotalTime()}</p>
                <p className="text-sm text-muted-foreground">Total Duration</p>
              </div>
              <div>
                <p className="text-lg font-medium">{Math.round(stats.completed > 0 ? (routeData.gpsDistance / stats.completed) * 60 / 8 : 0)} min</p>
                <p className="text-sm text-muted-foreground">Avg per Visit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visit Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Visit Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-medium text-green-600">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-lg font-medium text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-lg font-medium text-red-600">{stats.skipped}</p>
                <p className="text-xs text-muted-foreground">Skipped</p>
              </div>
            </div>

            {/* Success Rate */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Rate:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {Math.round((stats.completed / routeData.visits.length) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Efficiency Score</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {stats.completed >= 7 ? "Excellent" : stats.completed >= 5 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Route Completion</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {Math.round((stats.completed / routeData.visits.length) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Details */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Route Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>{routeData.startTime.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ended:</span>
                <span>{routeData.endTime?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location Sharing:</span>
                <Badge variant={routeData.shareLocation ? "default" : "secondary"}>
                  {routeData.shareLocation ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finish Button */}
        <Button
          onClick={onFinish}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
        >
          <Home className="h-5 w-5 mr-2" />
          Return to Dashboard
        </Button>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground pb-4">
          Route data has been saved and synced successfully
        </p>
      </div>
    </div>
  );
}