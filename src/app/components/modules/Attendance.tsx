import { Calendar, Clock, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { attendanceData, employees } from "../../data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Attendance() {
  const todayAttendance = attendanceData[attendanceData.length - 1];
  const attendanceRate = ((todayAttendance.present / (todayAttendance.present + todayAttendance.absent)) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage employee attendance</p>
        </div>
        <Button className="gap-2">
          <Clock className="w-4 h-4" />
          Manual Entry
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Present Today</p>
                <h3 className="text-3xl font-semibold text-green-600">{todayAttendance.present}</h3>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Absent Today</p>
                <h3 className="text-3xl font-semibold text-red-600">{todayAttendance.absent}</h3>
              </div>
              <Users className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Late Arrivals</p>
                <h3 className="text-3xl font-semibold text-orange-600">{todayAttendance.late}</h3>
              </div>
              <Clock className="w-10 h-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                <h3 className="text-3xl font-semibold text-blue-600">{attendanceRate}%</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid key="attendance-grid" strokeDasharray="3 3" />
                  <XAxis key="attendance-xaxis" dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis key="attendance-yaxis" />
                  <Tooltip key="attendance-tooltip" />
                  <Legend key="attendance-legend" />
                  <Line key="present-line" type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present" />
                  <Line key="absent-line" type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent" />
                  <Line key="late-line" type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} name="Late" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily View Tab */}
        <TabsContent value="daily" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Today's Attendance - {new Date().toLocaleDateString()}</CardTitle>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Change Date
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employees.slice(0, 10).map((employee, index) => {
                  const statuses = ["Present", "Present", "Present", "Late", "Absent"];
                  const status = statuses[index % statuses.length];
                  const clockIn = status === "Absent" ? "-" : status === "Late" ? "09:15 AM" : "08:45 AM";

                  return (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors"
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
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-medium">Clock In</p>
                          <p className="text-sm text-muted-foreground">{clockIn}</p>
                        </div>
                        <Badge
                          className={
                            status === "Present"
                              ? "bg-green-100 text-green-800"
                              : status === "Late"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }
                          variant="secondary"
                        >
                          {status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p>Calendar view coming soon</p>
                <p className="text-sm mt-2">Interactive calendar to view monthly attendance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}