import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface RegisterPageProps {
  onRegister: () => void;
  onLoginClick: () => void;
  isLoading?: boolean;
}

export function RegisterPage({
  onRegister,
  onLoginClick,
  isLoading = false,
}: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    language: "en",
    country: "",
    taxId: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.companyName ||
      !formData.email ||
      !formData.taxId
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    onRegister();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-xl border-border/50">
        <CardHeader className="text-center pb-8 border-b border-border/10 bg-muted/5">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create Corporate Account
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Join FERORA HRM to manage your workforce efficiently
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value)
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    placeholder="Enter official company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleChange(
                        "companyName",
                        e.target.value,
                      )
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">
                  Tax ID Number (TIN){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="taxId"
                    placeholder="Enter tax identification number"
                    value={formData.taxId}
                    onChange={(e) =>
                      handleChange("taxId", e.target.value)
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Corporate Email{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Corporate Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+994 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Localization */}
              <div className="space-y-2">
                <Label htmlFor="country">
                  Country{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.country}
                  onValueChange={(val) =>
                    handleChange("country", val)
                  }
                >
                  <SelectTrigger className="h-11 pl-10 relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aze">
                      Azerbaijan
                    </SelectItem>
                    <SelectItem value="tur">Turkey</SelectItem>
                    <SelectItem value="usa">
                      United States
                    </SelectItem>
                    <SelectItem value="gbr">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="deu">Germany</SelectItem>
                    <SelectItem value="uae">
                      United Arab Emirates
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">
                  Preferred Language
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(val) =>
                    handleChange("language", val)
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="az">
                      Azerbaijani
                    </SelectItem>
                    <SelectItem value="tr">Turkish</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Register Company{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t mt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto font-semibold text-primary"
                  onClick={onLoginClick}
                >
                  Sign in here
                </Button>
              </p>
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