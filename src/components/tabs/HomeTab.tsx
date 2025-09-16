import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LocationCard } from "../LocationCard";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Target, 
  DollarSign, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  Calendar,
  BarChart3
} from "lucide-react";

export function HomeTab() {
  const todayStats = [
    { label: "Visits", value: "3", target: "5", icon: MapPin, color: "text-blue-600" },
    { label: "Calls", value: "8", target: "10", icon: Users, color: "text-green-600" },
    { label: "Revenue", value: "$12.5K", target: "$15K", icon: DollarSign, color: "text-purple-600" },
  ];

  const quickActions = [
    { label: "Log Activity", icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Schedule Call", icon: Calendar, color: "bg-blue-100 text-blue-600" },
    { label: "View Reports", icon: BarChart3, color: "bg-purple-100 text-purple-600" },
  ];

  const upcomingVisits = [
    {
      companyName: "TechCorp Solutions",
      address: "123 Business Ave, Downtown",
      distance: "0.5 mi",
      visitTime: "10:00 AM",
      isCheckedIn: false
    },
    {
      companyName: "Global Industries",
      address: "456 Commerce St, Midtown",
      distance: "1.2 mi", 
      visitTime: "2:00 PM",
      isCheckedIn: false
    }
  ];

  return (
    <div className="pb-20 space-y-4">
      {/* Welcome Card */}
      <Card className="overflow-hidden">
        <div className="relative h-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1616587224026-668840f26916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNhbGVzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTc5NzIyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sales Meeting"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <h2 className="text-white font-medium">Good morning, Sarah!</h2>
            <p className="text-white/80 text-sm">You have 5 visits scheduled today</p>
          </div>
        </div>
      </Card>

      {/* Today's Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayStats.map((stat, index) => {
            const Icon = stat.icon;
            const progress = (parseInt(stat.value.replace(/[^0-9]/g, '')) / parseInt(stat.target.replace(/[^0-9]/g, ''))) * 100;
            
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{stat.label}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{stat.value}</span>
                      <span>/</span>
                      <span>{stat.target}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${progress >= 80 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {Math.round(progress)}%
                  </div>
                  <div className="w-16 h-2 bg-muted rounded-full mt-1">
                    <div 
                      className={`h-full rounded-full ${progress >= 80 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-16 flex flex-col items-center gap-1 p-2"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${action.color}`}>
                <Icon className="h-3 w-3" />
              </div>
              <span className="text-xs">{action.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Upcoming Visits */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Visits
            </CardTitle>
            <Badge variant="secondary">2 remaining</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingVisits.map((visit, index) => (
            <LocationCard
              key={index}
              companyName={visit.companyName}
              address={visit.address}
              distance={visit.distance}
              visitTime={visit.visitTime}
              isCheckedIn={visit.isCheckedIn}
              onCheckIn={() => console.log('Check in:', visit.companyName)}
              onNavigate={() => console.log('Navigate to:', visit.companyName)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">This Week</h3>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-medium">24</p>
              <p className="text-sm text-muted-foreground">Visits Completed</p>
            </div>
            <div>
              <p className="text-lg font-medium">$47.2K</p>
              <p className="text-sm text-muted-foreground">Revenue Generated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}