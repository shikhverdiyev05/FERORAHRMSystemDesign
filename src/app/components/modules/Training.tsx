import { useState } from "react";
import { GraduationCap, Plus, Users, Calendar, Clock, CheckCircle, BookOpen, Award, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { trainingPrograms } from "../../data/mockData";

export function Training() {
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [addProgramModalOpen, setAddProgramModalOpen] = useState(false);

  const handleViewDetails = (program: any) => {
    setSelectedProgram({
      ...program,
      participants: [
        { id: 1, name: "John Doe", progress: 85, status: "In Progress" },
        { id: 2, name: "Sarah Smith", progress: 100, status: "Completed" },
        { id: 3, name: "Mike Johnson", progress: 60, status: "In Progress" },
        { id: 4, name: "Emily Brown", progress: 45, status: "In Progress" },
        { id: 5, name: "David Wilson", progress: 100, status: "Completed" },
      ],
      modules: [
        { id: 1, title: "Introduction to Module", duration: "2 hours", completed: true },
        { id: 2, title: "Core Concepts", duration: "4 hours", completed: true },
        { id: 3, title: "Practical Applications", duration: "3 hours", completed: false },
        { id: 4, title: "Final Assessment", duration: "1 hour", completed: false },
      ],
      instructor: "Dr. Jane Smith",
      startDate: "Jan 15, 2026",
      endDate: "Mar 30, 2026",
      completionRate: 68,
    });
    setViewDetailsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Training & Development</h1>
          <p className="text-muted-foreground">Manage employee training programs</p>
        </div>
        <Button className="gap-2" onClick={() => setAddProgramModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Program
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Programs</p>
                <h3 className="text-3xl font-semibold">{trainingPrograms.length}</h3>
              </div>
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Enrolled</p>
                <h3 className="text-3xl font-semibold">124</h3>
              </div>
              <Users className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <h3 className="text-3xl font-semibold">87</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Completion</p>
                <h3 className="text-3xl font-semibold">78%</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                <Badge 
                  variant="secondary" 
                  className={
                    program.status === "Ongoing" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-green-100 text-green-800"
                  }
                >
                  {program.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {program.category}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {program.duration}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {program.enrolled} enrolled
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {program.completed} completed
                </p>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleViewDetails(program)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Dialog open={viewDetailsModalOpen} onOpenChange={setViewDetailsModalOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Training Program Details</DialogTitle>
            <DialogDescription>
              Comprehensive overview of the training program
            </DialogDescription>
          </DialogHeader>

          {selectedProgram && (
            <div className="space-y-6">
              {/* Program Header */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-semibold">{selectedProgram.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">{selectedProgram.category}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedProgram.startDate} - {selectedProgram.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedProgram.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Instructor: {selectedProgram.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={
                      selectedProgram.status === "Ongoing" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }
                    variant="secondary"
                  >
                    {selectedProgram.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Overview */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Progress Overview
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Total Enrolled</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedProgram.enrolled}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-900">{selectedProgram.completed}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 mb-1">Completion Rate</p>
                    <p className="text-2xl font-bold text-purple-900">{selectedProgram.completionRate}%</p>
                  </div>
                </div>
              </div>

              {/* Training Modules */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Training Modules
                </h4>
                <div className="space-y-3">
                  {selectedProgram.modules.map((module: any, index: number) => (
                    <div key={module.id} className="flex items-center gap-4 p-4 bg-accent rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                      </div>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Participants */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Participants ({selectedProgram.participants.length})
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedProgram.participants.map((participant: any) => (
                    <div key={participant.id} className="p-4 bg-accent rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{participant.name}</p>
                        <Badge 
                          className={
                            participant.status === "Completed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }
                          variant="secondary"
                        >
                          {participant.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={participant.progress} className="flex-1" />
                        <span className="text-sm font-medium">{participant.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button className="flex-1 gap-2">
                  <Users className="w-4 h-4" />
                  Enroll Employees
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Award className="w-4 h-4" />
                  View Certificates
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Training Program</DialogTitle>
            <DialogDescription>
              Create a new training and development program for employees
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Program Name */}
            <div className="space-y-2">
              <Label htmlFor="programName">
                Program Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="programName"
                placeholder="e.g., Advanced Leadership Training"
                required
              />
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
                  <SelectItem value="leadership">Leadership & Management</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="compliance">Compliance Training</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="professional">Professional Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the training program objectives and content..."
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Duration and Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duration <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g., 4 weeks, 20 hours"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">
                  Format <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="self-paced">Self-Paced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start and End Date */}
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

            {/* Instructor */}
            <div className="space-y-2">
              <Label htmlFor="instructor">
                Instructor/Trainer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="instructor"
                placeholder="Name of instructor or training provider"
                required
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <Label htmlFor="targetAudience">
                Target Audience <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="targetAudience">
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="new-hires">New Hires</SelectItem>
                  <SelectItem value="managers">Managers</SelectItem>
                  <SelectItem value="department">Specific Department</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                placeholder="Leave empty for unlimited"
              />
            </div>

            {/* Prerequisites */}
            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea
                id="prerequisites"
                placeholder="List any required knowledge or prior training..."
                className="min-h-[80px]"
              />
            </div>

            {/* Certification */}
            <div className="space-y-2">
              <Label>Certification Options</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Issue certificate upon completion</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Require assessment before certification</span>
                </label>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-2">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send enrollment notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send reminders before program starts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Send progress updates to managers</span>
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
    </div>
  );
}
