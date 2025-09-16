import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Download,
  Share,
  Heart
} from "lucide-react";

export function MenuTab() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const settingsGroups = [
    {
      title: "Appearance",
      items: [
        {
          id: "dark-mode",
          label: "Dark Mode",
          icon: isDarkMode ? Moon : Sun,
          type: "switch",
          value: isDarkMode,
          onChange: setIsDarkMode
        },
        {
          id: "theme",
          label: "Theme Colors",
          icon: Palette,
          type: "navigation",
          badge: "Pro"
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          id: "notifications",
          label: "Push Notifications",
          icon: Bell,
          type: "switch",
          value: isNotificationsEnabled,
          onChange: setIsNotificationsEnabled
        },
        {
          id: "sound",
          label: "Sound Effects",
          icon: isSoundEnabled ? Volume2 : VolumeX,
          type: "switch",
          value: isSoundEnabled,
          onChange: setIsSoundEnabled
        }
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        {
          id: "privacy",
          label: "Privacy Settings",
          icon: Shield,
          type: "navigation"
        },
        {
          id: "data",
          label: "Data & Storage",
          icon: Download,
          type: "navigation"
        }
      ]
    },
    {
      title: "About",
      items: [
        {
          id: "share",
          label: "Share App",
          icon: Share,
          type: "action"
        },
        {
          id: "rate",
          label: "Rate App",
          icon: Heart,
          type: "action"
        }
      ]
    }
  ];

  const handleNavigation = (itemId: string) => {
    console.log(`Navigate to ${itemId}`);
  };

  const handleAction = (itemId: string) => {
    console.log(`Perform action ${itemId}`);
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Profile Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <Card key={group.title}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {group.items.map((item, itemIndex) => {
              const Icon = item.icon;
              
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.type === "switch" && (
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onChange}
                        />
                      )}
                      {item.type === "navigation" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNavigation(item.id)}
                          className="p-1"
                        >
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {item.type === "action" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(item.id)}
                          className="p-1"
                        >
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {itemIndex < group.items.length - 1 && <Separator className="ml-14" />}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {/* App Info */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Design System App</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </CardContent>
      </Card>
    </div>
  );
}