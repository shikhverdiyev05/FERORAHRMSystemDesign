import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormFieldProps {
  label: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "textarea"
    | "select"
    | "date";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  success,
  required,
  disabled,
  helperText,
  options,
  rows = 4,
}: FormFieldProps) {
  const hasError = !!error;
  const hasSuccess = success && !hasError && value;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={rows}
          className={`${
            hasError
              ? "border-red-500 focus:ring-red-500"
              : hasSuccess
              ? "border-green-500 focus:ring-green-500"
              : ""
          }`}
        />
      );
    }

    if (type === "select" && options) {
      return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            className={`${
              hasError
                ? "border-red-500 focus:ring-red-500"
                : hasSuccess
                ? "border-green-500 focus:ring-green-500"
                : ""
            }`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`${
            hasError
              ? "border-red-500 focus:ring-red-500 pr-10"
              : hasSuccess
              ? "border-green-500 focus:ring-green-500 pr-10"
              : ""
          }`}
        />
        {hasSuccess && (
          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
        {hasError && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {renderInput()}

      {helperText && !error && (
        <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{helperText}</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
