import { Plus, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { leaveRequests, employees } from "../../data/mockData";

export function LeaveManagement() {
  const pendingCount = leaveRequests.filter((r) => r.status === "Pending").length;
  const approvedCount = leaveRequests.filter((r) => r.status === "Approved").length;
  const rejectedCount = leaveRequests.filter((r) => r.status === "Rejected").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">Pending</Badge>;
      case "Approved":
        return <Badge className="bg-green-100 text-green-800" variant="secondary">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800" variant="secondary">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Leave Management</h1>
          <p className="text-muted-foreground">Manage employee leave requests and balances</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Leave Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <h3 className="text-3xl font-semibold text-yellow-600">{pendingCount}</h3>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <h3 className="text-3xl font-semibold text-green-600">{approvedCount}</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                <h3 className="text-3xl font-semibold text-red-600">{rejectedCount}</h3>
              </div>
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="calendar">Team Calendar</TabsTrigger>
        </TabsList>

        {/* Leave Requests Tab */}
        <TabsContent value="requests" className="space-y-4 mt-6">
          {leaveRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{request.employeeName}</h3>
                        <p className="text-sm text-muted-foreground">{request.leaveType}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>From: {new Date(request.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>To: {new Date(request.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="bg-accent/50 p-3 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span> {request.days} {request.days === 1 ? 'day' : 'days'}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>
                    </div>
                  </div>
                  {request.status === "Pending" && (
                    <div className="flex sm:flex-col gap-2">
                      <Button size="sm" className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1 sm:flex-none">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Leave Balance Tab */}
        <TabsContent value="balance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employees.slice(0, 8).map((employee) => {
                  const annual = Math.floor(Math.random() * 15) + 10;
                  const sick = Math.floor(Math.random() * 8) + 5;
                  const personal = Math.floor(Math.random() * 5) + 2;

                  return (
                    <div
                      key={employee.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-accent/50 rounded-lg gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-blue-600">{annual}</p>
                          <p className="text-muted-foreground">Annual</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-green-600">{sick}</p>
                          <p className="text-muted-foreground">Sick</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-purple-600">{personal}</p>
                          <p className="text-muted-foreground">Personal</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p>Team leave calendar view</p>
                <p className="text-sm mt-2">View team members on leave for the month</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
