import { 
  Building2, 
  Users, 
  Package, 
  ClipboardList, 
  Boxes, 
  Database, 
  Truck, 
  UserCircle,
  Warehouse,
  GitBranch
} from "lucide-react";
import { cn } from "../ui/utils";

interface Module {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

const modules: Module[] = [
  {
    id: "hrm",
    name: "HRM",
    icon: Users,
    color: "bg-blue-500",
    description: "Human Resource Management",
  },
  {
    id: "tms",
    name: "TMS",
    icon: Truck,
    color: "bg-green-500",
    description: "Transport Management System",
  },
  {
    id: "crm",
    name: "CRM",
    icon: UserCircle,
    color: "bg-purple-500",
    description: "Customer Relationship Management",
  },
  {
    id: "srm",
    name: "SRM",
    icon: Package,
    color: "bg-orange-500",
    description: "Supplier Relationship Management",
  },
  {
    id: "apl",
    name: "APL",
    icon: ClipboardList,
    color: "bg-pink-500",
    description: "Application Lifecycle",
  },
  {
    id: "mrp",
    name: "MRP",
    icon: Boxes,
    color: "bg-yellow-500",
    description: "Material Requirements Planning",
  },
  {
    id: "erp",
    name: "ERP",
    icon: Database,
    color: "bg-red-500",
    description: "Enterprise Resource Planning",
  },
  {
    id: "scm",
    name: "SCM",
    icon: Warehouse,
    color: "bg-cyan-500",
    description: "Supply Chain Management",
  },
  {
    id: "plm",
    name: "PLM",
    icon: GitBranch,
    color: "bg-indigo-500",
    description: "Product Lifecycle Management",
  },
];

interface ProfileModuleSidebarProps {
  selectedModule: string;
  onModuleSelect: (moduleId: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function ProfileModuleSidebar({
  selectedModule,
  onModuleSelect,
  isMobileOpen = false,
  onMobileClose,
}: ProfileModuleSidebarProps) {
  const handleModuleClick = (moduleId: string) => {
    onModuleSelect(moduleId);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transition-transform duration-300 flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">FERORA</h1>
              <p className="text-xs text-muted-foreground">Enterprise Systems</p>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Select Module
          </p>
          <div className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = selectedModule === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left group",
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-accent",
                    !isActive && "hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-transform",
                        module.color,
                        isActive && "scale-110"
                      )}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={cn(
                            "font-semibold text-sm",
                            isActive && "text-primary"
                          )}
                        >
                          {module.name}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@ferora.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}