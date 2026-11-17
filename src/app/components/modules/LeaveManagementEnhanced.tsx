import { useState } from "react";
import { Plus, Search, Filter, CheckCircle, XCircle, Clock, Calendar, User, FileText, Save, FileDown, Copy, MoreVertical, Upload, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { leaveRequests } from "../../data/mockData";
import { LeaveApprovalModal } from "../leave/LeaveApprovalModal";
import { Card } from "../ui/card";

export function LeaveManagementEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // New Leave Request Modal States
  const [showNewLeaveModal, setShowNewLeaveModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBulkRequestModal, setShowBulkRequestModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  
  // New Leave Request Form State
  const [newLeaveForm, setNewLeaveForm] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch = req.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || req.leaveType === typeFilter;
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const pendingRequests = filteredRequests.filter((r) => r.status === "Pending");
  const approvedRequests = filteredRequests.filter((r) => r.status === "Approved");
  const rejectedRequests = filteredRequests.filter((r) => r.status === "Rejected");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800" variant="secondary">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800" variant="secondary">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "Annual Leave":
        return "bg-blue-100 text-blue-800";
      case "Sick Leave":
        return "bg-red-100 text-red-800";
      case "Personal Leave":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReview = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleApprove = () => {
    console.log("Approved:", selectedRequest);
  };

  const handleReject = () => {
    console.log("Rejected:", selectedRequest);
  };

  const handleNewLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Leave Request:", newLeaveForm);
    setNewLeaveForm({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setShowNewLeaveModal(false);
  };

  const renderTable = (requests: any[]) => (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-12 h-12 text-muted-foreground opacity-20" />
                    <p className="text-muted-foreground font-medium">
                      No leave requests found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id} className="hover:bg-accent/50">
                  <TableCell className="font-medium">
                    {request.employeeName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getLeaveTypeColor(request.leaveType)}
                      variant="secondary"
                    >
                      {request.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(request.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{request.days} days</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {request.reason}
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "Pending" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReview(request)}
                      >
                        Review
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReview(request)}
                      >
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Leave Management</h1>
          <p className="text-muted-foreground">
            Review and manage employee leave requests
          </p>
        </div>
        
        {/* Header Actions */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Leave Request
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Create Leave Request</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowNewLeaveModal(true)}
              >
                <FileText className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>New Request Form</span>
                  <span className="text-xs text-muted-foreground">Fill out complete form</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowTemplateModal(true)}
              >
                <Copy className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Use Template</span>
                  <span className="text-xs text-muted-foreground">Quick request from template</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowBulkRequestModal(true)}
              >
                <Users className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Bulk Request</span>
                  <span className="text-xs text-muted-foreground">Multiple employees at once</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Import from CSV</span>
                  <span className="text-xs text-muted-foreground">Upload leave data</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowDraftsModal(true)}
              >
                <Save className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>View Drafts</span>
                  <span className="text-xs text-muted-foreground">Continue saved requests</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold mt-1">
                {pendingRequests.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-semibold mt-1">
                {approvedRequests.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-semibold mt-1">
                {rejectedRequests.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="text-2xl font-semibold mt-1">
                {filteredRequests.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Leave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Annual Leave">Annual Leave</SelectItem>
            <SelectItem value="Sick Leave">Sick Leave</SelectItem>
            <SelectItem value="Personal Leave">Personal Leave</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <TabsList className="inline-flex w-auto min-w-full sm:min-w-0 h-auto">
            <TabsTrigger value="all" className="whitespace-nowrap flex-shrink-0 px-4">
              <span className="hidden sm:inline">All Requests ({filteredRequests.length})</span>
              <span className="sm:hidden">All ({filteredRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="whitespace-nowrap flex-shrink-0 px-4">
              <span className="hidden sm:inline">Pending ({pendingRequests.length})</span>
              <span className="sm:hidden">Pending ({pendingRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="whitespace-nowrap flex-shrink-0 px-4">
              <span className="hidden sm:inline">Approved ({approvedRequests.length})</span>
              <span className="sm:hidden">Approved ({approvedRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="whitespace-nowrap flex-shrink-0 px-4">
              <span className="hidden sm:inline">Rejected ({rejectedRequests.length})</span>
              <span className="sm:hidden">Rejected ({rejectedRequests.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          {renderTable(filteredRequests)}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {renderTable(pendingRequests)}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          {renderTable(approvedRequests)}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          {renderTable(rejectedRequests)}
        </TabsContent>
      </Tabs>

      {/* New Leave Request Modal */}
      <Dialog open={showNewLeaveModal} onOpenChange={setShowNewLeaveModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Leave Request</DialogTitle>
            <DialogDescription>
              Fill out the form to submit a new leave request for approval
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNewLeaveSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Name */}
              <div className="space-y-2">
                <Label htmlFor="employeeName">
                  Employee Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="employeeName"
                    placeholder="Enter employee name"
                    value={newLeaveForm.employeeName}
                    onChange={(e) =>
                      setNewLeaveForm({ ...newLeaveForm, employeeName: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Leave Type */}
              <div className="space-y-2">
                <Label htmlFor="leaveType">
                  Leave Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={newLeaveForm.leaveType}
                  onValueChange={(value) =>
                    setNewLeaveForm({ ...newLeaveForm, leaveType: value })
                  }
                  required
                >
                  <SelectTrigger id="leaveType">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                    <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                    <SelectItem value="Paternity Leave">Paternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={newLeaveForm.startDate}
                    onChange={(e) =>
                      setNewLeaveForm({ ...newLeaveForm, startDate: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={newLeaveForm.endDate}
                    onChange={(e) =>
                      setNewLeaveForm({ ...newLeaveForm, endDate: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">
                Reason <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="reason"
                  placeholder="Provide a reason for your leave request..."
                  value={newLeaveForm.reason}
                  onChange={(e) =>
                    setNewLeaveForm({ ...newLeaveForm, reason: e.target.value })
                  }
                  className="pl-10 min-h-[120px]"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewLeaveModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Use Template</DialogTitle>
            <DialogDescription>
              Select a template to quickly create a leave request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {["Annual Leave Template", "Sick Leave Template", "Emergency Leave Template"].map((template) => (
              <div
                key={template}
                className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => {
                  setShowTemplateModal(false);
                  setShowNewLeaveModal(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <Copy className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{template}</p>
                    <p className="text-sm text-muted-foreground">Pre-filled leave request template</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Request Modal */}
      <Dialog open={showBulkRequestModal} onOpenChange={setShowBulkRequestModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bulk Leave Request</DialogTitle>
            <DialogDescription>
              Create leave requests for multiple employees at once
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Employees</Label>
              <div className="border rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                {["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams"].map((name) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Leave Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Create Bulk Requests
              </Button>
              <Button variant="outline" onClick={() => setShowBulkRequestModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import CSV Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file containing leave request data
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-medium mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">CSV files only (MAX. 5MB)</p>
              <Button variant="outline" className="mt-4">
                Select File
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">CSV Format:</p>
              <div className="bg-accent p-3 rounded text-xs font-mono">
                employee_name,leave_type,start_date,end_date,reason
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
              <Button variant="outline" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Drafts Modal */}
      <Dialog open={showDraftsModal} onOpenChange={setShowDraftsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Saved Drafts</DialogTitle>
            <DialogDescription>
              Continue editing your saved leave request drafts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {leaveRequests.slice(0, 3).map((draft) => (
              <div
                key={draft.id}
                className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => {
                  setShowDraftsModal(false);
                  setShowNewLeaveModal(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{draft.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {draft.leaveType} • {new Date(draft.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">Draft</Badge>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <LeaveApprovalModal
        open={showApprovalModal}
        onOpenChange={setShowApprovalModal}
        leaveRequest={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}