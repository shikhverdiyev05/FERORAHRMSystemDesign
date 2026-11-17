import { useEffect } from "react";
import { Command } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcuts({ open, onOpenChange }: KeyboardShortcutsProps) {
  const shortcuts: Shortcut[] = [
    { keys: ["Ctrl", "K"], description: "Open command palette", category: "General" },
    { keys: ["Ctrl", "/"], description: "Show keyboard shortcuts", category: "General" },
    { keys: ["Ctrl", "N"], description: "Add new employee", category: "Employees" },
    { keys: ["Ctrl", "F"], description: "Focus search", category: "Navigation" },
    { keys: ["Ctrl", "P"], description: "Print/Export", category: "Actions" },
    { keys: ["Esc"], description: "Close dialog", category: "General" },
    { keys: ["Tab"], description: "Navigate forward", category: "Navigation" },
    { keys: ["Shift", "Tab"], description: "Navigate backward", category: "Navigation" },
  ];

  const categories = [...new Set(shortcuts.map((s) => s.category))];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5" />
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </div>
          <DialogDescription>
            Use these shortcuts to navigate faster
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-accent rounded-lg"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Badge variant="outline" className="font-mono">
                              {key}
                            </Badge>
                            {i < shortcut.keys.length - 1 && (
                              <span className="text-xs text-muted-foreground">
                                +
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border text-xs text-muted-foreground">
          <p>
            Press <Badge variant="outline" className="font-mono mx-1">Ctrl</Badge> +{" "}
            <Badge variant="outline" className="font-mono mx-1">/</Badge> anytime to
            see this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook to manage keyboard shortcuts globally
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options?: { ctrl?: boolean; shift?: boolean; alt?: boolean }
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlPressed = options?.ctrl ? event.ctrlKey || event.metaKey : true;
      const shiftPressed = options?.shift ? event.shiftKey : !event.shiftKey;
      const altPressed = options?.alt ? event.altKey : !event.altKey;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        ctrlPressed &&
        (!options?.shift || shiftPressed) &&
        (!options?.alt || altPressed)
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, options]);
}
