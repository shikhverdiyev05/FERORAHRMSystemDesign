import { useState, useCallback } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Clock, 
  CalendarDays, 
  DollarSign, 
  Target,
  GraduationCap,
  Package,
  FileText,
  ClipboardList,
  BarChart3,
  Settings
} from "lucide-react";
import { ModuleSidebar } from "../layout/ModuleSidebar";
import { MobileModuleSidebar } from "../layout/MobileModuleSidebar";
import { Header } from "../layout/Header";
import { DashboardEnhanced } from "../modules/DashboardEnhanced";
import { EmployeesEnhanced } from "../modules/EmployeesEnhanced";
import { RecruitmentEnhanced } from "../modules/RecruitmentEnhanced";
import { Attendance } from "../modules/Attendance";
import { LeaveManagementEnhanced } from "../modules/LeaveManagementEnhanced";
import { Payroll } from "../modules/Payroll";
import { Performance } from "../modules/Performance";
import { Training } from "../modules/Training";
import { Documents, Requests, Reports } from "../modules/OtherModules";
import { Assets } from "../modules/Assets";
import { SettingsEnhanced } from "../modules/SettingsEnhanced";
import { AddEmployeePage } from "../employee/AddEmployeePage";

const hrmMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "employees", icon: Users, label: "Employees" },
  { id: "recruitment", icon: UserPlus, label: "Recruitment" },
  { id: "attendance", icon: Clock, label: "Attendance" },
  { id: "leave", icon: CalendarDays, label: "Leave Management" },
  { id: "payroll", icon: DollarSign, label: "Payroll" },
  { id: "performance", icon: Target, label: "Performance" },
  { id: "training", icon: GraduationCap, label: "Training" },
  { id: "assets", icon: Package, label: "Assets" },
  { id: "documents", icon: FileText, label: "Documents" },
  { id: "requests", icon: ClipboardList, label: "Requests" },
  { id: "reports", icon: BarChart3, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
];

type View = 
  | "dashboard" 
  | "employees" 
  | "recruitment" 
  | "attendance" 
  | "leave" 
  | "payroll" 
  | "performance" 
  | "training" 
  | "assets" 
  | "documents" 
  | "requests" 
  | "reports" 
  | "settings"
  | "add-employee";

interface HRMContainerProps {
  onBackToProfile: () => void;
}

export function HRMContainer({ onBackToProfile }: HRMContainerProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view as View);
    setIsSidebarOpen(false);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardEnhanced onNavigate={handleNavigate} />;
      case "employees":
        return <EmployeesEnhanced onNavigate={handleNavigate} />;
      case "recruitment":
        return <RecruitmentEnhanced onNavigate={handleNavigate} />;
      case "attendance":
        return <Attendance onNavigate={handleNavigate} />;
      case "leave":
        return <LeaveManagementEnhanced onNavigate={handleNavigate} />;
      case "payroll":
        return <Payroll onNavigate={handleNavigate} />;
      case "performance":
        return <Performance onNavigate={handleNavigate} />;
      case "training":
        return <Training />;
      case "assets":
        return <Assets />;
      case "documents":
        return <Documents />;
      case "requests":
        return <Requests />;
      case "reports":
        return <Reports />;
      case "settings":
        return <SettingsEnhanced />;
      case "add-employee":
        return <AddEmployeePage onNavigate={handleNavigate} />;
      default:
        return <DashboardEnhanced onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <ModuleSidebar
        moduleName="HRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-blue-500 to-indigo-600"
        currentPage={currentView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToProfile={onBackToProfile}
        menuItems={hrmMenuItems}
      />

      {/* Mobile Sidebar */}
      <MobileModuleSidebar
        moduleName="HRM"
        moduleIcon={Users}
        moduleColor="bg-gradient-to-br from-blue-500 to-indigo-600"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentView}
        onNavigate={handleNavigate}
        onBackToProfile={onBackToProfile}
        menuItems={hrmMenuItems}
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