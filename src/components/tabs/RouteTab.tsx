import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Route, 
  MapPin, 
  Clock, 
  Navigation,
  CheckCircle,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";

interface RouteTabProps {
  onStartRoute: () => void;
}

export function RouteTab({ onStartRoute }: RouteTabProps) {
  const todayRouteStats = {
    planned: 8,
    completed: 5,
    remaining: 3,
    distance: 45.2,
    timeSpent: "4h 30m"
  };

  const plannedVisits = [
    {
      id: 1,
      customer: "TechCorp Solutions",
      address: "123 Business Ave, Downtown",
      time: "9:00 AM",
      status: "completed",
      priority: "high"
    },
    {
      id: 2,
      customer: "Global Industries",
      address: "456 Commerce St, Midtown",
      time: "11:00 AM",
      status: "completed",
      priority: "medium"
    },
    {
      id: 3,
      customer: "Innovation Labs",
      address: "789 Tech Park, North",
      time: "2:00 PM",
      status: "pending",
      priority: "high"
    },
    {
      id: 4,
      customer: "Metro Consulting",
      address: "321 Professional Way",
      time: "3:30 PM",
      status: "pending",
      priority: "low"
    },
    {
      id: 5,
      customer: "Future Systems",
      address: "654 Innovation Dr",
      time: "5:00 PM",
      status: "pending",
      priority: "medium"
    }
  ];

  const weeklyStats = {
    totalVisits: 34,
    totalDistance: 342,
    avgTimePerVisit: "45 min",
    efficiency: 87
  };

  const statusColors = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    skipped: "bg-red-100 text-red-700"
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Route Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Today's Route Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-medium text-green-600">{todayRouteStats.completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-lg font-medium text-yellow-600">{todayRouteStats.remaining}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-lg font-medium">{todayRouteStats.planned}</p>
              <p className="text-xs text-muted-foreground">Total Planned</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round((todayRouteStats.completed / todayRouteStats.planned) * 100)}%</span>
            </div>
            <Progress value={(todayRouteStats.completed / todayRouteStats.planned) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">{todayRouteStats.distance} km</p>
                <p className="text-muted-foreground">Distance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <div>
                <p className="font-medium">{todayRouteStats.timeSpent}</p>
                <p className="text-muted-foreground">Time Spent</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Route Button */}
      <Button 
        onClick={onStartRoute}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700"
      >
        <Route className="h-5 w-5 mr-2" />
        Start New Route
      </Button>

      {/* Planned Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Visits
            </div>
            <Badge variant="secondary">{plannedVisits.length} planned</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {plannedVisits.map((visit) => (
            <Card key={visit.id} className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{visit.customer}</h4>
                    <Badge 
                      variant="outline"
                      className={statusColors[visit.status as keyof typeof statusColors]}
                    >
                      {visit.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{visit.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{visit.time}</span>
                    </div>
                    <Badge 
                      variant="outline"
                      className={priorityColors[visit.priority as keyof typeof priorityColors]}
                    >
                      {visit.priority}
                    </Badge>
                  </div>
                </div>
                {visit.status === "completed" && (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-medium">{weeklyStats.totalVisits}</p>
              <p className="text-sm text-muted-foreground">Total Visits</p>
            </div>
            <div>
              <p className="text-lg font-medium">{weeklyStats.totalDistance} km</p>
              <p className="text-sm text-muted-foreground">Distance Covered</p>
            </div>
            <div>
              <p className="text-lg font-medium">{weeklyStats.avgTimePerVisit}</p>
              <p className="text-sm text-muted-foreground">Avg per Visit</p>
            </div>
            <div>
              <p className="text-lg font-medium text-green-600">{weeklyStats.efficiency}%</p>
              <p className="text-sm text-muted-foreground">Efficiency</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}