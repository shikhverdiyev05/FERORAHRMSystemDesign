import { useState } from "react";
import { Plus, UserPlus, CalendarDays, FileText, X } from "lucide-react";
import { Button } from "../ui/button";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: UserPlus, label: "Add Employee", color: "bg-blue-500" },
    { icon: CalendarDays, label: "Leave Request", color: "bg-green-500" },
    { icon: FileText, label: "Document", color: "bg-purple-500" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30 md:hidden">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2 mb-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.label}
                className="flex items-center gap-2 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-white px-3 py-1 rounded-full shadow-lg text-sm font-medium whitespace-nowrap">
                  {action.label}
                </span>
                <Button
                  size="icon"
                  className={`${action.color} hover:opacity-90 shadow-lg rounded-full w-12 h-12`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-lg rounded-full w-14 h-14 transition-transform ${
          isOpen ? "rotate-45 bg-red-500 hover:bg-red-600" : "bg-primary"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  );
}
