import { X, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, Award, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  manager: string;
  status: string;
  joinDate: string;
  avatar: string;
  salary: number;
  location: string;
  gender: string;
  dateOfBirth: string;
  contractType: string;
}

interface ViewEmployeeProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onEdit: () => void;
}

export function ViewEmployeeProfile({
  open,
  onOpenChange,
  employee,
  onEdit,
}: ViewEmployeeProfileProps) {
  if (!employee) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Probation":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateTenure = (joinDate: string) => {
    const start = new Date(joinDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const activityLog = [
    { date: "2024-02-10", action: "Completed training: Leadership Skills", type: "training" },
    { date: "2024-02-05", action: "Performance review completed", type: "review" },
    { date: "2024-01-20", action: "Leave approved: 3 days", type: "leave" },
    { date: "2024-01-15", action: "Asset assigned: MacBook Pro", type: "asset" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl">Employee Profile</DialogTitle>
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit Profile
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-6 max-h-[calc(90vh-120px)]">
          {/* Header Section */}
          <div className="flex items-start gap-6 mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">{employee.name}</h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    {employee.position}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(employee.status)} variant="secondary">
                      {employee.status}
                    </Badge>
                    <Badge variant="outline">{employee.employeeId}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Personal Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Full Name</label>
                      <p className="font-medium">{employee.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Date of Birth</label>
                      <p className="font-medium">
                        {new Date(employee.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Gender</label>
                      <p className="font-medium">{employee.gender}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="font-medium">{employee.email}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Quick Stats</h3>
                  
                  <div className="grid gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tenure</p>
                          <p className="font-semibold">{calculateTenure(employee.joinDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Performance</p>
                          <p className="font-semibold">Exceeds Expectations</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Leave Balance</p>
                          <p className="font-semibold">15 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Employment Details</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Employee ID</label>
                    <p className="font-medium font-mono">{employee.employeeId}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Department</label>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Position</label>
                    <p className="font-medium">{employee.position}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Manager</label>
                    <p className="font-medium">{employee.manager}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Join Date</label>
                    <p className="font-medium">
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Contract Type</label>
                    <p className="font-medium">{employee.contractType}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(employee.status)} variant="secondary">
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Location</label>
                    <p className="font-medium">{employee.location}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compensation" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Compensation & Benefits</h3>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Salary</p>
                      <p className="text-3xl font-semibold text-green-700">
                        ${employee.salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly</p>
                      <p className="font-semibold">
                        ${(employee.salary / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bi-weekly</p>
                      <p className="font-semibold">
                        ${(employee.salary / 26).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hourly</p>
                      <p className="font-semibold">
                        ${(employee.salary / 2080).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Health Insurance</p>
                    <p className="font-medium">Premium Plan</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">401(k) Match</p>
                    <p className="font-medium">5% Match</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Paid Time Off</p>
                    <p className="font-medium">20 days/year</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Stock Options</p>
                    <p className="font-medium">1,000 shares</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-6">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              
              <div className="space-y-3">
                {activityLog.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
