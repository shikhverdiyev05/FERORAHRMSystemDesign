import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Factory,
  Warehouse,
  TrendingUp,
  FileText,
  PieChart,
  Calendar,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const erpMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "finance", icon: DollarSign, label: "Finance & Accounting" },
  { id: "hr", icon: Users, label: "Human Resources" },
  { id: "inventory", icon: Package, label: "Inventory Management" },
  { id: "procurement", icon: ShoppingCart, label: "Procurement" },
  { id: "manufacturing", icon: Factory, label: "Manufacturing" },
  { id: "warehouse", icon: Warehouse, label: "Warehouse" },
  { id: "sales", icon: TrendingUp, label: "Sales & Distribution" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "analytics", icon: PieChart, label: "Business Analytics" },
  { id: "planning", icon: Calendar, label: "Planning" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "finance" 
  | "hr" 
  | "inventory" 
  | "procurement" 
  | "manufacturing" 
  | "warehouse" 
  | "sales" 
  | "reports" 
  | "analytics" 
  | "planning" 
  | "settings";

interface ERPContainerProps {
  onBackToProfile: () => void;
}

export function ERPContainer({ onBackToProfile }: ERPContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">ERP Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Enterprise Resource Planning features are under development
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
        moduleName="ERP"
        moduleIcon={PieChart}
        moduleColor="bg-gradient-to-br from-teal-500 to-cyan-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={erpMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="ERP"
        moduleIcon={PieChart}
        moduleColor="bg-gradient-to-br from-teal-500 to-cyan-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={erpMenuItems}
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