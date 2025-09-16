import { Menu, Search, Bell } from "lucide-react";
import { Button } from "./ui/button";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ 
  title, 
  showMenu = false, 
  showSearch = false, 
  showNotifications = false,
  onMenuClick 
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showMenu && (
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="font-medium">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {showSearch && (
          <Button variant="ghost" size="sm" className="p-2">
            <Search className="h-5 w-5" />
          </Button>
        )}
        {showNotifications && (
          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>
        )}
      </div>
    </header>
  );
}