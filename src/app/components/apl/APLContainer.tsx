import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  FileText,
  Users,
  Building,
  Scale,
  Briefcase,
  FileCheck,
  AlertTriangle,
  Shield,
  Calendar,
  Archive,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const aplMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "contracts", icon: FileText, label: "Contracts" },
  { id: "vendors", icon: Users, label: "Vendors" },
  { id: "clients", icon: Building, label: "Clients" },
  { id: "compliance", icon: Scale, label: "Compliance" },
  { id: "litigation", icon: Briefcase, label: "Litigation" },
  { id: "approvals", icon: FileCheck, label: "Approvals" },
  { id: "risks", icon: AlertTriangle, label: "Risk Assessment" },
  { id: "policies", icon: Shield, label: "Policies" },
  { id: "calendar", icon: Calendar, label: "Legal Calendar" },
  { id: "archive", icon: Archive, label: "Document Archive" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "contracts" 
  | "vendors" 
  | "clients" 
  | "compliance" 
  | "litigation" 
  | "approvals" 
  | "risks" 
  | "policies" 
  | "calendar" 
  | "archive" 
  | "settings";

interface APLContainerProps {
  onBackToProfile: () => void;
}

export function APLContainer({ onBackToProfile }: APLContainerProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view as View);
    setIsSidebarOpen(false);
  }, []);

  const renderContent = () => {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">APL Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Agreement & Policy & Legal Management features are under development
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <ModuleSidebar
        moduleName="APL"
        moduleIcon={Scale}
        moduleColor="bg-gradient-to-br from-amber-500 to-yellow-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={aplMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="APL"
        moduleIcon={Scale}
        moduleColor="bg-gradient-to-br from-amber-500 to-yellow-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={aplMenuItems}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto pt-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}