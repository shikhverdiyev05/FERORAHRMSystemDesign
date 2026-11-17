import { useState, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export function FileUpload({
  label,
  accept = "image/*,.pdf",
  onChange,
  value,
  error,
  required,
  helperText,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onChange(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-8 h-8 text-primary" />;
    }
    return <FileText className="w-8 h-8 text-primary" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-2">
      <label className="block">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {!value ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
            ${error ? "border-destructive" : ""}
          `}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="mb-1 text-foreground">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-muted-foreground">
            {helperText || "Supported formats: Images and PDF"}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Max file size: 10MB</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-accent/30">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {getFileIcon(value)}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{value.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(value.size)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Upload ready</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1.5 text-sm bg-background border border-border rounded hover:bg-accent transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
      {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  );
}
