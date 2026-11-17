import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Lightbulb,
  FileText,
  Workflow,
  Users,
  GitBranch,
  CheckCircle,
  Calendar,
  FileCheck,
  TrendingUp,
  Archive,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const plmMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "products", icon: Lightbulb, label: "Products" },
  { id: "design", icon: FileText, label: "Design & Engineering" },
  { id: "workflow", icon: Workflow, label: "Workflow Management" },
  { id: "collaboration", icon: Users, label: "Collaboration" },
  { id: "versions", icon: GitBranch, label: "Version Control" },
  { id: "compliance", icon: CheckCircle, label: "Compliance" },
  { id: "lifecycle", icon: Calendar, label: "Product Lifecycle" },
  { id: "bom", icon: FileCheck, label: "BOM Management" },
  { id: "innovation", icon: TrendingUp, label: "Innovation Pipeline" },
  { id: "archive", icon: Archive, label: "Product Archive" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "products" 
  | "design" 
  | "workflow" 
  | "collaboration" 
  | "versions" 
  | "compliance" 
  | "lifecycle" 
  | "bom" 
  | "innovation" 
  | "archive" 
  | "settings";

interface PLMContainerProps {
  onBackToProfile: () => void;
}

export function PLMContainer({ onBackToProfile }: PLMContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">PLM Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Product Lifecycle Management features are under development
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
        moduleName="PLM"
        moduleIcon={Lightbulb}
        moduleColor="bg-gradient-to-br from-sky-500 to-blue-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={plmMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="PLM"
        moduleIcon={Lightbulb}
        moduleColor="bg-gradient-to-br from-sky-500 to-blue-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={plmMenuItems}
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