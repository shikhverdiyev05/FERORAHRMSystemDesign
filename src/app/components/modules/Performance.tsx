import { useState } from "react";
import { Target, Star, TrendingUp, Plus, Calendar, Award, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { employees } from "../../data/mockData";

export function Performance() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [addProgramModalOpen, setAddProgramModalOpen] = useState(false);
  const [newReviewCycleModalOpen, setNewReviewCycleModalOpen] = useState(false);
  const [addFeedbackModalOpen, setAddFeedbackModalOpen] = useState(false);

  const handleViewDetails = (employee: any) => {
    const score = (Math.random() * 2 + 3).toFixed(1);
    const kpiProgress = Math.floor(Math.random() * 40 + 60);
    const rating = parseFloat(score) >= 4.5 ? "Excellent" : parseFloat(score) >= 4 ? "Good" : parseFloat(score) >= 3.5 ? "Satisfactory" : "Needs Improvement";
    
    setSelectedEmployee({
      ...employee,
      score: parseFloat(score),
      kpiProgress,
      rating,
      goals: [
        { id: 1, title: "Complete Project Alpha", progress: 85, status: "On Track" },
        { id: 2, title: "Improve Customer Satisfaction", progress: 92, status: "Completed" },
        { id: 3, title: "Lead Team Training", progress: 60, status: "In Progress" },
      ],
      achievements: [
        { id: 1, title: "Top Performer Q4 2023", date: "Dec 2023" },
        { id: 2, title: "Customer Excellence Award", date: "Nov 2023" },
        { id: 3, title: "Innovation Leader", date: "Oct 2023" },
      ],
      feedback: [
        { id: 1, reviewer: "Manager", comment: "Excellent work on the recent project. Shows great leadership skills.", date: "2 days ago" },
        { id: 2, reviewer: "Team Lead", comment: "Consistently delivers high-quality work and meets deadlines.", date: "1 week ago" },
      ],
    });
    setViewDetailsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Performance Management</h1>
          <p className="text-muted-foreground">Track employee performance and KPIs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button className="gap-2" onClick={() => setNewReviewCycleModalOpen(true)}>
            <Target className="w-4 h-4" />
            New Review Cycle
          </Button>
          <Button className="gap-2" onClick={() => setAddProgramModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Program
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Performance</p>
                <h3 className="text-3xl font-semibold">4.2/5</h3>
              </div>
              <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reviews Completed</p>
                <h3 className="text-3xl font-semibold">187</h3>
              </div>
              <Target className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Top Performers</p>
                <h3 className="text-3xl font-semibold">42</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance List */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => {
              const score = (Math.random() * 2 + 3).toFixed(1);
              const kpiProgress = Math.floor(Math.random() * 40 + 60);
              const rating = parseFloat(score) >= 4.5 ? "Excellent" : parseFloat(score) >= 4 ? "Good" : parseFloat(score) >= 3.5 ? "Satisfactory" : "Needs Improvement";
              const ratingColor = parseFloat(score) >= 4.5 ? "bg-green-100 text-green-800" : parseFloat(score) >= 4 ? "bg-blue-100 text-blue-800" : parseFloat(score) >= 3.5 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";

              return (
                <div
                  key={employee.id}
                  className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{employee.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 lg:max-w-2xl w-full">
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">KPI Progress</span>
                        <span className="text-sm font-medium">{kpiProgress}%</span>
                      </div>
                      <Progress value={kpiProgress} />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= parseFloat(score)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{score}</span>
                    </div>

                    <Badge className={ratingColor} variant="secondary">
                      {rating}
                    </Badge>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDetails(employee)}
                  >
                    View Details
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Excellent (4.5-5.0)</span>
              <div className="flex items-center gap-2">
                <Progress value={35} className="w-32" />
                <span className="text-sm font-medium w-12 text-right">35%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Good (4.0-4.4)</span>
              <div className="flex items-center gap-2">
                <Progress value={40} className="w-32" />
                <span className="text-sm font-medium w-12 text-right">40%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Satisfactory (3.5-3.9)</span>
              <div className="flex items-center gap-2">
                <Progress value={20} className="w-32" />
                <span className="text-sm font-medium w-12 text-right">20%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Needs Improvement (&lt;3.5)</span>
              <div className="flex items-center gap-2">
                <Progress value={5} className="w-32" />
                <span className="text-sm font-medium w-12 text-right">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employees.slice(0, 5).map((employee) => (
                <div key={employee.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">Reviewed 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Details Modal */}
      <Dialog open={viewDetailsModalOpen} onOpenChange={setViewDetailsModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Performance Details</DialogTitle>
            <DialogDescription>
              Comprehensive performance overview and metrics
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-6">
              {/* Employee Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b">
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
                <div className="flex flex-col gap-2">
                  <Badge className={
                    selectedEmployee.rating === "Excellent" ? "bg-green-100 text-green-800" :
                    selectedEmployee.rating === "Good" ? "bg-blue-100 text-blue-800" :
                    selectedEmployee.rating === "Satisfactory" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  } variant="secondary">
                    {selectedEmployee.rating}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= selectedEmployee.score
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 font-semibold">{selectedEmployee.score}/5</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Overall Score</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedEmployee.score}/5</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 mb-1">KPI Progress</p>
                    <p className="text-2xl font-bold text-green-900">{selectedEmployee.kpiProgress}%</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 mb-1">Goals Completed</p>
                    <p className="text-2xl font-bold text-purple-900">2/3</p>
                  </div>
                </div>
              </div>

              {/* Goals & Objectives */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Goals & Objectives
                </h4>
                <div className="space-y-3">
                  {selectedEmployee.goals.map((goal: any) => (
                    <div key={goal.id} className="p-4 bg-accent rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium">{goal.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={goal.progress} className="flex-1" />
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          </div>
                        </div>
                        <Badge 
                          className={
                            goal.status === "Completed" ? "bg-green-100 text-green-800 ml-2" :
                            goal.status === "On Track" ? "bg-blue-100 text-blue-800 ml-2" :
                            "bg-yellow-100 text-yellow-800 ml-2"
                          } 
                          variant="secondary"
                        >
                          {goal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedEmployee.achievements.map((achievement: any) => (
                    <div key={achievement.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Award className="w-6 h-6 text-yellow-600 mb-2" />
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Feedback */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Recent Feedback
                </h4>
                <div className="space-y-3">
                  {selectedEmployee.feedback.map((item: any) => (
                    <div key={item.id} className="p-4 bg-accent rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{item.reviewer}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button 
                  className="flex-1 gap-2"
                  onClick={() => {
                    setViewDetailsModalOpen(false);
                    setAddFeedbackModalOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Feedback
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Review
                </Button>
                <Button variant="outline" onClick={() => setViewDetailsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Program Modal */}
      <Dialog open={addProgramModalOpen} onOpenChange={setAddProgramModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Performance Program</DialogTitle>
            <DialogDescription>
              Create a new performance review or development program
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Program Type */}
            <div className="space-y-2">
              <Label htmlFor="programType">
                Program Type <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="programType">
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual-review">Annual Performance Review</SelectItem>
                  <SelectItem value="quarterly-review">Quarterly Review</SelectItem>
                  <SelectItem value="development">Development Program</SelectItem>
                  <SelectItem value="goal-setting">Goal Setting Session</SelectItem>
                  <SelectItem value="360-feedback">360° Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Program Name */}
            <div className="space-y-2">
              <Label htmlFor="programName">
                Program Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="programName"
                placeholder="e.g., Q1 2024 Performance Review"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the objectives and scope of this program..."
                className="min-h-[100px]"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  required
                />
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Label htmlFor="participants">
                Participants <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="participants">
                  <SelectValue placeholder="Select participants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                  <SelectItem value="specific">Specific Employees</SelectItem>
                  <SelectItem value="managers">Managers Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department (conditional) */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Review Criteria */}
            <div className="space-y-2">
              <Label>Review Criteria</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Goal Achievement</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Technical Skills</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Communication</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Leadership</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Teamwork</span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-2">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send email notifications to participants</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send reminders before deadline</span>
                </label>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Plus className="w-4 h-4" />
                Create Program
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setAddProgramModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* New Review Cycle Modal */}
      <Dialog open={newReviewCycleModalOpen} onOpenChange={setNewReviewCycleModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Review Cycle</DialogTitle>
            <DialogDescription>
              Set up a new performance review cycle for employees
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Cycle Name */}
            <div className="space-y-2">
              <Label htmlFor="cycleName">
                Review Cycle Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="cycleName"
                placeholder="e.g., Q1 2026 Performance Review"
                required
              />
            </div>

            {/* Review Type */}
            <div className="space-y-2">
              <Label htmlFor="reviewType">
                Review Type <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="reviewType">
                  <SelectValue placeholder="Select review type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Review</SelectItem>
                  <SelectItem value="mid-year">Mid-Year Review</SelectItem>
                  <SelectItem value="quarterly">Quarterly Review</SelectItem>
                  <SelectItem value="probation">Probation Review</SelectItem>
                  <SelectItem value="360">360° Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Review Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="periodStart">
                  Review Period Start <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="periodStart"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periodEnd">
                  Review Period End <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="periodEnd"
                  type="date"
                  required
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">
                Submission Deadline <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                required
              />
              <p className="text-xs text-muted-foreground">
                Last date for managers to submit performance reviews
              </p>
            </div>

            {/* Target Employees */}
            <div className="space-y-2">
              <Label htmlFor="targetEmployees">
                Target Employees <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="targetEmployees">
                  <SelectValue placeholder="Select target employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                  <SelectItem value="position">By Position Level</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <Label htmlFor="departments">Departments</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg max-h-48 overflow-y-auto">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Engineering</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Marketing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Sales</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Human Resources</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Finance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Operations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">IT</span>
                </label>
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="space-y-2">
              <Label>Evaluation Criteria <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm font-medium">Goal Achievement</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Measure goal completion rate</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm font-medium">Technical Skills</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Evaluate technical competencies</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm font-medium">Communication</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Assess communication abilities</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm font-medium">Leadership</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Evaluate leadership qualities</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm font-medium">Teamwork</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Measure collaboration skills</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm font-medium">Innovation</span>
                  </label>
                  <p className="text-xs text-muted-foreground ml-6 mt-1">Assess creative thinking</p>
                </div>
              </div>
            </div>

            {/* Rating Scale */}
            <div className="space-y-2">
              <Label htmlFor="ratingScale">
                Rating Scale <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="ratingScale">
                  <SelectValue placeholder="Select rating scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-point">5-Point Scale (1-5)</SelectItem>
                  <SelectItem value="10-point">10-Point Scale (1-10)</SelectItem>
                  <SelectItem value="descriptive">Descriptive (Excellent, Good, Average, Poor)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Self-Review */}
            <div className="space-y-2">
              <Label>Self-Review Options</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Enable employee self-review</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Make self-review mandatory</span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-2">
              <Label>Notifications & Reminders</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send email notification to employees</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send notification to managers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send reminder 3 days before deadline</span>
                </label>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Target className="w-4 h-4" />
                Create Review Cycle
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setNewReviewCycleModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Feedback Modal */}
      <Dialog open={addFeedbackModalOpen} onOpenChange={setAddFeedbackModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Performance Feedback</DialogTitle>
            <DialogDescription>
              Provide feedback for {selectedEmployee?.name || "employee"}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Employee Info Display */}
            {selectedEmployee && (
              <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{selectedEmployee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </div>
            )}

            {/* Feedback Type */}
            <div className="space-y-2">
              <Label htmlFor="feedbackType">
                Feedback Type <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="feedbackType">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive Feedback</SelectItem>
                  <SelectItem value="constructive">Constructive Feedback</SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="improvement">Area for Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="teamwork">Teamwork</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="problem-solving">Problem Solving</SelectItem>
                  <SelectItem value="time-management">Time Management</SelectItem>
                  <SelectItem value="initiative">Initiative</SelectItem>
                  <SelectItem value="quality">Quality of Work</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="rating">
                Performance Rating <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ Good (4/5)</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ Satisfactory (3/5)</SelectItem>
                  <SelectItem value="2">⭐⭐ Needs Improvement (2/5)</SelectItem>
                  <SelectItem value="1">⭐ Poor (1/5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feedback Details */}
            <div className="space-y-2">
              <Label htmlFor="feedbackDetails">
                Feedback Details <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="feedbackDetails"
                placeholder="Provide detailed feedback about the employee's performance..."
                className="min-h-[120px]"
                required
              />
              <p className="text-xs text-muted-foreground">
                Be specific and provide examples to support your feedback
              </p>
            </div>

            {/* Strengths */}
            <div className="space-y-2">
              <Label htmlFor="strengths">Key Strengths</Label>
              <Textarea
                id="strengths"
                placeholder="Highlight the employee's key strengths and achievements..."
                className="min-h-[80px]"
              />
            </div>

            {/* Areas for Development */}
            <div className="space-y-2">
              <Label htmlFor="development">Areas for Development</Label>
              <Textarea
                id="development"
                placeholder="Suggest areas where the employee can improve..."
                className="min-h-[80px]"
              />
            </div>

            {/* Action Items */}
            <div className="space-y-2">
              <Label htmlFor="actionItems">Action Items / Recommendations</Label>
              <Textarea
                id="actionItems"
                placeholder="Provide specific action items or recommendations..."
                className="min-h-[80px]"
              />
            </div>

            {/* Follow-up Date */}
            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Set a date to review progress on this feedback
              </p>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <Label>Feedback Visibility</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="visibility" value="private" defaultChecked />
                  <div>
                    <p className="text-sm font-medium">Private</p>
                    <p className="text-xs text-muted-foreground">Only visible to you and HR</p>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="visibility" value="employee" />
                  <div>
                    <p className="text-sm font-medium">Share with Employee</p>
                    <p className="text-xs text-muted-foreground">Employee can view this feedback</p>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="visibility" value="public" />
                  <div>
                    <p className="text-sm font-medium">Public</p>
                    <p className="text-xs text-muted-foreground">Visible to managers and HR</p>
                  </div>
                </label>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <CheckCircle className="w-4 h-4" />
                Submit Feedback
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setAddFeedbackModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}