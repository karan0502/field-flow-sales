import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Target, 
  Users, 
  Package, 
  TrendingUp, 
  MapPin,
  Plus,
  CheckCircle
} from "lucide-react";

interface DashboardTabProps {
  onStartRoute: () => void;
  onNewOrder: () => void;
}

export function DashboardTab({ onStartRoute, onNewOrder }: DashboardTabProps) {
  const todaysTarget = {
    visits: { completed: 8, target: 12, percentage: 67 },
    orders: { completed: 5, target: 8, percentage: 63 },
    revenue: { completed: 12500, target: 20000, percentage: 63 }
  };

  const quickStats = [
    { label: "Visits", value: "8/12", icon: MapPin, color: "text-blue-600" },
    { label: "Orders", value: "5/8", icon: Package, color: "text-green-600" },
    { label: "Revenue", value: "$12.5K", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentActivities = [
    { action: "New order from TechCorp", time: "10 mins ago", type: "order" },
    { action: "Completed visit to Global Inc", time: "1 hour ago", type: "visit" },
    { action: "Updated customer info", time: "2 hours ago", type: "update" },
  ];

  return (
    <div className="pb-20 space-y-4">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
        <h2 className="text-lg font-medium mb-1">Good morning, Sarah!</h2>
        <p className="text-blue-100 text-sm">Ready to make today count?</p>
      </div>

      {/* Today's Target Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Sales Target
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Visits</span>
              <span className="text-sm font-medium">{todaysTarget.visits.completed}/{todaysTarget.visits.target}</span>
            </div>
            <Progress value={todaysTarget.visits.percentage} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Orders</span>
              <span className="text-sm font-medium">{todaysTarget.orders.completed}/{todaysTarget.orders.target}</span>
            </div>
            <Progress value={todaysTarget.orders.percentage} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <span className="text-sm font-medium">${todaysTarget.revenue.completed.toLocaleString()}/${todaysTarget.revenue.target.toLocaleString()}</span>
            </div>
            <Progress value={todaysTarget.revenue.percentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={onNewOrder}
          className="h-16 flex flex-col items-center gap-1 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          <span className="text-sm">New Order</span>
        </Button>
        
        <Button 
          onClick={onStartRoute}
          variant="outline"
          className="h-16 flex flex-col items-center gap-1"
          size="lg"
        >
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm">Check-in</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-3 text-center">
              <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-medium">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                {activity.type === "order" && <Package className="h-4 w-4 text-green-600" />}
                {activity.type === "visit" && <MapPin className="h-4 w-4 text-blue-600" />}
                {activity.type === "update" && <Users className="h-4 w-4 text-purple-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">This Week</h3>
            <Badge variant="secondary">On Track</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-medium">47</p>
              <p className="text-sm text-muted-foreground">Total Visits</p>
            </div>
            <div>
              <p className="text-lg font-medium">$89.2K</p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}