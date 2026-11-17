import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
}: FormModalProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "sm:max-w-md";
      case "md":
        return "sm:max-w-lg";
      case "lg":
        return "sm:max-w-2xl";
      case "xl":
        return "sm:max-w-4xl";
      case "full":
        return "sm:max-w-6xl";
      default:
        return "sm:max-w-lg";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${getSizeClass()} max-h-[90vh] p-0`}>
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl">{title}</DialogTitle>
              {description && (
                <DialogDescription className="mt-1.5">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4 max-h-[calc(90vh-140px)]">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
