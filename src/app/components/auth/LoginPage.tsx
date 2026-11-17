import { useState } from "react";
import { Building2, Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface LoginPageProps {
  onLogin: () => void;
  onRegisterClick?: () => void;
  isLoading?: boolean;
}

export function LoginPage({ onLogin, onRegisterClick, isLoading = false }: LoginPageProps) {
  const [email, setEmail] = useState("admin@ferora.com");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">FERORA HRM System</CardTitle>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p>Demo Credentials:</p>
                <p className="font-mono text-xs mt-1">admin@ferora.com / admin123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 FERORA. All rights reserved.</p>
      </div>
    </div>
  );
}
