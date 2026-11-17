import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "danger" | "success" | "warning" | "info";
  isLoading?: boolean;
  requireConfirmation?: boolean;
  confirmationText?: string;
  confirmationValue?: string;
  onConfirmationChange?: (value: string) => void;
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  isLoading = false,
  requireConfirmation = false,
  confirmationText,
  confirmationValue = "",
  onConfirmationChange,
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-600" />;
      default:
        return null;
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case "danger":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const isConfirmDisabled =
    requireConfirmation && confirmationText
      ? confirmationValue !== confirmationText
      : false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>

        {requireConfirmation && confirmationText && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Type <span className="font-mono font-semibold">{confirmationText}</span> to confirm
            </p>
            <input
              type="text"
              value={confirmationValue}
              onChange={(e) => onConfirmationChange?.(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={confirmationText}
              disabled={isLoading}
            />
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={getButtonVariant()}
            onClick={handleConfirm}
            disabled={isLoading || isConfirmDisabled}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
