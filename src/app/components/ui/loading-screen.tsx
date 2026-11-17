import { Building2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Building2 className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 gradient-text">FERORA HRM</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
