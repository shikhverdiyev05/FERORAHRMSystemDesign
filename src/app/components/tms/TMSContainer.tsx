import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Package, 
  Route, 
  Send, 
  Radio, 
  Shield, 
  FileText, 
  Bell, 
  Settings,
  MapPin
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";
import { TMSDashboard } from "./TMSDashboard";
import { ManageTransports } from "./ManageTransports";

const tmsMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "transports", icon: Truck, label: "Manage Transports" },
  { id: "vehicles", icon: Truck, label: "Vehicles" },
  { id: "drivers", icon: Users, label: "Drivers" },
  { id: "shipments", icon: Package, label: "Shipments" },
  { id: "routes", icon: Route, label: "Routes" },
  { id: "dispatch", icon: Send, label: "Dispatch" },
  { id: "tracking", icon: Radio, label: "Live Tracking" },
  { id: "geofence", icon: Shield, label: "Geofence" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "alerts", icon: Bell, label: "Alerts" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "transports" 
  | "vehicles" 
  | "drivers" 
  | "shipments" 
  | "routes" 
  | "dispatch" 
  | "tracking" 
  | "geofence" 
  | "reports" 
  | "alerts" 
  | "settings";

interface TMSContainerProps {
  onBackToProfile: () => void;
}

export function TMSContainer({ onBackToProfile }: TMSContainerProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view as View);
    setIsSidebarOpen(false);
  }, []);

  const handleLogout = () => {
    // Navigate back to profile/module selection
    onBackToProfile();
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <TMSDashboard />;
      case "transports":
        return <ManageTransports />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Module Coming Soon</h3>
              <p className="text-muted-foreground">
                This module is under development
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <ModuleSidebar
        moduleName="TMS"
        moduleIcon={Truck}
        moduleColor="bg-gradient-to-br from-green-500 to-emerald-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={tmsMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="TMS"
        moduleIcon={Truck}
        moduleColor="bg-gradient-to-br from-green-500 to-emerald-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={tmsMenuItems}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto pt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}