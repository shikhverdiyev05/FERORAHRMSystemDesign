import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Lock,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { FormField } from "../design-system/FormField";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SettingsEnhanced() {
  const [isDirty, setIsDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // General Settings
  const [companyName, setCompanyName] = useState("FERORA");
  const [timezone, setTimezone] = useState("UTC-5");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [currency, setCurrency] = useState("USD");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [leaveRequestNotifs, setLeaveRequestNotifs] = useState(true);
  const [newHireNotifs, setNewHireNotifs] = useState(true);
  const [payrollNotifs, setPayrollNotifs] = useState(true);

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordExpiry, setPasswordExpiry] = useState("90");

  // Appearance Settings
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("blue");
  const [compactMode, setCompactMode] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated successfully.",
    });
    setIsDirty(false);
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
    setIsDirty(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        {isDirty && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-yellow-900">
              You have unsaved changes
            </span>
          </div>
          <Button size="sm" onClick={handleSave}>
            Save Now
          </Button>
        </div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            <div className="space-y-4">
              <FormField
                label="Company Name"
                name="companyName"
                value={companyName}
                onChange={(value) => {
                  setCompanyName(value);
                  setIsDirty(true);
                }}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Timezone"
                  name="timezone"
                  type="select"
                  value={timezone}
                  onChange={(value) => {
                    setTimezone(value);
                    setIsDirty(true);
                  }}
                  options={[
                    { value: "UTC-8", label: "Pacific Time (UTC-8)" },
                    { value: "UTC-7", label: "Mountain Time (UTC-7)" },
                    { value: "UTC-6", label: "Central Time (UTC-6)" },
                    { value: "UTC-5", label: "Eastern Time (UTC-5)" },
                  ]}
                />

                <FormField
                  label="Date Format"
                  name="dateFormat"
                  type="select"
                  value={dateFormat}
                  onChange={(value) => {
                    setDateFormat(value);
                    setIsDirty(true);
                  }}
                  options={[
                    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                  ]}
                />
              </div>

              <FormField
                label="Currency"
                name="currency"
                type="select"
                value={currency}
                onChange={(value) => {
                  setCurrency(value);
                  setIsDirty(true);
                }}
                options={[
                  { value: "USD", label: "USD - US Dollar" },
                  { value: "EUR", label: "EUR - Euro" },
                  { value: "GBP", label: "GBP - British Pound" },
                  { value: "AZN", label: "AZN - Azerbaijani Manat" },
                ]}
              />
            </div>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="First Name"
                  name="firstName"
                  value="John"
                  onChange={() => setIsDirty(true)}
                  required
                />
                <FormField
                  label="Last Name"
                  name="lastName"
                  value="Anderson"
                  onChange={() => setIsDirty(true)}
                  required
                />
              </div>

              <FormField
                label="Email"
                name="email"
                type="email"
                value="john.anderson@ferora.com"
                onChange={() => setIsDirty(true)}
                required
              />

              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value="+1 (555) 123-4567"
                onChange={() => setIsDirty(true)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div className="relative">
                <FormField
                  label="Current Password"
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value=""
                  onChange={() => setIsDirty(true)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="New Password"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value=""
                  onChange={() => setIsDirty(true)}
                  required
                />
                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value=""
                  onChange={() => setIsDirty(true)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={showPassword}
                  onCheckedChange={setShowPassword}
                  id="show-password"
                />
                <Label htmlFor="show-password" className="cursor-pointer">
                  Show passwords
                </Label>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifs">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifs"
                  checked={emailNotifications}
                  onCheckedChange={(checked) => {
                    setEmailNotifications(checked);
                    setIsDirty(true);
                  }}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifs">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch
                  id="push-notifs"
                  checked={pushNotifications}
                  onCheckedChange={(checked) => {
                    setPushNotifications(checked);
                    setIsDirty(true);
                  }}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notify me about:</h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="leave-notifs">Leave Requests</Label>
                  <Switch
                    id="leave-notifs"
                    checked={leaveRequestNotifs}
                    onCheckedChange={(checked) => {
                      setLeaveRequestNotifs(checked);
                      setIsDirty(true);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="hire-notifs">New Hires</Label>
                  <Switch
                    id="hire-notifs"
                    checked={newHireNotifs}
                    onCheckedChange={(checked) => {
                      setNewHireNotifs(checked);
                      setIsDirty(true);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="payroll-notifs">Payroll Updates</Label>
                  <Switch
                    id="payroll-notifs"
                    checked={payrollNotifs}
                    onCheckedChange={(checked) => {
                      setPayrollNotifs(checked);
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorAuth}
                  onCheckedChange={(checked) => {
                    setTwoFactorAuth(checked);
                    setIsDirty(true);
                  }}
                />
              </div>

              <Separator />

              <FormField
                label="Session Timeout"
                name="sessionTimeout"
                type="select"
                value={sessionTimeout}
                onChange={(value) => {
                  setSessionTimeout(value);
                  setIsDirty(true);
                }}
                options={[
                  { value: "15", label: "15 minutes" },
                  { value: "30", label: "30 minutes" },
                  { value: "60", label: "1 hour" },
                  { value: "240", label: "4 hours" },
                ]}
                helperText="Automatically log out after this period of inactivity"
              />

              <FormField
                label="Password Expiry"
                name="passwordExpiry"
                type="select"
                value={passwordExpiry}
                onChange={(value) => {
                  setPasswordExpiry(value);
                  setIsDirty(true);
                }}
                options={[
                  { value: "30", label: "30 days" },
                  { value: "60", label: "60 days" },
                  { value: "90", label: "90 days" },
                  { value: "never", label: "Never" },
                ]}
                helperText="Require password change after this period"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">
                    Chrome on Windows • New York, USA
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-muted-foreground">
                    iOS • Last active 2 hours ago
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Revoke
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
            <div className="space-y-6">
              <div>
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {["light", "dark", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setIsDirty(true);
                      }}
                      className={`p-4 border-2 rounded-lg capitalize transition-all ${
                        theme === t
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-3 mt-3">
                  {[
                    { name: "blue", color: "#2563eb" },
                    { name: "purple", color: "#7c3aed" },
                    { name: "green", color: "#10b981" },
                    { name: "orange", color: "#f59e0b" },
                    { name: "pink", color: "#ec4899" },
                    { name: "red", color: "#ef4444" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setAccentColor(c.name);
                        setIsDirty(true);
                      }}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        accentColor === c.name
                          ? "border-foreground scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing and padding throughout the interface
                  </p>
                </div>
                <Switch
                  id="compact"
                  checked={compactMode}
                  onCheckedChange={(checked) => {
                    setCompactMode(checked);
                    setIsDirty(true);
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Connected Services</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Google Workspace",
                  description: "Sync calendar and contacts",
                  connected: true,
                },
                {
                  name: "Slack",
                  description: "Send notifications to Slack channels",
                  connected: true,
                },
                {
                  name: "Microsoft Teams",
                  description: "Integrate with Teams workspace",
                  connected: false,
                },
                {
                  name: "Zoom",
                  description: "Schedule and manage video meetings",
                  connected: false,
                },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  {service.connected ? (
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-800">
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
