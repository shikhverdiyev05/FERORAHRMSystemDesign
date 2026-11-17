import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  currentPage: string;
}

const pageNames: Record<string, string> = {
  dashboard: "Dashboard",
  employees: "Employee Management",
  recruitment: "Recruitment & ATS",
  attendance: "Attendance Management",
  leave: "Leave Management",
  payroll: "Payroll Management",
  performance: "Performance Management",
  training: "Training & Development",
  assets: "Asset Management",
  documents: "Document Management",
  requests: "Requests & Approvals",
  reports: "Reports & Analytics",
  settings: "Settings",
};

export function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Home className="w-4 h-4" />
      <ChevronRight className="w-4 h-4" />
      <span className="font-medium text-foreground">{pageNames[currentPage] || "Dashboard"}</span>
    </div>
  );
}
