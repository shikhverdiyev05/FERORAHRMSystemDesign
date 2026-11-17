import { GraduationCap, Package, FileText, ClipboardList, BarChart3, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { trainingPrograms, assets } from "../../data/mockData";
import { Badge } from "../ui/badge";

export function Training() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Training & Development</h1>
          <p className="text-muted-foreground">Manage employee training programs</p>
        </div>
        <Button className="gap-2">
          <GraduationCap className="w-4 h-4" />
          Add Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingPrograms.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                <Badge variant="secondary" className={program.status === "Ongoing" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                  {program.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Category: {program.category}</p>
                <p>Duration: {program.duration}</p>
                <p>Enrolled: {program.enrolled} employees</p>
                <p>Completed: {program.completed} employees</p>
              </div>
              <Button className="w-full mt-4" variant="outline">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Assets() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Asset Management</h1>
          <p className="text-muted-foreground">Track company assets and assignments</p>
        </div>
        <Button className="gap-2">
          <Package className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-accent/50 rounded-lg gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.assetId} • {asset.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Assigned to</p>
                    <p className="font-medium">{asset.assignedTo}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">{asset.condition}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Documents() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Document Management</h1>
          <p className="text-muted-foreground">Manage employee and company documents</p>
        </div>
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium mb-2">Document Library</p>
            <p className="text-sm">Upload and manage employee documents, contracts, and policies</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Requests() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Requests & Approvals</h1>
        <p className="text-muted-foreground">Manage employee requests and approval workflows</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
            <h3 className="text-2xl font-semibold mb-1">23</h3>
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <h3 className="text-2xl font-semibold mb-1">156</h3>
            <p className="text-sm text-muted-foreground">Approved This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-red-600" />
            <h3 className="text-2xl font-semibold mb-1">8</h3>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view HR reports</p>
        </div>
        <Button className="gap-2">
          <BarChart3 className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Employee Reports", "Attendance Reports", "Payroll Reports", "Performance Reports", "Turnover Reports", "Training Reports"].map((report) => (
          <Card key={report} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{report}</h3>
                  <p className="text-sm text-muted-foreground">Click to generate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Company Profile", desc: "Update company information" },
          { title: "Departments", desc: "Manage departments" },
          { title: "Job Titles", desc: "Configure job positions" },
          { title: "Locations", desc: "Manage office locations" },
          { title: "Roles & Permissions", desc: "Configure user access" },
          { title: "Leave Policies", desc: "Set leave rules" },
          { title: "Payroll Rules", desc: "Configure payroll settings" },
          { title: "Notifications", desc: "Email and push settings" },
        ].map((setting) => (
          <Card key={setting.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground">{setting.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
