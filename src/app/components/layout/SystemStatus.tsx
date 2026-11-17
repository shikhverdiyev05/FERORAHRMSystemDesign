import { Activity, Database, Shield, Zap } from "lucide-react";
import { Badge } from "../ui/badge";

export function SystemStatus() {
  const status = [
    { icon: Activity, label: "System Status", value: "Operational", color: "text-green-600" },
    { icon: Database, label: "Database", value: "Connected", color: "text-green-600" },
    { icon: Shield, label: "Security", value: "Active", color: "text-green-600" },
    { icon: Zap, label: "Performance", value: "Optimal", color: "text-green-600" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-green-50 border-b border-green-100">
      {status.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <Icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-muted-foreground">{item.label}:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              {item.value}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}
