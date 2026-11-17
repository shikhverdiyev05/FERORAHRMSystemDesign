import { AlertTriangle, Ban, ServerCrash, ArrowLeft, Home } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorPageProps {
  type: "404" | "403" | "500";
  onGoBack?: () => void;
  onGoHome?: () => void;
}

export function ErrorPage({ type, onGoBack, onGoHome }: ErrorPageProps) {
  const config = {
    "404": {
      icon: AlertTriangle,
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      code: "404",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    "403": {
      icon: Ban,
      title: "Access Denied",
      description: "You don't have permission to access this resource.",
      code: "403",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    "500": {
      icon: ServerCrash,
      title: "Server Error",
      description: "Something went wrong on our end. Please try again later.",
      code: "500",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  };

  const { icon: Icon, title, description, code, color, bgColor } = config[type];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className={`inline-flex items-center justify-center w-24 h-24 ${bgColor} rounded-full mb-6`}>
          <Icon className={`w-12 h-12 ${color}`} />
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">{code}</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>

        <div className="flex gap-3 justify-center">
          {onGoBack && (
            <Button variant="outline" onClick={onGoBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          )}
          {onGoHome && (
            <Button onClick={onGoHome}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: any;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
