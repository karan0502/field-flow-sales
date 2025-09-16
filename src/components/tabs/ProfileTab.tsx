import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  LogOut,
  Settings,
  Bell,
  Shield
} from "lucide-react";

interface ProfileTabProps {
  permissions: {
    notifications: boolean;
    location: boolean;
  };
}

export function ProfileTab({ permissions }: ProfileTabProps) {
  const agentInfo = {
    name: "Sarah Johnson",
    id: "EMP-2024-001",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    territory: "San Francisco Bay Area",
    joinDate: "January 2023"
  };

  const monthlyPerformance = {
    totalVisits: 124,
    distanceCovered: 2400,
    ordersCompleted: 89,
    revenue: 245000
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6 text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="text-lg">SJ</AvatarFallback>
          </Avatar>
          
          <h2 className="font-medium mb-1">{agentInfo.name}</h2>
          <p className="text-muted-foreground text-sm mb-2">Sales Representative</p>
          
          <Badge variant="secondary" className="mb-4">
            ID: {agentInfo.id}
          </Badge>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{agentInfo.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{agentInfo.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{agentInfo.territory}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {agentInfo.joinDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            This Month Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-medium text-blue-600">{monthlyPerformance.totalVisits}</p>
              <p className="text-sm text-muted-foreground">Total Visits</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-medium text-green-600">{monthlyPerformance.distanceCovered} km</p>
              <p className="text-sm text-muted-foreground">Distance Covered</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-medium text-purple-600">{monthlyPerformance.ordersCompleted}</p>
              <p className="text-sm text-muted-foreground">Orders Completed</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-lg font-medium text-yellow-600">${(monthlyPerformance.revenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Revenue Generated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            App Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
            </div>
            <Badge variant={permissions.notifications ? "default" : "secondary"}>
              {permissions.notifications ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Location Tracking</p>
                <p className="text-sm text-muted-foreground">Share location with admin</p>
              </div>
            </div>
            <Badge variant={permissions.location ? "default" : "secondary"}>
              {permissions.location ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Award className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Top Performer</p>
              <p className="text-sm text-green-700">Exceeded monthly target by 15%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Route Master</p>
              <p className="text-sm text-blue-700">Completed 100+ visits this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Settings className="h-4 w-4" />
          App Settings
        </Button>
        
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="w-full flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}