import { useState } from "react";
import { Plus, Search, Briefcase, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { jobOpenings, candidates } from "../../data/mockData";

const candidateStages = [
  "Applied",
  "Screening",
  "Interview",
  "Technical Test",
  "HR Interview",
  "Offer",
  "Hired",
  "Rejected",
];

export function Recruitment() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Recruitment & ATS</h1>
          <p className="text-muted-foreground">Manage job postings and track candidates</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="jobs">Job Openings</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
        </TabsList>

        {/* Job Openings Tab */}
        <TabsContent value="jobs" className="space-y-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search job openings..." className="pl-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Briefcase className="w-8 h-8 text-primary" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {job.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search candidates..." className="pl-10" />
          </div>

          <div className="space-y-3">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                          {candidate.stage}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div>📧 {candidate.email}</div>
                        <div>📱 {candidate.phone}</div>
                        <div>📅 Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</div>
                        <div>⭐ Score: {candidate.score}/100</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule Interview
                        </Button>
                        <Button size="sm" variant="outline">
                          Send Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pipeline View Tab */}
        <TabsContent value="pipeline" className="mt-6">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {candidateStages.map((stage) => {
                const stageCandidates = candidates.filter((c) => c.stage === stage);
                return (
                  <div key={stage} className="w-72 flex-shrink-0">
                    <div className="bg-muted p-3 rounded-t-lg">
                      <h3 className="font-semibold flex justify-between items-center">
                        <span>{stage}</span>
                        <Badge variant="secondary">{stageCandidates.length}</Badge>
                      </h3>
                    </div>
                    <div className="bg-accent/30 p-3 rounded-b-lg space-y-3 min-h-[400px]">
                      {stageCandidates.map((candidate) => (
                        <Card key={candidate.id} className="cursor-move hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <img
                                src={candidate.avatar}
                                alt={candidate.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                                <div className="mt-2 flex items-center gap-1 text-xs">
                                  <span>⭐</span>
                                  <span>{candidate.score}/100</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {stageCandidates.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-8">
                          No candidates in this stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
