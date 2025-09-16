import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LocationCard } from "../LocationCard";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Route,
  Locate,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function MapTab() {
  const [isTrackingLocation, setIsTrackingLocation] = useState(true);
  const [currentLocation] = useState("Downtown Business District");
  
  const nearbyLeads = [
    {
      companyName: "Sunrise Marketing",
      address: "789 Oak Street, Suite 200",
      distance: "0.3 mi",
      priority: "hot",
      appointmentTime: "Now - 11:30 AM"
    },
    {
      companyName: "Metro Consulting",
      address: "321 Pine Avenue, Floor 5",
      distance: "0.7 mi",
      priority: "warm",
      appointmentTime: "1:00 PM"
    },
    {
      companyName: "Coastal Enterprises",
      address: "654 Elm Drive, Building C",
      distance: "1.2 mi",
      priority: "cold",
      appointmentTime: "3:30 PM"
    }
  ];

  const todayVisits = [
    {
      companyName: "TechStart Solutions",
      address: "123 Innovation Blvd",
      distance: "Visited",
      visitTime: "9:00 AM",
      isCheckedIn: true
    },
    {
      companyName: "Digital Dynamics", 
      address: "456 Commerce Center",
      distance: "Visited",
      visitTime: "10:15 AM",
      isCheckedIn: true
    }
  ];

  const priorityColors = {
    hot: "bg-red-100 text-red-700",
    warm: "bg-yellow-100 text-yellow-700", 
    cold: "bg-blue-100 text-blue-700"
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Location Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTrackingLocation ? 'bg-green-100' : 'bg-red-100'}`}>
              <Locate className={`h-5 w-5 ${isTrackingLocation ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Location Tracking</h3>
              <p className="text-sm text-muted-foreground">{currentLocation}</p>
            </div>
            <Badge variant={isTrackingLocation ? "default" : "destructive"}>
              {isTrackingLocation ? "Active" : "Disabled"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Distance Today</p>
              <p className="text-lg">24.3 mi</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Travel Time</p>
              <p className="text-lg">2h 15m</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-muted">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1586449480584-34302e933441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBsb2NhdGlvbiUyMHRyYWNraW5nfGVufDF8fHx8MTc1Nzk3MjIxMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Map Location Tracking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Interactive Map View</p>
              <p className="text-sm opacity-90">Tap to open full map</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button className="flex-1 flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Route Optimization
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              View Route
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Leads
            <Badge variant="secondary">{nearbyLeads.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nearbyLeads.map((lead, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{lead.companyName}</h4>
                    <Badge 
                      variant="secondary"
                      className={priorityColors[lead.priority as keyof typeof priorityColors]}
                    >
                      {lead.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{lead.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground">{lead.distance}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{lead.appointmentTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Navigation className="h-4 w-4 mr-1" />
                  Navigate
                </Button>
                <Button size="sm" className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Check In
                </Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Today's Completed Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Completed Visits
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {todayVisits.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayVisits.map((visit, index) => (
            <LocationCard
              key={index}
              companyName={visit.companyName}
              address={visit.address}
              distance={visit.distance}
              visitTime={visit.visitTime}
              isCheckedIn={visit.isCheckedIn}
            />
          ))}
        </CardContent>
      </Card>

      {/* Route Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Today's Route Summary</h3>
            <Route className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-medium">5</p>
              <p className="text-xs text-muted-foreground">Total Stops</p>
            </div>
            <div>
              <p className="text-lg font-medium">2</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-lg font-medium">85%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}