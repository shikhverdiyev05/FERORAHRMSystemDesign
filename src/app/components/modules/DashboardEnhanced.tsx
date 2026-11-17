import { motion } from "motion/react";
import {
  Users,
  UserPlus,
  UserMinus,
  Briefcase,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  dashboardStats,
  departmentData,
  genderData,
  monthlyHiringData,
} from "../../data/mockData";

export function DashboardEnhanced({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const statCards = [
    {
      title: "Total Employees",
      value: dashboardStats.totalEmployees,
      change: "+12",
      trend: "up",
      icon: Users,
      color: "blue",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "New Hires",
      value: dashboardStats.newHires,
      change: "+4",
      trend: "up",
      icon: UserPlus,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Open Positions",
      value: dashboardStats.openPositions,
      change: "-2",
      trend: "down",
      icon: Briefcase,
      color: "purple",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Pending Approvals",
      value: dashboardStats.pendingApprovals,
      change: "+5",
      trend: "up",
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  const performanceMetrics = [
    {
      label: "Average Attendance",
      value: dashboardStats.avgAttendance,
      max: 100,
      color: "bg-green-500",
    },
    {
      label: "Employee Satisfaction",
      value: 87.5,
      max: 100,
      color: "bg-blue-500",
    },
    {
      label: "Training Completion",
      value: 73.2,
      max: 100,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button onClick={() => onNavigate?.("payroll")}>
            <DollarSign className="w-4 h-4 mr-2" />
            View Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer card-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-semibold mb-2">{stat.value}</h3>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        this month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Hiring Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Monthly hires vs resignations
                </p>
              </div>
              <Badge variant="outline">2024</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyHiringData}>
                <CartesianGrid key="hiring-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="hiring-xaxis" dataKey="month" />
                <YAxis key="hiring-yaxis" />
                <Tooltip key="hiring-tooltip" />
                <Legend key="hiring-legend" />
                <Bar key="hired-bar" dataKey="hired" fill="#3b82f6" name="Hired" radius={[4, 4, 0, 0]} />
                <Bar key="resigned-bar" dataKey="resigned" fill="#ef4444" name="Resigned" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Department Distribution</h3>
                <p className="text-sm text-muted-foreground">
                  Employees by department
                </p>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  key="department-pie"
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {departmentData.map((entry) => (
                    <Cell key={`dept-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="department-tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics & Gender Diversity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm font-semibold">
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Gender Diversity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Gender Diversity</h3>
            <div className="space-y-4">
              {genderData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {((item.value / dashboardStats.totalEmployees) * 100).toFixed(
                        1
                      )}
                      %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate?.("add-employee")}
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Employee</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate?.("recruitment")}
            >
              <Briefcase className="w-5 h-5" />
              <span>Post Job</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate?.("leave")}
            >
              <Calendar className="w-5 h-5" />
              <span>Request Leave</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex-col gap-2"
              onClick={() => onNavigate?.("payroll")}
            >
              <DollarSign className="w-5 h-5" />
              <span>Run Payroll</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}