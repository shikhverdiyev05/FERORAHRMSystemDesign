import { Bell, Search, Globe, User, LogOut, Settings, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { currentUser, notifications as initialNotifications } from "../../data/mockData";
import { useState } from "react";
import { NotificationPanel } from "../design-system/NotificationPanel";
import { toast } from "sonner@2.0.3";

interface HeaderProps {
  onLogout?: () => void;
  onMenuClick?: () => void;
}

export function Header({ onLogout, onMenuClick }: HeaderProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Menu Button */}
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* Search */}
      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search employees, documents, or anything..."
            className="pl-10 bg-input-background border-0"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Globe className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              🇺🇸 English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              🇪🇸 Spanish
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              🇫🇷 French
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              🇩🇪 German
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDelete={handleDelete}
        />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 hover:bg-accent">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault();
                if (onLogout) {
                  onLogout();
                }
              }} 
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}