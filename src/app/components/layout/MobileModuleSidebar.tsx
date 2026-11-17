import { X, ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface MobileModuleSidebarProps {
  moduleName: string;
  moduleIcon: LucideIcon;
  moduleColor: string;
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onBackToProfile?: () => void;
  menuItems: MenuItem[];
}

export function MobileModuleSidebar({
  moduleName,
  moduleIcon: ModuleIcon,
  moduleColor,
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onBackToProfile,
  menuItems
}: MobileModuleSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-border z-50 md:hidden flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${moduleColor} rounded-lg flex items-center justify-center`}>
              <ModuleIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">FERORA {moduleName}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
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
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-foreground bg-white hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
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
              onClick={() => {
                onBackToProfile();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-foreground hover:bg-accent"
            >
              <ArrowLeft className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Back to Modules</span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}