import { useState } from "react";
import { CheckCircle, XCircle, MessageSquare, Clock, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

interface LeaveRequest {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: string;
  reason: string;
}

interface LeaveApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveRequest: LeaveRequest | null;
  onApprove: () => void;
  onReject: () => void;
}

interface TimelineItem {
  date: string;
  action: string;
  user: string;
  comment?: string;
}

export function LeaveApprovalModal({
  open,
  onOpenChange,
  leaveRequest,
  onApprove,
  onReject,
}: LeaveApprovalModalProps) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const timeline: TimelineItem[] = [
    {
      date: "2024-02-12 09:30 AM",
      action: "Request submitted",
      user: leaveRequest?.employeeName || "",
      comment: leaveRequest?.reason,
    },
    {
      date: "2024-02-12 09:35 AM",
      action: "Pending review",
      user: "System",
    },
  ];

  const handleApprove = async () => {
    if (!comment.trim()) {
      toast.error("Please add a comment before approving");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Leave request approved", {
        description: `${leaveRequest?.employeeName}'s leave has been approved.`,
      });
      setIsLoading(false);
      setComment("");
      onApprove();
      onOpenChange(false);
    }, 1000);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.error("Leave request rejected", {
        description: `${leaveRequest?.employeeName}'s leave has been rejected.`,
      });
      setIsLoading(false);
      setRejectionReason("");
      setShowRejectionForm(false);
      onReject();
      onOpenChange(false);
    }, 1000);
  };

  if (!leaveRequest) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle>Review Leave Request</DialogTitle>
          <DialogDescription>
            Review and approve or reject this leave request
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4 max-h-[calc(90vh-200px)]">
          {/* Request Details */}
          <div className="space-y-6">
            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">
                      {leaveRequest.employeeName}
                    </h3>
                  </div>
                  <Badge
                    className={getLeaveTypeColor(leaveRequest.leaveType)}
                    variant="secondary"
                  >
                    {leaveRequest.leaveType}
                  </Badge>
                </div>
                <Badge variant="outline" className="bg-yellow-50">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Start Date</p>
                  <p className="font-medium">
                    {new Date(leaveRequest.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">End Date</p>
                  <p className="font-medium">
                    {new Date(leaveRequest.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">
                    {leaveRequest.days} day{leaveRequest.days > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Remaining Balance</p>
                  <p className="font-medium">15 days</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Reason</p>
                <p className="text-sm">{leaveRequest.reason}</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Activity Timeline
              </h4>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.user} • {item.date}
                      </p>
                      {item.comment && (
                        <p className="text-sm mt-2 p-2 bg-muted rounded">
                          {item.comment}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            {!showRejectionForm && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Add Comment
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Textarea
                  placeholder="Add your review comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your comment will be visible to the employee
                </p>
              </div>
            )}

            {/* Rejection Form */}
            {showRejectionForm && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900">Rejection Reason</h4>
                </div>
                <Textarea
                  placeholder="Please provide a detailed reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="resize-none bg-white"
                />
                <p className="text-xs text-red-700 mt-2">
                  Required: Explain why this request is being rejected
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border bg-background">
          {showRejectionForm ? (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectionForm(false);
                  setRejectionReason("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isLoading || !rejectionReason.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Rejecting...
                  </div>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Confirm Rejection
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Close
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => setShowRejectionForm(true)}
                  disabled={isLoading}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isLoading || !comment.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Approving...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
