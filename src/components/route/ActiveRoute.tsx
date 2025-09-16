import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Clock, 
  Navigation, 
  MapPin, 
  StopCircle,
  CheckCircle,
  XCircle,
  Phone,
  Route,
  Settings,
  Bell,
  Camera,
  User,
  Calendar,
  FileText,
  ChevronRight,
  Gauge,
  Timer,
  Target
} from "lucide-react";

interface RouteData {
  startOdometer: number;
  startOdometerPhoto?: string;
  endOdometer: number;
  endOdometerPhoto?: string;
  startTime: Date;
  endTime?: Date;
  shareLocation: boolean;
  gpsDistance: number;
  odometerDistance: number;
  timeElapsed: number;
  currentPosition: { lat: number; lng: number };
  routePath: { lat: number; lng: number }[];
  visits: {
    customerId: string;
    customerName: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distanceFromCurrent: number;
    status: "pending" | "visited" | "skipped";
    visitTime?: Date;
    lastVisit?: {
      agent: string;
      date: string;
      notes: string;
    };
  }[];
}

interface ActiveRouteProps {
  routeData: RouteData;
  onEndRoute: () => void;
}

export function ActiveRoute({ routeData, onEndRoute }: ActiveRouteProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gpsDistance, setGpsDistance] = useState(12.4);
  const [odometerDistance, setOdometerDistance] = useState(12.2);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate GPS distance increase
      setGpsDistance(prev => prev + 0.1);
      setOdometerDistance(prev => prev + 0.09); // Slightly different to show discrepancy
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getElapsedTime = () => {
    const elapsed = currentTime.getTime() - routeData.startTime.getTime();
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const nextStop = routeData.visits.find(v => v.status === "pending");

  const statusIcons = {
    pending: <MapPin className="h-4 w-4 text-yellow-600" />,
    visited: <CheckCircle className="h-4 w-4 text-green-600" />,
    skipped: <XCircle className="h-4 w-4 text-red-600" />
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    visited: "bg-green-100 text-green-700",
    skipped: "bg-red-100 text-red-700"
  };

  const handleCustomerPinClick = (visit: any) => {
    setSelectedCustomer(visit);
  };

  const permissions = {
    location: true,
    notifications: true,
    camera: true
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Enhanced Top Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 space-y-3">
        {/* Route Statistics */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gauge className="h-3 w-3" />
              <span className="text-xs text-blue-200">Odometer</span>
            </div>
            <p className="font-medium">{(routeData.startOdometer + odometerDistance).toFixed(1)} km</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Navigation className="h-3 w-3" />
              <span className="text-xs text-blue-200">GPS</span>
            </div>
            <p className="font-medium">{gpsDistance.toFixed(1)} km</p>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Timer className="h-3 w-3" />
              <span className="text-xs text-blue-200">Time</span>
            </div>
            <p className="font-medium text-xs">{getElapsedTime()}</p>
          </div>
        </div>

        {/* Permissions Drawer Trigger */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live Tracking Active</span>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
                <Settings className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Active Permissions</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">Real-time GPS tracking</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-muted-foreground">Route updates & alerts</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Camera className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Camera</p>
                        <p className="text-sm text-muted-foreground">Photo capture enabled</p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Uber-style Map with Polyline */}
      <div className="relative h-64 bg-muted">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBncHMlMjByb3V0ZXxlbnwxfHx8fDE3NTc5NzI5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="GPS Map Route Tracking"
          className="w-full h-full object-cover"
        />
        
        {/* Map Overlay with Route Polyline */}
        <div className="absolute inset-0">
          {/* Simulated Route Polyline */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="20,80 30,65 45,45 60,30 80,20"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="0.8"
              strokeDasharray="2,1"
              className="drop-shadow-sm"
            />
          </svg>
          
          {/* Customer Pins */}
          {routeData.visits.map((visit, index) => (
            <button
              key={visit.customerId}
              onClick={() => handleCustomerPinClick(visit)}
              className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
                visit.status === 'pending' ? 'bg-yellow-500' : 
                visit.status === 'visited' ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{
                left: `${30 + index * 25}%`,
                top: `${70 - index * 20}%`
              }}
            >
              <span className="text-white text-xs font-medium">{index + 1}</span>
            </button>
          ))}
          
          {/* Current Location */}
          <div className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse" 
               style={{ left: '20%', top: '80%', transform: 'translate(-50%, -50%)' }}>
          </div>
        </div>
      </div>

      {/* Next Stop Preview Card */}
      {nextStop && (
        <div className="p-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">Next Stop</h4>
                <Badge className="bg-blue-600">{nextStop.distanceFromCurrent} km away</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{nextStop.customerName}</p>
                <p className="text-sm text-muted-foreground">{nextStop.address}</p>
                <div className="flex items-center justify-between pt-2">
                  <Button size="sm" className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Navigate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Visit List */}
      <div className="px-4 pb-20 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">All Stops</h3>
          <div className="flex gap-2">
            <Badge variant="secondary">
              {routeData.visits.filter(v => v.status === "visited").length} Complete
            </Badge>
            <Badge variant="outline">
              {routeData.visits.filter(v => v.status === "pending").length} Pending
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {routeData.visits.map((visit, index) => (
            <Card 
              key={visit.customerId} 
              className={`cursor-pointer transition-all ${visit.status === "visited" ? "opacity-60" : ""}`}
              onClick={() => handleCustomerPinClick(visit)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      visit.status === 'pending' ? 'bg-yellow-500' : 
                      visit.status === 'visited' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{visit.customerName}</h4>
                      <p className="text-sm text-muted-foreground truncate">{visit.address}</p>
                      <p className="text-xs text-muted-foreground">{visit.distanceFromCurrent} km away</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Customer Pin Details Drawer */}
      {selectedCustomer && (
        <Drawer open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedCustomer.customerName}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{selectedCustomer.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{selectedCustomer.distanceFromCurrent} km from current location</p>
                </div>
              </div>

              {selectedCustomer.lastVisit && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Last Visit Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Visited by {selectedCustomer.lastVisit.agent}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.lastVisit.date}</p>
                    {selectedCustomer.lastVisit.notes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Notes</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.lastVisit.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Sticky End Route Button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t p-4">
        <Button
          onClick={onEndRoute}
          className="w-full h-12 bg-red-600 hover:bg-red-700"
        >
          <StopCircle className="h-5 w-5 mr-2" />
          End Route
        </Button>
      </div>
    </div>
  );
}