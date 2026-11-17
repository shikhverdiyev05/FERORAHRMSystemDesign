import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { employees } from "../../data/mockData";
import { AddEmployeeModal } from "../employee/AddEmployeeModal";
import { EditEmployeeDrawer } from "../employee/EditEmployeeDrawer";
import { ViewEmployeeProfile } from "../employee/ViewEmployeeProfile";
import { ConfirmationModal } from "../design-system/ConfirmationModal";
import { toast } from "sonner";

interface EmployeesEnhancedProps {
  onNavigate?: (page: string) => void;
}

export function EmployeesEnhanced({ onNavigate }: EmployeesEnhancedProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);

  // Modals & Drawers
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const filteredEmployees = employees
    .filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || emp.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "all" || emp.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const departments = [...new Set(employees.map((e) => e.department))];

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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    }
  };

  const handleSelectEmployee = (id: number) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleViewProfile = (employee: any) => {
    setSelectedEmployee(employee);
    setShowViewProfile(true);
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEditDrawer(true);
  };

  const handleDelete = (employee: any) => {
    setSelectedEmployee(employee);
    setDeleteConfirmation("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    toast.success("Employee deleted", {
      description: `${selectedEmployee?.name} has been removed from the system.`,
    });
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const confirmBulkDelete = () => {
    toast.success("Employees deleted", {
      description: `${selectedEmployees.length} employees have been removed.`,
    });
    setSelectedEmployees([]);
    setShowBulkDeleteModal(false);
  };

  const handleExport = () => {
    toast.success("Export started", {
      description: "Employee data is being exported to CSV.",
    });
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage and view all employee information
          </p>
        </div>
        <Button 
          className="gap-2" 
          onClick={() => onNavigate ? onNavigate("add-employee") : setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Probation">Probation</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedEmployees.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between animate-slide-in">
          <div className="flex items-center gap-3">
            <Checkbox checked={true} onCheckedChange={handleSelectAll} />
            <span className="font-medium">
              {selectedEmployees.length} employee{selectedEmployees.length > 1 ? "s" : ""}{" "}
              selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedEmployees([])}>
              Clear Selection
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedEmployees.length === filteredEmployees.length &&
                      filteredEmployees.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleSort("name")}
                >
                  Employee <SortIcon field="name" />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleSort("employeeId")}
                >
                  Employee ID <SortIcon field="employeeId" />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleSort("department")}
                >
                  Department <SortIcon field="department" />
                </TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon field="status" />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handleSort("joinDate")}
                >
                  Join Date <SortIcon field="joinDate" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="w-4 h-4" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 text-muted-foreground opacity-20" />
                      <p className="text-muted-foreground font-medium">No employees found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className={`hover:bg-accent/50 transition-colors ${
                      selectedEmployees.includes(employee.id) ? "bg-accent/30" : ""
                    }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => handleSelectEmployee(employee.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {employee.employeeId}
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.manager}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(employee.status)}
                        variant="secondary"
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(employee)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(employee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(employee)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <p>
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Modals & Drawers */}
      <AddEmployeeModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSuccess={() => {}}
      />

      <EditEmployeeDrawer
        open={showEditDrawer}
        onOpenChange={setShowEditDrawer}
        employee={selectedEmployee}
        onSuccess={() => {}}
      />

      <ViewEmployeeProfile
        open={showViewProfile}
        onOpenChange={setShowViewProfile}
        employee={selectedEmployee}
        onEdit={() => {
          setShowViewProfile(false);
          setShowEditDrawer(true);
        }}
      />

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Delete Employee"
        description={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
        requireConfirmation={true}
        confirmationText={selectedEmployee?.name}
        confirmationValue={deleteConfirmation}
        onConfirmationChange={setDeleteConfirmation}
        onConfirm={confirmDelete}
      />

      <ConfirmationModal
        open={showBulkDeleteModal}
        onOpenChange={setShowBulkDeleteModal}
        title="Delete Multiple Employees"
        description={`Are you sure you want to delete ${selectedEmployees.length} employees? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete All"
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
}
