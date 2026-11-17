import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Package,
  ShoppingCart,
  Boxes,
  ClipboardList,
  Factory,
  Calendar,
  TrendingUp,
  Warehouse,
  FileText,
  BarChart3,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const mrpMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "materials", icon: Package, label: "Materials" },
  { id: "bom", icon: ClipboardList, label: "Bill of Materials" },
  { id: "procurement", icon: ShoppingCart, label: "Procurement" },
  { id: "inventory", icon: Boxes, label: "Inventory" },
  { id: "production", icon: Factory, label: "Production Planning" },
  { id: "scheduling", icon: Calendar, label: "Scheduling" },
  { id: "demand", icon: TrendingUp, label: "Demand Forecast" },
  { id: "warehouse", icon: Warehouse, label: "Warehouse" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "materials" 
  | "bom" 
  | "procurement" 
  | "inventory" 
  | "production" 
  | "scheduling" 
  | "demand" 
  | "warehouse" 
  | "reports" 
  | "analytics" 
  | "settings";

interface MRPContainerProps {
  onBackToProfile: () => void;
}

export function MRPContainer({ onBackToProfile }: MRPContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">MRP Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Material Requirements Planning features are under development
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
        moduleName="MRP"
        moduleIcon={Package}
        moduleColor="bg-gradient-to-br from-indigo-500 to-blue-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={mrpMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="MRP"
        moduleIcon={Package}
        moduleColor="bg-gradient-to-br from-indigo-500 to-blue-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={mrpMenuItems}
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