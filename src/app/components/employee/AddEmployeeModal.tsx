import { useState } from "react";
import { FormModal } from "../design-system/FormModal";
import { MultiStepForm } from "../design-system/MultiStepForm";
import { FormField } from "../design-system/FormField";
import { toast } from "sonner";

interface AddEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface EmployeeFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;

  // Employment Info
  employeeId: string;
  department: string;
  position: string;
  manager: string;
  joinDate: string;
  contractType: string;

  // Compensation
  salary: string;
  location: string;
}

const initialFormData: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  employeeId: "",
  department: "",
  position: "",
  manager: "",
  joinDate: "",
  contractType: "",
  salary: "",
  location: "",
};

export function AddEmployeeModal({
  open,
  onOpenChange,
  onSuccess,
}: AddEmployeeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: "personal",
      title: "Personal Info",
      description: "Basic information",
    },
    {
      id: "employment",
      title: "Employment",
      description: "Job details",
    },
    {
      id: "compensation",
      title: "Compensation",
      description: "Salary & benefits",
    },
  ];

  const updateField = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    } else if (step === 1) {
      if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.position) newErrors.position = "Position is required";
      if (!formData.manager) newErrors.manager = "Manager is required";
      if (!formData.joinDate) newErrors.joinDate = "Join date is required";
      if (!formData.contractType) newErrors.contractType = "Contract type is required";
    } else if (step === 2) {
      if (!formData.salary) {
        newErrors.salary = "Salary is required";
      } else if (isNaN(Number(formData.salary))) {
        newErrors.salary = "Salary must be a number";
      }
      if (!formData.location) newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (newStep: number) => {
    if (newStep > currentStep) {
      // Validate current step before moving forward
      if (validateStep(currentStep)) {
        setCurrentStep(newStep);
      }
    } else {
      // Allow going back without validation
      setCurrentStep(newStep);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Employee added successfully!", {
        description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
      });

      setIsLoading(false);
      setFormData(initialFormData);
      setCurrentStep(0);
      setErrors({});
      onSuccess();
      onOpenChange(false);
    }, 1500);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setErrors({});
    onOpenChange(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={(value) => updateField("firstName", value)}
                error={errors.firstName}
                required
                placeholder="John"
              />
              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={(value) => updateField("lastName", value)}
                error={errors.lastName}
                required
                placeholder="Doe"
              />
            </div>

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              error={errors.email}
              required
              placeholder="john.doe@ferora.com"
              success={formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              error={errors.phone}
              required
              placeholder="+1 (555) 123-4567"
            />

            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(value) => updateField("dateOfBirth", value)}
              error={errors.dateOfBirth}
              required
            />

            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={formData.gender}
              onChange={(value) => updateField("gender", value)}
              error={errors.gender}
              required
              placeholder="Select gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <FormField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={(value) => updateField("employeeId", value)}
              error={errors.employeeId}
              required
              placeholder="EMP001"
              helperText="Unique identifier for the employee"
            />

            <FormField
              label="Department"
              name="department"
              type="select"
              value={formData.department}
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
              value={formData.position}
              onChange={(value) => updateField("position", value)}
              error={errors.position}
              required
              placeholder="Software Engineer"
            />

            <FormField
              label="Manager"
              name="manager"
              value={formData.manager}
              onChange={(value) => updateField("manager", value)}
              error={errors.manager}
              required
              placeholder="Manager name"
            />

            <FormField
              label="Join Date"
              name="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(value) => updateField("joinDate", value)}
              error={errors.joinDate}
              required
            />

            <FormField
              label="Contract Type"
              name="contractType"
              type="select"
              value={formData.contractType}
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              label="Annual Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={(value) => updateField("salary", value)}
              error={errors.salary}
              required
              placeholder="75000"
              helperText="Annual salary in USD"
            />

            <FormField
              label="Location"
              name="location"
              type="select"
              value={formData.location}
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

            {/* Summary */}
            <div className="mt-6 p-4 bg-accent rounded-lg space-y-2">
              <h4 className="font-medium mb-3">Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">
                  {formData.firstName} {formData.lastName}
                </div>

                <div className="text-muted-foreground">Employee ID:</div>
                <div className="font-medium">{formData.employeeId}</div>

                <div className="text-muted-foreground">Department:</div>
                <div className="font-medium">{formData.department}</div>

                <div className="text-muted-foreground">Position:</div>
                <div className="font-medium">{formData.position}</div>

                <div className="text-muted-foreground">Salary:</div>
                <div className="font-medium">
                  ${Number(formData.salary).toLocaleString()}
                </div>

                <div className="text-muted-foreground">Location:</div>
                <div className="font-medium">{formData.location}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Employee"
      description="Fill in the employee information to add them to the system"
      size="lg"
    >
      <MultiStepForm
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        canGoNext={true}
      >
        {renderStepContent()}
      </MultiStepForm>
    </FormModal>
  );
}
