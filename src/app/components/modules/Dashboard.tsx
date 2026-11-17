import { Users, UserCheck, UserX, UserPlus, Briefcase, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { dashboardStats, departmentData, genderData, monthlyHiringData } from "../../data/mockData";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function StatCard({ title, value, icon: Icon, trend, trendValue }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-semibold">{value}</h3>
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? "Good Morning" : currentTime < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-semibold mb-2">{greeting}! 👋</h1>
        <p className="text-blue-100">Welcome back to FERORA HRM. Here's an overview of your HR metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          trend="up"
          trendValue="+12 this month"
        />
        <StatCard
          title="Active Employees"
          value={dashboardStats.activeEmployees}
          icon={UserCheck}
        />
        <StatCard
          title="Open Positions"
          value={dashboardStats.openPositions}
          icon={Briefcase}
          trend="down"
          trendValue="-3 from last month"
        />
        <StatCard
          title="Pending Approvals"
          value={dashboardStats.pendingApprovals}
          icon={Clock}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Employees by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid key="dept-grid" strokeDasharray="3 3" />
                <XAxis key="dept-xaxis" dataKey="name" />
                <YAxis key="dept-yaxis" />
                <Tooltip key="dept-tooltip" />
                <Bar key="dept-bar" dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  key="gender-pie"
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry) => (
                    <Cell key={`gender-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="gender-tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Hiring vs Resignation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Hiring vs Resignation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyHiringData}>
                <CartesianGrid key="hiring-grid" strokeDasharray="3 3" />
                <XAxis key="hiring-xaxis" dataKey="month" />
                <YAxis key="hiring-yaxis" />
                <Tooltip key="hiring-tooltip" />
                <Legend key="hiring-legend" />
                <Line key="hired-line" type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} name="Hired" />
                <Line key="resigned-line" type="monotone" dataKey="resigned" stroke="#ef4444" strokeWidth={2} name="Resigned" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Attendance</p>
                <h3 className="text-2xl font-semibold">{dashboardStats.avgAttendance}%</h3>
              </div>
              <UserCheck className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Turnover Rate</p>
                <h3 className="text-2xl font-semibold">{dashboardStats.turnoverRate}%</h3>
              </div>
              <TrendingDown className="w-10 h-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Payroll</p>
                <h3 className="text-2xl font-semibold">${(dashboardStats.payrollCost / 1000000).toFixed(2)}M</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}