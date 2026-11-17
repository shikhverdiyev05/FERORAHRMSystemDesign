import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Truck,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  MapPin,
  TrendingUp,
  BarChart3,
  FileText,
  AlertCircle,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const scmMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "inventory", icon: Package, label: "Inventory" },
  { id: "warehouse", icon: Warehouse, label: "Warehouse Management" },
  { id: "procurement", icon: ShoppingCart, label: "Procurement" },
  { id: "logistics", icon: Truck, label: "Logistics" },
  { id: "suppliers", icon: Users, label: "Supplier Network" },
  { id: "distribution", icon: MapPin, label: "Distribution" },
  { id: "demand", icon: TrendingUp, label: "Demand Planning" },
  { id: "analytics", icon: BarChart3, label: "Supply Analytics" },
  { id: "orders", icon: FileText, label: "Order Management" },
  { id: "risks", icon: AlertCircle, label: "Risk Management" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "inventory" 
  | "warehouse" 
  | "procurement" 
  | "logistics" 
  | "suppliers" 
  | "distribution" 
  | "demand" 
  | "analytics" 
  | "orders" 
  | "risks" 
  | "settings";

interface SCMContainerProps {
  onBackToProfile: () => void;
}

export function SCMContainer({ onBackToProfile }: SCMContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">SCM Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Supply Chain Management features are under development
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
        moduleName="SCM"
        moduleIcon={Truck}
        moduleColor="bg-gradient-to-br from-pink-500 to-rose-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={scmMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="SCM"
        moduleIcon={Truck}
        moduleColor="bg-gradient-to-br from-pink-500 to-rose-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={scmMenuItems}
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