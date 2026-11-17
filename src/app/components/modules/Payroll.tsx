import { useState } from "react";
import { DollarSign, Download, Eye, Send, User, Calendar, Briefcase, CreditCard, FileText, TrendingUp, CheckCircle2, AlertCircle, MoreVertical, Filter, Mail, Printer, Settings, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { employees } from "../../data/mockData";

export function Payroll() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState<any>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("employees");
  
  // Process Payroll Modal States
  const [showProcessPayrollModal, setShowProcessPayrollModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBatchApprovalModal, setShowBatchApprovalModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTaxConfigModal, setShowTaxConfigModal] = useState(false);
  
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalPayroll / employees.length;

  const handleViewEmployee = (employee: any) => {
    const bonus = Math.floor(Math.random() * 5000);
    const deductions = Math.floor(employee.salary * 0.15);
    const netSalary = employee.salary + bonus - deductions;
    
    setSelectedEmployee({
      ...employee,
      bonus,
      deductions,
      netSalary,
    });
    setViewModalOpen(true);
  };

  const handleViewHistory = (month: string) => {
    setSelectedPaymentHistory({
      month,
      totalAmount: totalPayroll,
      employeesProcessed: employees.length,
      processedDate: new Date().toLocaleDateString(),
      status: "Completed",
      employees: employees.map(emp => ({
        ...emp,
        bonus: Math.floor(Math.random() * 5000),
        deductions: Math.floor(emp.salary * 0.15),
        netSalary: emp.salary + Math.floor(Math.random() * 5000) - Math.floor(emp.salary * 0.15),
      })),
    });
    setHistoryModalOpen(true);
  };

  const toggleEmployeeSelection = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const selectAllEmployees = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.id));
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee compensation and payroll</p>
        </div>
        
        {/* Header Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                Process Payroll
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Payroll Processing</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowProcessPayrollModal(true)}
              >
                <Send className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Process Current Month</span>
                  <span className="text-xs text-muted-foreground">Process February 2024 payroll</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowScheduleModal(true)}
              >
                <Calendar className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Schedule Processing</span>
                  <span className="text-xs text-muted-foreground">Set auto-process date</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowBatchApprovalModal(true)}
              >
                <CheckCircle2 className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Batch Approval</span>
                  <span className="text-xs text-muted-foreground">Approve multiple at once</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowNotificationModal(true)}
              >
                <Mail className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Send Notifications</span>
                  <span className="text-xs text-muted-foreground">Email payslips to employees</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowPrintModal(true)}
              >
                <Printer className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Print All Payslips</span>
                  <span className="text-xs text-muted-foreground">Generate PDF batch</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Payroll Settings</span>
                  <span className="text-xs text-muted-foreground">Configure processing rules</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2"
                onClick={() => setShowTaxConfigModal(true)}
              >
                <FileText className="w-4 h-4" />
                <div className="flex flex-col">
                  <span>Tax Configuration</span>
                  <span className="text-xs text-muted-foreground">Update tax rates & deductions</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Monthly Payroll</p>
                <h3 className="text-3xl font-semibold">${(totalPayroll / 1000).toFixed(0)}K</h3>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Salary</p>
                <h3 className="text-3xl font-semibold">${(avgSalary / 1000).toFixed(0)}K</h3>
              </div>
              <DollarSign className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Employees Paid</p>
                <h3 className="text-3xl font-semibold">{employees.length}</h3>
              </div>
              <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1" variant="secondary">
                ✓
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <TabsList className="inline-flex w-auto min-w-full sm:min-w-0 h-auto">
            <TabsTrigger value="employees" className="whitespace-nowrap flex-shrink-0 px-4 sm:px-6">
              <span className="hidden sm:inline">Employee Payroll</span>
              <span className="sm:hidden">Employees</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="whitespace-nowrap flex-shrink-0 px-4 sm:px-6">
              <span className="hidden sm:inline">Payment History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Employee Payroll Tab */}
        <TabsContent value="employees" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>February 2024 Payroll</CardTitle>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employees.map((employee) => {
                  const bonus = Math.floor(Math.random() * 5000);
                  const deductions = Math.floor(employee.salary * 0.15);
                  const netSalary = employee.salary + bonus - deductions;

                  return (
                    <div
                      key={employee.id}
                      className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm flex-1 lg:max-w-2xl">
                        <div>
                          <p className="text-muted-foreground">Base Salary</p>
                          <p className="font-semibold">${employee.salary.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Bonus</p>
                          <p className="font-semibold text-green-600">+${bonus.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deductions</p>
                          <p className="font-semibold text-red-600">-${deductions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Net Pay</p>
                          <p className="font-semibold text-blue-600">${netSalary.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewEmployee(employee)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Slip
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Payment History</h3>
            <div className="space-y-3">
              {["January 2024", "December 2023", "November 2023"].map((month, index) => (
                <div key={month} className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{month}</p>
                      <p className="text-sm text-muted-foreground">{employees.length} employees processed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${(totalPayroll / 1000).toFixed(0)}K</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewHistory(month)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Employee Payroll Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payroll Details</DialogTitle>
            <DialogDescription>
              Detailed payroll information for February 2024
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-6">
              {/* Employee Header */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-accent"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                </div>
                <Badge className="bg-green-100 text-green-800" variant="secondary">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Processed
                </Badge>
              </div>

              {/* Salary Breakdown */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Salary Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Base Salary</span>
                    </div>
                    <span className="font-semibold">${selectedEmployee.salary.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Performance Bonus</span>
                    </div>
                    <span className="font-semibold text-green-600">+${selectedEmployee.bonus.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Deductions (Tax & Insurance)</span>
                    </div>
                    <span className="font-semibold text-red-600">-${selectedEmployee.deductions.toLocaleString()}</span>
                  </div>

                  <Separator />
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Net Salary</span>
                    <span className="text-2xl font-bold text-blue-600">${selectedEmployee.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Payment Date</p>
                    <p className="font-medium">February 28, 2024</p>
                  </div>
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                    <p className="font-medium">Bank Transfer</p>
                  </div>
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Bank Account</p>
                    <p className="font-medium">****1234</p>
                  </div>
                  <div className="p-3 bg-accent rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <p className="font-medium text-green-600">Completed</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download Payslip
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Send className="w-4 h-4" />
                  Send via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Payment History Modal */}
      <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment History Details</DialogTitle>
            <DialogDescription>
              Detailed payment history information
            </DialogDescription>
          </DialogHeader>
          
          {selectedPaymentHistory && (
            <div className="space-y-6">
              {/* Payment Header */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedPaymentHistory.month}</h3>
                  <p className="text-muted-foreground">{selectedPaymentHistory.employeesProcessed} employees processed</p>
                  <p className="text-sm text-muted-foreground">Processed on {selectedPaymentHistory.processedDate}</p>
                </div>
                <Badge className="bg-green-100 text-green-800" variant="secondary">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {selectedPaymentHistory.status}
                </Badge>
              </div>

              {/* Total Amount */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Total Amount
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Total Payroll</span>
                    </div>
                    <span className="font-semibold">${selectedPaymentHistory.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Employee List
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedPaymentHistory.employees.map((employee: any) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${employee.salary.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Mail className="w-4 h-4" />
                  Send via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Process Payroll Modal */}
      <Dialog open={showProcessPayrollModal} onOpenChange={setShowProcessPayrollModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Process Monthly Payroll</DialogTitle>
            <DialogDescription>
              Select employees to process payroll for February 2024
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Selected Employees</p>
                <p className="text-2xl font-semibold">{selectedEmployees.length} / {employees.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-semibold text-green-600">
                  ${((selectedEmployees.length * avgSalary) / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Processing Date</p>
                <p className="text-2xl font-semibold">Feb 28, 2024</p>
              </div>
            </div>

            {/* Select All Button */}
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Employee Selection</h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={selectAllEmployees}
              >
                {selectedEmployees.length === employees.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            {/* Employee List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {employees.map((employee) => {
                const isSelected = selectedEmployees.includes(employee.id);
                
                return (
                  <div
                    key={employee.id}
                    onClick={() => toggleEmployeeSelection(employee.id)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected ? "bg-primary border-primary" : "border-muted-foreground"
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${employee.salary.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{employee.department}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button 
                className="flex-1 gap-2"
                disabled={selectedEmployees.length === 0}
                onClick={() => {
                  setShowProcessPayrollModal(false);
                  setSelectedEmployees([]);
                }}
              >
                <Send className="w-4 h-4" />
                Process Payroll ({selectedEmployees.length} employees)
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setShowProcessPayrollModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Processing Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Payroll Processing</DialogTitle>
            <DialogDescription>
              Set automatic payroll processing schedule
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Processing Date</Label>
              <Input type="date" placeholder="Select processing date" />
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>

            <div className="space-y-2">
              <Label>Notification</Label>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notify" className="rounded" />
                <label htmlFor="notify" className="text-sm">Send notification before processing</label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={() => setShowScheduleModal(false)}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Batch Approval Modal */}
      <Dialog open={showBatchApprovalModal} onOpenChange={setShowBatchApprovalModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Batch Approval</DialogTitle>
            <DialogDescription>
              Review and approve multiple payroll entries at once
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-yellow-800 mb-1">Pending Approvals</p>
              <p className="text-2xl font-semibold text-yellow-900">{employees.length} entries</p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {employees.slice(0, 5).map((employee) => (
                <label key={employee.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.position}</p>
                  </div>
                  <span className="font-semibold text-sm">${employee.salary.toLocaleString()}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={() => setShowBatchApprovalModal(false)}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve Selected
              </Button>
              <Button variant="outline" onClick={() => setShowBatchApprovalModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Notifications Modal */}
      <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Payslip Notifications</DialogTitle>
            <DialogDescription>
              Email payslips to selected employees
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email Subject</Label>
              <Input placeholder="Your February 2024 Payslip" defaultValue="Your February 2024 Payslip" />
            </div>

            <div className="space-y-2">
              <Label>Email Message</Label>
              <Textarea 
                placeholder="Add a custom message..." 
                defaultValue="Dear Employee,&#10;&#10;Please find attached your payslip for February 2024.&#10;&#10;Best regards,&#10;HR Team"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="p-3 border rounded-lg">
                <p className="text-sm">All employees ({employees.length})</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={() => setShowNotificationModal(false)}>
                <Mail className="w-4 h-4 mr-2" />
                Send Emails
              </Button>
              <Button variant="outline" onClick={() => setShowNotificationModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Print Payslips Modal */}
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Print All Payslips</DialogTitle>
            <DialogDescription>
              Generate PDF batch for all employee payslips
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-accent rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Payslips</p>
              <p className="text-2xl font-semibold">{employees.length} documents</p>
            </div>

            <div className="space-y-2">
              <Label>Format Options</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="format" value="single" defaultChecked />
                  <span className="text-sm">Single PDF with all payslips</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="format" value="separate" />
                  <span className="text-sm">Separate PDF for each employee</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Include</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Company logo</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Detailed breakdown</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Year-to-date summary</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={() => setShowPrintModal(false)}>
                <Printer className="w-4 h-4 mr-2" />
                Generate PDFs
              </Button>
              <Button variant="outline" onClick={() => setShowPrintModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payroll Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payroll Settings</DialogTitle>
            <DialogDescription>
              Configure payroll processing rules and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Processing Rules</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Auto-process on schedule</p>
                    <p className="text-xs text-muted-foreground">Automatically process payroll on set date</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Require approval</p>
                    <p className="text-xs text-muted-foreground">Manager approval before processing</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Send notifications</p>
                    <p className="text-xs text-muted-foreground">Email employees after processing</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Payment Settings</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Default Payment Method</Label>
                  <Select defaultValue="bank">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1" onClick={() => setShowSettingsModal(false)}>
                <Settings className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
              <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tax Configuration Modal */}
      <Dialog open={showTaxConfigModal} onOpenChange={setShowTaxConfigModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tax Configuration</DialogTitle>
            <DialogDescription>
              Configure tax rates and deduction rules
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Tax Rates</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Income Tax (%)</Label>
                  <Input type="number" placeholder="15" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label>Social Security (%)</Label>
                  <Input type="number" placeholder="6.2" defaultValue="6.2" />
                </div>
                <div className="space-y-2">
                  <Label>Medicare (%)</Label>
                  <Input type="number" placeholder="1.45" defaultValue="1.45" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Deductions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Health Insurance</p>
                    <p className="text-xs text-muted-foreground">Employee contribution</p>
                  </div>
                  <Input type="number" className="w-24" placeholder="250" defaultValue="250" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">401(k) Contribution</p>
                    <p className="text-xs text-muted-foreground">Retirement savings</p>
                  </div>
                  <Input type="number" className="w-24" placeholder="5" defaultValue="5" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1" onClick={() => setShowTaxConfigModal(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="outline" onClick={() => setShowTaxConfigModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}