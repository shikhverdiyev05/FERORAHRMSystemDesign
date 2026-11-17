import { 
  ChevronLeft,
  ChevronRight,
  Building2,
  ArrowLeft,
  LucideIcon
} from "lucide-react";
import { Button } from "../ui/button";

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface ModuleSidebarProps {
  moduleName: string;
  moduleIcon: LucideIcon;
  moduleColor: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onBackToProfile?: () => void;
  menuItems: MenuItem[];
}

export function ModuleSidebar({ 
  moduleName,
  moduleIcon: ModuleIcon,
  moduleColor,
  currentPage, 
  onNavigate, 
  collapsed, 
  onToggleCollapse, 
  onBackToProfile,
  menuItems
}: ModuleSidebarProps) {
  return (
    <div 
      className={`h-screen bg-white border-r border-border flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } hidden md:flex`}
    >
      {/* Logo */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${moduleColor} rounded-lg flex items-center justify-center`}>
              <ModuleIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">FERORA {moduleName}</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-foreground bg-white hover:bg-blue-500 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Back to Profile Button */}
      {onBackToProfile && (
        <div className="px-4 py-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={onBackToProfile}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-foreground hover:bg-accent ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Back to Modules" : ""}
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Back to Modules</span>}
          </Button>
        </div>
      )}
    </div>
  );
}