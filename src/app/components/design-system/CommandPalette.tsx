import { useState, useEffect } from "react";
import { Search, File, Users, Briefcase, Calendar, DollarSign, Settings, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  keywords: string[];
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      subtitle: "Go to dashboard",
      icon: Home,
      action: () => onNavigate("dashboard"),
      keywords: ["home", "overview", "main"],
    },
    {
      id: "employees",
      title: "Employees",
      subtitle: "View all employees",
      icon: Users,
      action: () => onNavigate("employees"),
      keywords: ["staff", "team", "people"],
    },
    {
      id: "add-employee",
      title: "Add Employee",
      subtitle: "Add a new employee to the system",
      icon: Users,
      action: () => onNavigate("add-employee"),
      keywords: ["new employee", "create employee", "hire"],
    },
    {
      id: "recruitment",
      title: "Recruitment",
      subtitle: "Manage job postings and candidates",
      icon: Briefcase,
      action: () => onNavigate("recruitment"),
      keywords: ["jobs", "hiring", "ats", "candidates"],
    },
    {
      id: "leave",
      title: "Leave Management",
      subtitle: "Review leave requests",
      icon: Calendar,
      action: () => onNavigate("leave"),
      keywords: ["vacation", "time off", "absence"],
    },
    {
      id: "payroll",
      title: "Payroll",
      subtitle: "Manage payroll",
      icon: DollarSign,
      action: () => onNavigate("payroll"),
      keywords: ["salary", "payment", "compensation"],
    },
    {
      id: "settings",
      title: "Settings",
      subtitle: "Configure application",
      icon: Settings,
      action: () => onNavigate("settings"),
      keywords: ["preferences", "configuration"],
    },
  ];

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase();
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.subtitle?.toLowerCase().includes(searchLower) ||
      command.keywords.some((keyword) => keyword.includes(searchLower))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 sm:max-w-2xl">
        <div className="flex items-center border-b border-border px-4">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Input
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        </div>

        <ScrollArea className="max-h-96">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="p-2">
              {filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={() => {
                      command.action();
                      onOpenChange(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      index === selectedIndex
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{command.title}</p>
                      {command.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">
                          {command.subtitle}
                        </p>
                      )}
                    </div>
                    {index === selectedIndex && (
                      <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⏎</span>
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Esc</kbd>
            to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
