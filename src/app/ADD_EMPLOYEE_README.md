# FERORA HRM - Add Employee Page

## Overview
A comprehensive, enterprise-level multi-step form for adding new employees to the FERORA HRM system.

## Features

### Step 1: Personal Information
- **Profile & Identity**
  - Profile photo upload with preview
  - Full name (First, Last, Father's name)
  - Date of birth, gender, nationality, marital status

- **Identification Details**
  - ID card serial number and number
  - Personal Identification Number (PIN/FIN)
  - ID issue and expiry dates
  - Issuing authority

- **Education Information**
  - Education level, university name
  - Faculty/major, degree type
  - Graduation year, GPA

- **Document Upload**
  - ID card (front and back)
  - Diploma/certificate
  - Additional documents
  - Drag-and-drop file upload with preview

### Step 2: Employment History
- Dynamic repeating sections
- Add/remove previous employment records
- Expandable/collapsible employment blocks
- Fields include:
  - Company details
  - Position and department
  - Employment dates
  - Salary and supervisor information
  - Reason for leaving

### Step 3: Job Assignment & Salary
- **Job Placement**
  - Department, position title
  - Employment type, work location
  - Reporting manager
  - Work schedule, probation period

- **Compensation Details**
  - Base salary with currency selection
  - Payment frequency
  - Bonus structure and allowances
  - Tax category
  - Bank account information

- **System Role Assignment**
  - System role and access level
  - Generate login credentials option
  - Send welcome email option

- **Additional Notes**
  - Free-form text area for extra information
  - Character counter (1000 character limit)

## Access Methods

### 1. From Employees Page
Navigate to Employees module → Click "Add Employee" button

### 2. Command Palette
Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) → Type "Add Employee"

### 3. Direct Navigation
In development, you can navigate directly by setting `currentPage` to "add-employee"

## User Experience Features

- ✅ **Progress Indicator**: Visual step progress at the top
- ✅ **Form Validation**: Real-time validation with error messages
- ✅ **Unsaved Changes Warning**: Warns before leaving with unsaved data
- ✅ **Save Draft**: Ability to save work in progress
- ✅ **Sticky Footer**: Always-visible navigation controls
- ✅ **Keyboard Shortcuts**: Full keyboard navigation support
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Professional UI**: Enterprise-grade design matching FERORA brand

## Form Navigation

- **Next/Previous**: Navigate between steps
- **Cancel**: Return to employees list (with confirmation if changes exist)
- **Save Draft**: Save current progress
- **Submit**: Final submission (only available on last step)

## Validation Rules

- Required fields marked with red asterisk (*)
- Step 1: All personal info and ID details required
- Step 2: Employment history is optional
- Step 3: Job placement and compensation details required
- Bank account number required for payroll
- Form prevents moving to next step until current step is valid

## Technical Details

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **File Uploads**: Drag-and-drop with file preview
- **State Management**: Local React state
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React

## Component Structure

```
/components/employee/
  ├── AddEmployeePage.tsx        # Main multi-step form component
  ├── FileUpload.tsx             # Reusable file upload component
  ├── AddEmployeeModal.tsx       # Original modal version (legacy)
  ├── EditEmployeeDrawer.tsx     # Edit functionality
  └── ViewEmployeeProfile.tsx    # View employee details
```

## Future Enhancements

- [ ] Auto-save draft functionality
- [ ] Resume from saved draft
- [ ] Photo cropping tool
- [ ] Document preview modal
- [ ] Email validation with company domain check
- [ ] Integration with document management system
- [ ] Automated onboarding workflow triggers
