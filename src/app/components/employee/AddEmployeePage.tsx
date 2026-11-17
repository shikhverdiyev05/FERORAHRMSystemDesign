import { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  Plus,
  X,
  HelpCircle,
  User,
  ChevronRight,
  Save,
  AlertCircle
} from "lucide-react";
import { FileUpload } from "./FileUpload";
import { toast } from "sonner@2.0.3";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../ui/utils";

interface EmploymentHistory {
  id: string;
  companyName: string;
  industry: string;
  position: string;
  department: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  lastSalary: string;
  reasonForLeaving: string;
  supervisorName: string;
  referenceContact: string;
}

interface EmployeeFormData {
  // Step 1: Personal Information
  // Profile & Identity
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;

  // Identification Details
  idCardSerial: string;
  idCardNumber: string;
  pin: string;
  idIssueDate: string;
  idExpiryDate: string;
  issuingAuthority: string;

  // Education Information
  educationLevel: string;
  universityName: string;
  faculty: string;
  degreeType: string;
  graduationYear: string;
  gpa: string;

  // Document Uploads
  idCardFront: File | null;
  idCardBack: File | null;
  diploma: File | null;
  additionalDocs: File | null;

  // Step 2: Employment History
  employmentHistory: EmploymentHistory[];

  // Step 3: Job Assignment & Salary
  // Job Placement
  department: string;
  positionTitle: string;
  employmentType: string;
  workLocation: string;
  reportingManager: string;
  workSchedule: string;
  probationPeriod: string;

  // Compensation Details
  baseSalary: string;
  currency: string;
  paymentFrequency: string;
  bonusStructure: string;
  allowances: string;
  taxCategory: string;
  bankAccountNumber: string;
  iban: string;
  bankName: string;

  // System Role Assignment
  systemRole: string;
  accessLevel: string;
  generateCredentials: boolean;
  sendWelcomeEmail: boolean;

  // Additional Notes
  additionalNotes: string;
}

const initialFormData: EmployeeFormData = {
  profilePhoto: null,
  firstName: "",
  lastName: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  idCardSerial: "",
  idCardNumber: "",
  pin: "",
  idIssueDate: "",
  idExpiryDate: "",
  issuingAuthority: "",
  educationLevel: "",
  universityName: "",
  faculty: "",
  degreeType: "",
  graduationYear: "",
  gpa: "",
  idCardFront: null,
  idCardBack: null,
  diploma: null,
  additionalDocs: null,
  employmentHistory: [],
  department: "",
  positionTitle: "",
  employmentType: "",
  workLocation: "",
  reportingManager: "",
  workSchedule: "",
  probationPeriod: "",
  baseSalary: "",
  currency: "USD",
  paymentFrequency: "Monthly",
  bonusStructure: "",
  allowances: "",
  taxCategory: "",
  bankAccountNumber: "",
  iban: "",
  bankName: "",
  systemRole: "Employee",
  accessLevel: "Standard",
  generateCredentials: true,
  sendWelcomeEmail: true,
  additionalNotes: "",
};

interface AddEmployeePageProps {
  onBack: () => void;
}

