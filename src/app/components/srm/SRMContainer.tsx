import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart,
  FileCheck,
  TrendingUp,
  ClipboardList,
  DollarSign,
  Package,
  Star,
  FileText,
  AlertCircle,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const srmMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "suppliers", icon: Users, label: "Suppliers" },
  { id: "procurement", icon: ShoppingCart, label: "Procurement" },
  { id: "contracts", icon: FileCheck, label: "Contracts" },
  { id: "performance", icon: TrendingUp, label: "Performance" },
  { id: "orders", icon: ClipboardList, label: "Purchase Orders" },
  { id: "payments", icon: DollarSign, label: "Payments" },
  { id: "inventory", icon: Package, label: "Inventory" },
  { id: "ratings", icon: Star, label: "Ratings & Reviews" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "risks", icon: AlertCircle, label: "Risk Management" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "suppliers" 
  | "procurement" 
  | "contracts" 
  | "performance" 
  | "orders" 
  | "payments" 
  | "inventory" 
  | "ratings" 
  | "reports" 
  | "risks" 
  | "settings";

interface SRMContainerProps {
  onBackToProfile: () => void;
}

export function SRMContainer({ onBackToProfile }: SRMContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">SRM Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Supplier Relationship Management features are under development
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
        moduleName="SRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-orange-500 to-red-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={srmMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="SRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-orange-500 to-red-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={srmMenuItems}
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