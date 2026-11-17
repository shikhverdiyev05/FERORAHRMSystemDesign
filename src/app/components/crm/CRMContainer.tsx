import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  FileText,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";

const crmMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "contacts", icon: Users, label: "Contacts" },
  { id: "leads", icon: UserPlus, label: "Leads" },
  { id: "accounts", icon: Building, label: "Accounts" },
  { id: "opportunities", icon: Target, label: "Opportunities" },
  { id: "campaigns", icon: Mail, label: "Campaigns" },
  { id: "activities", icon: Calendar, label: "Activities" },
  { id: "sales", icon: DollarSign, label: "Sales Pipeline" },
  { id: "analytics", icon: TrendingUp, label: "Analytics" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "contacts" 
  | "leads" 
  | "accounts" 
  | "opportunities" 
  | "campaigns" 
  | "activities" 
  | "sales" 
  | "analytics" 
  | "reports" 
  | "settings";

interface CRMContainerProps {
  onBackToProfile: () => void;
}

export function CRMContainer({ onBackToProfile }: CRMContainerProps) {
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
              <h3 className="text-xl font-semibold mb-2">CRM Module Coming Soon</h3>
              <p className="text-muted-foreground">
                Customer Relationship Management features are under development
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
        moduleName="CRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-purple-500 to-violet-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={crmMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="CRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-purple-500 to-violet-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={crmMenuItems}
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