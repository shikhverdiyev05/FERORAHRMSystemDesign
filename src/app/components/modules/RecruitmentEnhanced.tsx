import { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Users,
  Briefcase,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  MoreVertical,
  ChevronRight,
  X,
  FileText,
  MessageSquare,
  Clock,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
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
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { jobOpenings, candidates } from "../../data/mockData";

export function RecruitmentEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    return "bg-green-100 text-green-800";
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      Interview: "bg-blue-100 text-blue-800",
      "Technical Test": "bg-purple-100 text-purple-800",
      Offer: "bg-green-100 text-green-800",
      Screening: "bg-yellow-100 text-yellow-800",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  const stages = [
    { name: "Applied", count: 156, color: "bg-gray-500" },
    { name: "Screening", count: 78, color: "bg-yellow-500" },
    { name: "Interview", count: 45, color: "bg-blue-500" },
    { name: "Technical Test", count: 23, color: "bg-purple-500" },
    { name: "Offer", count: 12, color: "bg-green-500" },
  ];

  const handleViewCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setViewModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Recruitment & ATS</h1>
          <p className="text-muted-foreground">
            Manage job postings and track candidates
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <p className="text-3xl font-semibold mt-1">{jobOpenings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
                <p className="text-3xl font-semibold mt-1">211</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Interview</p>
                <p className="text-3xl font-semibold mt-1">45</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offers Sent</p>
                <p className="text-3xl font-semibold mt-1">12</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Hiring Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-6">Hiring Pipeline</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative">
                <div className="bg-accent rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    {stage.name}
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold">{stage.count}</p>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${stage.color} h-2 rounded-full transition-all`}
                        style={{
                          width: `${(stage.count / stages[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-6 h-6 text-muted-foreground z-10" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="jobs">Job Openings ({jobOpenings.length})</TabsTrigger>
          <TabsTrigger value="candidates">Candidates ({candidates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search job openings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobOpenings.map((job) => (
                  <TableRow key={job.id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {job.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{job.applicants}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(job.posted).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(job.status)}
                        variant="secondary"
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Applicants
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {candidate.position}
                      </p>
                      <Badge
                        className={getStageColor(candidate.stage)}
                        variant="secondary"
                      >
                        {candidate.stage}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-medium text-yellow-700">
                        {candidate.score}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewCandidate(candidate)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Candidate View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            <DialogDescription>
              Complete profile and application details
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-accent"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground mb-2">
                    {selectedCandidate.position}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStageColor(selectedCandidate.stage)} variant="secondary">
                      {selectedCandidate.stage}
                    </Badge>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-medium text-yellow-700">
                        {selectedCandidate.score}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedCandidate.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedCandidate.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Application Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Applied Date</p>
                      <p className="font-medium">
                        {new Date(selectedCandidate.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Position</p>
                      <p className="font-medium">{selectedCandidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="font-medium">5+ years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Education</p>
                      <p className="font-medium">Bachelor's Degree</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-3">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"].map((skill) => (
                    <Badge key={skill} variant="outline" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Recruiter Notes
                </h4>
                <div className="p-4 bg-accent rounded-lg text-sm text-muted-foreground">
                  <p>Strong technical background with excellent communication skills. Demonstrated leadership in previous roles.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 gap-2">
                  <Mail className="w-4 h-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <FileText className="w-4 h-4" />
                  View Resume
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}