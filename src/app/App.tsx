import { useState, useEffect, useCallback } from "react";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { LoadingScreen } from "./components/ui/loading-screen";
import { ProfilePage } from "./components/profile/ProfilePage";
import { HRMContainer } from "./components/hrm/HRMContainer";
import { TMSContainer } from "./components/tms/TMSContainer";
import { CRMContainer } from "./components/crm/CRMContainer";
import { SRMContainer } from "./components/srm/SRMContainer";
import { APLContainer } from "./components/apl/APLContainer";
import { MRPContainer } from "./components/mrp/MRPContainer";
import { ERPContainer } from "./components/erp/ERPContainer";
import { SCMContainer } from "./components/scm/SCMContainer";
import { PLMContainer } from "./components/plm/PLMContainer";
import { Toaster } from "./components/ui/sonner";
import { CommandPalette } from "./components/design-system/CommandPalette";
import { KeyboardShortcuts } from "./components/design-system/KeyboardShortcuts";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      // Keyboard Shortcuts Help: Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
      // Close dialogs with Escape
      if (e.key === "Escape") {
        setShowCommandPalette(false);
        setShowKeyboardShortcuts(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (isRegistering) {
      return (
        <RegisterPage
          onRegister={handleLogin}
          onLoginClick={() => setIsRegistering(false)}
          isLoading={isLoading}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegisterClick={() => setIsRegistering(true)}
        isLoading={isLoading}
      />
    );
  }

  // Show Profile/Module Selection page if no module is selected
  if (!selectedModule) {
    return (
      <>
        <ProfilePage
          selectedModule={selectedModule || ""}
          onModuleSelect={setSelectedModule}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Render the selected module
  if (selectedModule === "hrm") {
    return (
      <>
        <HRMContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
        <CommandPalette
          open={showCommandPalette}
          onOpenChange={setShowCommandPalette}
          onNavigate={(page) => {
            setCurrentPage(page);
            setShowCommandPalette(false);
          }}
        />
        <KeyboardShortcuts
          open={showKeyboardShortcuts}
          onOpenChange={setShowKeyboardShortcuts}
        />
      </>
    );
  }

  if (selectedModule === "tms") {
    return (
      <>
        <TMSContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "crm") {
    return (
      <>
        <CRMContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "srm") {
    return (
      <>
        <SRMContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "apl") {
    return (
      <>
        <APLContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "mrp") {
    return (
      <>
        <MRPContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "erp") {
    return (
      <>
        <ERPContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "scm") {
    return (
      <>
        <SCMContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  if (selectedModule === "plm") {
    return (
      <>
        <PLMContainer onBackToProfile={() => setSelectedModule(null)} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Fallback for other modules (coming soon)
  return (
    <>
      <ProfilePage
        selectedModule={selectedModule}
        onModuleSelect={setSelectedModule}
      />
      <Toaster position="top-right" richColors />
    </>
  );
}