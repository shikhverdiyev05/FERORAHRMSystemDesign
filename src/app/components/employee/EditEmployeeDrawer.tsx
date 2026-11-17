import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { FormField } from "../design-system/FormField";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
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
  salary: number;
  location: string;
  gender: string;
  dateOfBirth: string;
  contractType: string;
}

interface EditEmployeeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onSuccess: () => void;
}

export function EditEmployeeDrawer({
  open,
  onOpenChange,
  employee,
  onSuccess,
}: EditEmployeeDrawerProps) {
  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (employee) {
      const data = {
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        manager: employee.manager,
        status: employee.status,
        joinDate: employee.joinDate,
        salary: employee.salary.toString(),
        location: employee.location,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        contractType: employee.contractType,
      };
      setFormData(data);
      setOriginalData(data);
      setHasChanges(false);
    }
  }, [employee]);

  const updateField = (field: string, value: string) => {
    setFormData((prev: any) => {
      const newData = { ...prev, [field]: value };
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(originalData));
      return newData;
    });

    if (errors[field]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Employee updated successfully!", {
        description: `Changes for ${formData.name} have been saved.`,
      });

      setIsLoading(false);
      setOriginalData(formData);
      setHasChanges(false);
      onSuccess();
      onOpenChange(false);
    }, 1000);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        confirm(
          "You have unsaved changes. Are you sure you want to close without saving?"
        )
      ) {
        setFormData(originalData);
        setHasChanges(false);
        onOpenChange(false);
      }
    } else {
      onOpenChange(false);
    }
  };

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle>Edit Employee</SheetTitle>
              <SheetDescription>
                Update employee information for {employee.name}
              </SheetDescription>
            </div>
          </div>
          {hasChanges && (
            <div className="mt-3 px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800">
              You have unsaved changes
            </div>
          )}
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] px-6 py-4">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="compensation">Compensation</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name || ""}
                onChange={(value) => updateField("name", value)}
                error={errors.name}
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={(value) => updateField("email", value)}
                error={errors.email}
                required
                success={
                  formData.email &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                }
              />

              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={(value) => updateField("phone", value)}
                error={errors.phone}
                required
              />

              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={(value) => updateField("dateOfBirth", value)}
                error={errors.dateOfBirth}
              />

              <FormField
                label="Gender"
                name="gender"
                type="select"
                value={formData.gender || ""}
                onChange={(value) => updateField("gender", value)}
                error={errors.gender}
                placeholder="Select gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </TabsContent>

            <TabsContent value="employment" className="space-y-4 mt-4">
              <FormField
                label="Employee ID"
                name="employeeId"
                value={formData.employeeId || ""}
                onChange={(value) => updateField("employeeId", value)}
                error={errors.employeeId}
                required
                disabled
                helperText="Employee ID cannot be changed"
              />

              <FormField
                label="Department"
                name="department"
                type="select"
                value={formData.department || ""}
                onChange={(value) => updateField("department", value)}
                error={errors.department}
                required
                placeholder="Select department"
                options={[
                  { value: "Engineering", label: "Engineering" },
                  { value: "Sales", label: "Sales" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "HR", label: "Human Resources" },
                  { value: "Finance", label: "Finance" },
                  { value: "Operations", label: "Operations" },
                ]}
              />

              <FormField
                label="Position"
                name="position"
                value={formData.position || ""}
                onChange={(value) => updateField("position", value)}
                error={errors.position}
                required
              />

              <FormField
                label="Manager"
                name="manager"
                value={formData.manager || ""}
                onChange={(value) => updateField("manager", value)}
                error={errors.manager}
                required
              />

              <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status || ""}
                onChange={(value) => updateField("status", value)}
                error={errors.status}
                required
                placeholder="Select status"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Probation", label: "Probation" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />

              <FormField
                label="Join Date"
                name="joinDate"
                type="date"
                value={formData.joinDate || ""}
                onChange={(value) => updateField("joinDate", value)}
                error={errors.joinDate}
                required
              />

              <FormField
                label="Contract Type"
                name="contractType"
                type="select"
                value={formData.contractType || ""}
                onChange={(value) => updateField("contractType", value)}
                error={errors.contractType}
                required
                placeholder="Select contract type"
                options={[
                  { value: "Full-time", label: "Full-time" },
                  { value: "Part-time", label: "Part-time" },
                  { value: "Contract", label: "Contract" },
                  { value: "Internship", label: "Internship" },
                ]}
              />
            </TabsContent>

            <TabsContent value="compensation" className="space-y-4 mt-4">
              <FormField
                label="Annual Salary"
                name="salary"
                type="number"
                value={formData.salary || ""}
                onChange={(value) => updateField("salary", value)}
                error={errors.salary}
                required
                helperText="Annual salary in USD"
              />

              <FormField
                label="Location"
                name="location"
                type="select"
                value={formData.location || ""}
                onChange={(value) => updateField("location", value)}
                error={errors.location}
                required
                placeholder="Select location"
                options={[
                  { value: "New York", label: "New York" },
                  { value: "San Francisco", label: "San Francisco" },
                  { value: "Chicago", label: "Chicago" },
                  { value: "Boston", label: "Boston" },
                  { value: "Remote", label: "Remote" },
                ]}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-border bg-background flex justify-between">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