export function AddEmployeePage({ onBack }: AddEmployeePageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState<string[]>([]);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      icon: User,
      description: "Profile, ID, Education & Documents",
    },
    {
      id: "employment",
      title: "Employment History",
      icon: Briefcase,
      description: "Previous work experience",
    },
    {
      id: "assignment",
      title: "Job Assignment & Salary",
      icon: DollarSign,
      description: "Current job & compensation",
    },
  ];

  const updateField = (field: keyof EmployeeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addEmploymentHistory = () => {
    const newHistory: EmploymentHistory = {
      id: Date.now().toString(),
      companyName: "",
      industry: "",
      position: "",
      department: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      lastSalary: "",
      reasonForLeaving: "",
      supervisorName: "",
      referenceContact: "",
    };
    setFormData((prev) => ({
      ...prev,
      employmentHistory: [...prev.employmentHistory, newHistory],
    }));
    setExpandedHistory((prev) => [...prev, newHistory.id]);
    setHasUnsavedChanges(true);
  };

  const removeEmploymentHistory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      employmentHistory: prev.employmentHistory.filter((h) => h.id !== id),
    }));
    setExpandedHistory((prev) => prev.filter((hId) => hId !== id));
    setHasUnsavedChanges(true);
  };

  const updateEmploymentHistory = (
    id: string,
    field: keyof EmploymentHistory,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      employmentHistory: prev.employmentHistory.map((h) =>
        h.id === id ? { ...h, [field]: value } : h
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const toggleHistoryExpanded = (id: string) => {
    setExpandedHistory((prev) =>
      prev.includes(id) ? prev.filter((hId) => hId !== id) : [...prev, id]
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      // Personal Information validation
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.nationality) newErrors.nationality = "Nationality is required";
      if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
      if (!formData.idCardNumber) newErrors.idCardNumber = "ID card number is required";
      if (!formData.pin) newErrors.pin = "PIN is required";
      if (!formData.educationLevel) newErrors.educationLevel = "Education level is required";
    } else if (step === 2) {
      // Job Assignment validation
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.positionTitle) newErrors.positionTitle = "Position title is required";
      if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
      if (!formData.workLocation) newErrors.workLocation = "Work location is required";
      if (!formData.reportingManager)
        newErrors.reportingManager = "Reporting manager is required";
      if (!formData.baseSalary) newErrors.baseSalary = "Base salary is required";
      if (!formData.bankAccountNumber)
        newErrors.bankAccountNumber = "Bank account number is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Please fill in all required fields");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
    setHasUnsavedChanges(false);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Employee added successfully!", {
        description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
      });
      setIsSubmitting(false);
      setHasUnsavedChanges(false);
      onBack();
    }, 2000);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (
        window.confirm("You have unsaved changes. Are you sure you want to cancel?")
      ) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const renderProfilePhotoUpload = () => {
    const handlePhotoChange = (file: File | null) => {
      updateField("profilePhoto", file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setProfilePreview(null);
      }
    };

    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-accent border-4 border-border flex items-center justify-center">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 w-full sm:w-auto">
          <FileUpload
            label="Employee Profile Photo"
            accept="image/*"
            onChange={handlePhotoChange}
            value={formData.profilePhoto}
            helperText="Upload a professional photo. JPG or PNG, max 5MB"
          />
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Profile & Identity */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Profile & Identity</h3>
        
        {renderProfilePhotoUpload()}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="space-y-2">
            <Label>First Name <span className="text-destructive">*</span></Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={cn("h-9", errors.firstName && "border-destructive")}
              placeholder="Enter first name"
            />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label>Last Name <span className="text-destructive">*</span></Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={cn("h-9", errors.lastName && "border-destructive")}
              placeholder="Enter last name"
            />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label>Father's Name <span className="text-destructive">*</span></Label>
            <Input
              name="fatherName"
              value={formData.fatherName}
              onChange={(e) => updateField("fatherName", e.target.value)}
              className={cn("h-9", errors.fatherName && "border-destructive")}
              placeholder="Enter father's name"
            />
            {errors.fatherName && <p className="text-xs text-destructive">{errors.fatherName}</p>}
          </div>

          <div className="space-y-2">
            <Label>Date of Birth <span className="text-destructive">*</span></Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              className={cn("h-9", errors.dateOfBirth && "border-destructive")}
            />
            {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gender <span className="text-destructive">*</span></Label>
            <Select
              value={formData.gender}
              onValueChange={(val) => updateField("gender", val)}
            >
              <SelectTrigger className={cn("h-9", errors.gender && "border-destructive")}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <Label>Nationality <span className="text-destructive">*</span></Label>
            <Input
              name="nationality"
              value={formData.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              className={cn("h-9", errors.nationality && "border-destructive")}
              placeholder="e.g., Azerbaijani"
            />
            {errors.nationality && <p className="text-xs text-destructive">{errors.nationality}</p>}
          </div>

          <div className="space-y-2">
            <Label>Marital Status <span className="text-destructive">*</span></Label>
            <Select
              value={formData.maritalStatus}
              onValueChange={(val) => updateField("maritalStatus", val)}
            >
              <SelectTrigger className={cn("h-9", errors.maritalStatus && "border-destructive")}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
            {errors.maritalStatus && <p className="text-xs text-destructive">{errors.maritalStatus}</p>}
          </div>
        </div>
      </div>

      {/* Identification Details */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Identification Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>ID Card Serial Number</Label>
            <Input
              name="idCardSerial"
              value={formData.idCardSerial}
              onChange={(e) => updateField("idCardSerial", e.target.value)}
              className="h-9"
              placeholder="e.g., AZE"
            />
          </div>

          <div className="space-y-2">
            <Label>ID Card Number <span className="text-destructive">*</span></Label>
            <Input
              name="idCardNumber"
              value={formData.idCardNumber}
              onChange={(e) => updateField("idCardNumber", e.target.value)}
              className={cn("h-9", errors.idCardNumber && "border-destructive")}
              placeholder="Enter ID card number"
            />
            {errors.idCardNumber && <p className="text-xs text-destructive">{errors.idCardNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              PIN / FIN Code <span className="text-destructive">*</span>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-popover border border-border rounded-lg shadow-lg text-xs z-10 pointer-events-none">
                  National identification number (FIN code in Azerbaijan)
                </div>
              </div>
            </Label>
            <Input
              name="pin"
              value={formData.pin}
              onChange={(e) => updateField("pin", e.target.value)}
              className={cn("h-9", errors.pin && "border-destructive")}
              placeholder="Enter PIN/FIN code"
            />
            {errors.pin && <p className="text-xs text-destructive">{errors.pin}</p>}
          </div>

          <div className="space-y-2">
            <Label>ID Issue Date</Label>
            <Input
              type="date"
              name="idIssueDate"
              value={formData.idIssueDate}
              onChange={(e) => updateField("idIssueDate", e.target.value)}
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label>ID Expiry Date</Label>
            <Input
              type="date"
              name="idExpiryDate"
              value={formData.idExpiryDate}
              onChange={(e) => updateField("idExpiryDate", e.target.value)}
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label>Issuing Authority</Label>
            <Input
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={(e) => updateField("issuingAuthority", e.target.value)}
              className="h-9"
              placeholder="e.g., MIA"
            />
          </div>
        </div>
      </div>

      {/* Education Information */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Education Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Highest Education Level <span className="text-destructive">*</span></Label>
            <Select
              value={formData.educationLevel}
              onValueChange={(val) => updateField("educationLevel", val)}
            >
              <SelectTrigger className={cn("h-9", errors.educationLevel && "border-destructive")}>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Associate Degree">Associate Degree</SelectItem>
                <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                <SelectItem value="Doctorate (PhD)">Doctorate (PhD)</SelectItem>
              </SelectContent>
            </Select>
            {errors.educationLevel && <p className="text-xs text-destructive">{errors.educationLevel}</p>}
          </div>

          <div className="space-y-2">
            <Label>University / College Name</Label>
            <Input
              name="universityName"
              value={formData.universityName}
              onChange={(e) => updateField("universityName", e.target.value)}
              className="h-9"
              placeholder="Enter university name"
            />
          </div>

          <div className="space-y-2">
            <Label>Faculty / Major</Label>
            <Input
              name="faculty"
              value={formData.faculty}
              onChange={(e) => updateField("faculty", e.target.value)}
              className="h-9"
              placeholder="e.g., Computer Science"
            />
          </div>

          <div className="space-y-2">
            <Label>Degree Type</Label>
            <Select
              value={formData.degreeType}
              onValueChange={(val) => updateField("degreeType", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select degree type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor">Bachelor</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Graduation Year</Label>
            <Input
              name="graduationYear"
              value={formData.graduationYear}
              onChange={(e) => updateField("graduationYear", e.target.value)}
              className="h-9"
              placeholder="e.g., 2020"
            />
          </div>

          <div className="space-y-2">
            <Label>GPA (optional)</Label>
            <Input
              name="gpa"
              value={formData.gpa}
              onChange={(e) => updateField("gpa", e.target.value)}
              className="h-9"
              placeholder="e.g., 3.8"
            />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Document Upload</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Front Side of ID Card"
            accept="image/*,.pdf"
            onChange={(file) => updateField("idCardFront", file)}
            value={formData.idCardFront}
            helperText="Upload a clear image or PDF"
          />

          <FileUpload
            label="Back Side of ID Card"
            accept="image/*,.pdf"
            onChange={(file) => updateField("idCardBack", file)}
            value={formData.idCardBack}
            helperText="Upload a clear image or PDF"
          />

          <FileUpload
            label="Diploma Upload"
            accept="image/*,.pdf"
            onChange={(file) => updateField("diploma", file)}
            value={formData.diploma}
            helperText="Upload diploma or certificate"
          />

          <FileUpload
            label="Additional Documents"
            accept="image/*,.pdf"
            onChange={(file) => updateField("additionalDocs", file)}
            value={formData.additionalDocs}
            helperText="Any other relevant documents"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Previous Employment History</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add previous work experience (optional)
          </p>
        </div>
        <Button
          type="button"
          onClick={addEmploymentHistory}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Previous Employment
        </Button>
      </div>

      {formData.employmentHistory.length === 0 ? (
        <div className="bg-accent/30 border border-border rounded-lg p-8 sm:p-12 text-center">
          <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h4 className="mb-2 font-medium">No Employment History Added</h4>
          <p className="text-muted-foreground mb-6 text-sm">
            Click the "Add Previous Employment" button to add work experience
          </p>
          <Button
            type="button"
            onClick={addEmploymentHistory}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Employment
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.employmentHistory.map((history, index) => {
            const isExpanded = expandedHistory.includes(history.id);
            return (
              <div
                key={history.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => toggleHistoryExpanded(history.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-medium text-primary text-sm sm:text-base">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">
                        {history.companyName || `Employment #${index + 1}`}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {history.position || "Position not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEmploymentHistory(history.id);
                      }}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-border mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                          value={history.companyName}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "companyName", e.target.value)
                          }
                          className="h-9"
                          placeholder="Enter company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Input
                          value={history.industry}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "industry", e.target.value)
                          }
                          className="h-9"
                          placeholder="e.g., Technology"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Position / Title</Label>
                        <Input
                          value={history.position}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "position", e.target.value)
                          }
                          className="h-9"
                          placeholder="Enter position"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Input
                          value={history.department}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "department", e.target.value)
                          }
                          className="h-9"
                          placeholder="Enter department"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Employment Type</Label>
                        <Select
                          value={history.employmentType}
                          onValueChange={(val) =>
                            updateEmploymentHistory(history.id, "employmentType", val)
                          }
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={history.startDate}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "startDate", e.target.value)
                          }
                          className="h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={history.endDate}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "endDate", e.target.value)
                          }
                          className="h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Last Salary</Label>
                        <Input
                          value={history.lastSalary}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "lastSalary", e.target.value)
                          }
                          className="h-9"
                          placeholder="e.g., 50000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Supervisor Name</Label>
                        <Input
                          value={history.supervisorName}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "supervisorName", e.target.value)
                          }
                          className="h-9"
                          placeholder="Enter supervisor name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Reference Contact</Label>
                        <Input
                          value={history.referenceContact}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "referenceContact", e.target.value)
                          }
                          className="h-9"
                          placeholder="Email or phone"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label>Reason for Leaving</Label>
                        <textarea
                          value={history.reasonForLeaving}
                          onChange={(e) =>
                            updateEmploymentHistory(history.id, "reasonForLeaving", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-input-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                          rows={3}
                          placeholder="Brief explanation"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Job Placement */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Job Placement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Department <span className="text-destructive">*</span></Label>
            <Select
              value={formData.department}
              onValueChange={(val) => updateField("department", val)}
            >
              <SelectTrigger className={cn("h-9", errors.department && "border-destructive")}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">Human Resources</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
          </div>

          <div className="space-y-2">
            <Label>Position Title <span className="text-destructive">*</span></Label>
            <Input
              name="positionTitle"
              value={formData.positionTitle}
              onChange={(e) => updateField("positionTitle", e.target.value)}
              className={cn("h-9", errors.positionTitle && "border-destructive")}
              placeholder="e.g., Senior Software Engineer"
            />
            {errors.positionTitle && <p className="text-xs text-destructive">{errors.positionTitle}</p>}
          </div>

          <div className="space-y-2">
            <Label>Employment Type <span className="text-destructive">*</span></Label>
            <Select
              value={formData.employmentType}
              onValueChange={(val) => updateField("employmentType", val)}
            >
              <SelectTrigger className={cn("h-9", errors.employmentType && "border-destructive")}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            {errors.employmentType && <p className="text-xs text-destructive">{errors.employmentType}</p>}
          </div>

          <div className="space-y-2">
            <Label>Work Location <span className="text-destructive">*</span></Label>
            <Input
              name="workLocation"
              value={formData.workLocation}
              onChange={(e) => updateField("workLocation", e.target.value)}
              className={cn("h-9", errors.workLocation && "border-destructive")}
              placeholder="e.g., Baku Office"
            />
            {errors.workLocation && <p className="text-xs text-destructive">{errors.workLocation}</p>}
          </div>

          <div className="space-y-2">
            <Label>Reporting Manager <span className="text-destructive">*</span></Label>
            <Input
              name="reportingManager"
              value={formData.reportingManager}
              onChange={(e) => updateField("reportingManager", e.target.value)}
              className={cn("h-9", errors.reportingManager && "border-destructive")}
              placeholder="Enter manager name"
            />
            {errors.reportingManager && <p className="text-xs text-destructive">{errors.reportingManager}</p>}
          </div>

          <div className="space-y-2">
            <Label>Work Schedule</Label>
            <Select
              value={formData.workSchedule}
              onValueChange={(val) => updateField("workSchedule", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Probation Period (months)</Label>
            <Input
              type="number"
              name="probationPeriod"
              value={formData.probationPeriod}
              onChange={(e) => updateField("probationPeriod", e.target.value)}
              className="h-9"
              placeholder="e.g., 3"
            />
          </div>
        </div>
      </div>

      {/* Compensation Details */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Compensation Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Base Salary <span className="text-destructive">*</span>
              <div className="group relative">
                <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-popover border border-border rounded-lg shadow-lg text-xs z-10 pointer-events-none">
                  Annual gross salary before taxes and deductions
                </div>
              </div>
            </Label>
            <Input
              type="number"
              name="baseSalary"
              value={formData.baseSalary}
              onChange={(e) => updateField("baseSalary", e.target.value)}
              className={cn("h-9", errors.baseSalary && "border-destructive")}
              placeholder="e.g., 75000"
            />
            {errors.baseSalary && <p className="text-xs text-destructive">{errors.baseSalary}</p>}
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(val) => updateField("currency", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="AZN">AZN</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Frequency</Label>
            <Select
              value={formData.paymentFrequency}
              onValueChange={(val) => updateField("paymentFrequency", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Biweekly">Biweekly</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Bonus Structure</Label>
            <Input
              name="bonusStructure"
              value={formData.bonusStructure}
              onChange={(e) => updateField("bonusStructure", e.target.value)}
              className="h-9"
              placeholder="e.g., 10% annual bonus"
            />
          </div>

          <div className="space-y-2">
            <Label>Allowances</Label>
            <Input
              name="allowances"
              value={formData.allowances}
              onChange={(e) => updateField("allowances", e.target.value)}
              className="h-9"
              placeholder="e.g., Transport, Food"
            />
          </div>

          <div className="space-y-2">
            <Label>Tax Category</Label>
            <Input
              name="taxCategory"
              value={formData.taxCategory}
              onChange={(e) => updateField("taxCategory", e.target.value)}
              className="h-9"
              placeholder="e.g., Standard"
            />
          </div>

          <div className="space-y-2">
            <Label>Bank Account Number <span className="text-destructive">*</span></Label>
            <Input
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={(e) => updateField("bankAccountNumber", e.target.value)}
              className={cn("h-9", errors.bankAccountNumber && "border-destructive")}
              placeholder="Enter account number"
            />
            {errors.bankAccountNumber && <p className="text-xs text-destructive">{errors.bankAccountNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label>IBAN</Label>
            <Input
              name="iban"
              value={formData.iban}
              onChange={(e) => updateField("iban", e.target.value)}
              className="h-9"
              placeholder="Enter IBAN"
            />
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label>Bank Name</Label>
            <Input
              name="bankName"
              value={formData.bankName}
              onChange={(e) => updateField("bankName", e.target.value)}
              className="h-9"
              placeholder="Enter bank name"
            />
          </div>
        </div>
      </div>

      {/* System Role Assignment */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">System Role Assignment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>System Role</Label>
            <Select
              value={formData.systemRole}
              onValueChange={(val) => updateField("systemRole", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Team Lead">Team Lead</SelectItem>
                <SelectItem value="Department Manager">Department Manager</SelectItem>
                <SelectItem value="HR Manager">HR Manager</SelectItem>
                <SelectItem value="HR Admin">HR Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Access Level</Label>
            <Select
              value={formData.accessLevel}
              onValueChange={(val) => updateField("accessLevel", val)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Extended">Extended</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.generateCredentials}
                onChange={(e) =>
                  updateField("generateCredentials", e.target.checked)
                }
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <div>
                <div className="font-medium text-sm">Generate Login Credentials</div>
                <p className="text-xs text-muted-foreground">
                  Automatically create username and password for system access
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendWelcomeEmail}
                onChange={(e) => updateField("sendWelcomeEmail", e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <div>
                <div className="font-medium text-sm">Send Welcome Email</div>
                <p className="text-xs text-muted-foreground">
                  Send onboarding email with login credentials and important information
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="mb-4 text-lg font-semibold">Additional Notes</h3>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateField("additionalNotes", e.target.value)}
          className="w-full px-3 py-2 bg-input-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          rows={4}
          placeholder="Any other important information about this employee..."
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Employee</h1>
            <p className="text-muted-foreground">
              Create a new employee profile in the system
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Complete & Save
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-2 cursor-pointer ${
                   index > currentStep ? "opacity-50" : ""
                }`}
                onClick={() => {
                   if (index < currentStep) setCurrentStep(index);
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                      : isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center hidden sm:block">
                  <div
                    className={`font-medium text-sm ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="animate-fade-in">
        {currentStep === 0 && renderStep1()}
        {currentStep === 1 && renderStep2()}
        {currentStep === 2 && renderStep3()}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={currentStep === 0 ? "invisible" : ""}
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Previous Step
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
           {hasUnsavedChanges && (
              <span className="flex items-center gap-1.5 text-orange-500">
                 <AlertCircle className="w-4 h-4" />
                 Unsaved changes
              </span>
           )}
        </div>

        {currentStep < steps.length - 1 && (
          <Button onClick={handleNext}>
            Next Step
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
