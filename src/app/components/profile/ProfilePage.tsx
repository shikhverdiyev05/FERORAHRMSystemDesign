import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ProfileModuleSidebar } from "./ProfileModuleSidebar";
import { Button } from "../ui/button";

interface ProfilePageProps {
  onModuleSelect: (moduleId: string) => void;
  selectedModule: string;
}

export function ProfilePage({ onModuleSelect, selectedModule }: ProfilePageProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <ProfileModuleSidebar
        selectedModule={selectedModule}
        onModuleSelect={onModuleSelect}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="font-semibold">FERORA Enterprise</h2>
            </div>
          </div>
        </header>

        {/* Welcome Content */}
        <div className="p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to FERORA
              </h1>
              <p className="text-lg text-muted-foreground">
                Enterprise Management Platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* HRM Card */}
              <div
                onClick={() => onModuleSelect("hrm")}
                className="p-6 border-2 border-border rounded-xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Human Resource Management</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage employees, attendance, payroll, performance, and training
                </p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  Open Module
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* TMS Card */}
              <div
                onClick={() => onModuleSelect("tms")}
                className="p-6 border-2 border-border rounded-xl hover:border-green-500 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Transport Management System</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track vehicles, manage drivers, routes, and shipments in real-time
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  Open Module
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Coming Soon Modules */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">More modules available</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div
                  onClick={() => onModuleSelect("crm")}
                  className="p-4 border border-border rounded-lg hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">CRM</p>
                  <span className="text-xs text-muted-foreground">Customer Relations</span>
                </div>
                <div
                  onClick={() => onModuleSelect("srm")}
                  className="p-4 border border-border rounded-lg hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">SRM</p>
                  <span className="text-xs text-muted-foreground">Supplier Relations</span>
                </div>
                <div
                  onClick={() => onModuleSelect("apl")}
                  className="p-4 border border-border rounded-lg hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">APL</p>
                  <span className="text-xs text-muted-foreground">Legal & Policy</span>
                </div>
                <div
                  onClick={() => onModuleSelect("mrp")}
                  className="p-4 border border-border rounded-lg hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">MRP</p>
                  <span className="text-xs text-muted-foreground">Material Planning</span>
                </div>
                <div
                  onClick={() => onModuleSelect("erp")}
                  className="p-4 border border-border rounded-lg hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">ERP</p>
                  <span className="text-xs text-muted-foreground">Resource Planning</span>
                </div>
                <div
                  onClick={() => onModuleSelect("scm")}
                  className="p-4 border border-border rounded-lg hover:border-pink-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">SCM</p>
                  <span className="text-xs text-muted-foreground">Supply Chain</span>
                </div>
                <div
                  onClick={() => onModuleSelect("plm")}
                  className="p-4 border border-border rounded-lg hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-sm mb-1">PLM</p>
                  <span className="text-xs text-muted-foreground">Product Lifecycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}