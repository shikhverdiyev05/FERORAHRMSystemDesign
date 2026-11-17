import { useState } from "react";
import { Package, Plus, Monitor, Smartphone, Wrench, User, Calendar, MapPin, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { assets } from "../../data/mockData";

export function Assets() {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);

  const handleViewDetails = (asset: any) => {
    setSelectedAsset({
      ...asset,
      serialNumber: "SN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      purchaseDate: "Jan 15, 2024",
      warrantyExpiry: "Jan 15, 2027",
      purchaseCost: "$" + (Math.random() * 2000 + 500).toFixed(2),
      assignedDate: "Feb 10, 2024",
      location: "Main Office - Floor 3",
      department: "Engineering",
      notes: "Asset in excellent condition. Regular maintenance performed.",
      maintenanceHistory: [
        { id: 1, date: "Dec 15, 2025", type: "Regular Checkup", status: "Completed" },
        { id: 2, date: "Sep 10, 2025", type: "Software Update", status: "Completed" },
        { id: 3, date: "Jun 05, 2025", type: "Hardware Upgrade", status: "Completed" },
      ],
    });
    setViewDetailsModalOpen(true);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Electronics":
        return <Monitor className="w-6 h-6" />;
      case "Mobile":
        return <Smartphone className="w-6 h-6" />;
      case "Equipment":
        return <Wrench className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Asset Management</h1>
          <p className="text-muted-foreground">Track company assets and assignments</p>
        </div>
        <Button className="gap-2" onClick={() => setAddAssetModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                <h3 className="text-3xl font-semibold">{assets.length}</h3>
              </div>
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Assigned</p>
                <h3 className="text-3xl font-semibold">{assets.length - 2}</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available</p>
                <h3 className="text-3xl font-semibold">2</h3>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Maintenance</p>
                <h3 className="text-3xl font-semibold">3</h3>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets List */}
      <Card>
        <CardHeader>
          <CardTitle>Company Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors gap-3"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(asset.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {asset.assetId} • {asset.category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium">{asset.assignedTo}</span>
                  </div>
                  <Badge variant="secondary" className={getConditionColor(asset.condition)}>
                    {asset.condition}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetails(asset)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={viewDetailsModalOpen} onOpenChange={setViewDetailsModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>
              Complete information about the asset
            </DialogDescription>
          </DialogHeader>

          {selectedAsset && (
            <div className="space-y-6">
              {/* Asset Header */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {getCategoryIcon(selectedAsset.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{selectedAsset.name}</h3>
                    <p className="text-muted-foreground mb-2">{selectedAsset.assetId}</p>
                    <Badge variant="secondary" className={getConditionColor(selectedAsset.condition)}>
                      {selectedAsset.condition}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Asset Information */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Asset Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <p className="font-medium">{selectedAsset.category}</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Serial Number</p>
                    <p className="font-medium">{selectedAsset.serialNumber}</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Purchase Date</p>
                    <p className="font-medium">{selectedAsset.purchaseDate}</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Purchase Cost</p>
                    <p className="font-medium">{selectedAsset.purchaseCost}</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Warranty Expiry</p>
                    <p className="font-medium">{selectedAsset.warrantyExpiry}</p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Condition</p>
                    <p className="font-medium">{selectedAsset.condition}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Details */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Assignment Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Assigned To</p>
                    <p className="font-semibold text-blue-900">{selectedAsset.assignedTo}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-600 mb-1">Department</p>
                    <p className="font-semibold text-green-900">{selectedAsset.department}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-600 mb-1">Assigned Date</p>
                    <p className="font-semibold text-purple-900">{selectedAsset.assignedDate}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h4>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="font-medium">{selectedAsset.location}</p>
                </div>
              </div>

              {/* Maintenance History */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Maintenance History
                </h4>
                <div className="space-y-3">
                  {selectedAsset.maintenanceHistory.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-semibold mb-3">Notes</h4>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-sm text-muted-foreground">{selectedAsset.notes}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button className="flex-1 gap-2">
                  <Wrench className="w-4 h-4" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <User className="w-4 h-4" />
                  Reassign Asset
                </Button>
                <Button variant="outline" onClick={() => setViewDetailsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Asset Modal */}
      <Dialog open={addAssetModalOpen} onOpenChange={setAddAssetModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Register a new company asset to the inventory
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Asset Name */}
            <div className="space-y-2">
              <Label htmlFor="assetName">
                Asset Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="assetName"
                placeholder="e.g., MacBook Pro 16-inch"
                required
              />
            </div>

            {/* Category and Asset ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="mobile">Mobile Devices</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicle">Vehicles</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetId">
                  Asset ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="assetId"
                  placeholder="e.g., AST-001"
                  required
                />
              </div>
            </div>

            {/* Serial Number and Purchase Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  placeholder="Enter serial number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">
                  Purchase Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  required
                />
              </div>
            </div>

            {/* Purchase Cost and Warranty Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseCost">
                  Purchase Cost <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="purchaseCost"
                  type="number"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
                <Input
                  id="warrantyExpiry"
                  type="date"
                />
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <Label htmlFor="condition">
                Condition <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g., Main Office - Floor 3"
                required
              />
            </div>

            {/* Assignment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To Employee</Label>
                <Select>
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="sarah-smith">Sarah Smith</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    <SelectItem value="emily-brown">Emily Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description/Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Description / Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about the asset..."
                className="min-h-[100px]"
              />
            </div>

            {/* Upload Documents */}
            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents</Label>
              <Input
                id="documents"
                type="file"
                multiple
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload purchase receipts, warranty documents, or manuals
              </p>
            </div>

            {/* Maintenance Schedule */}
            <div className="space-y-2">
              <Label>Maintenance Schedule</Label>
              <div className="space-y-2 p-4 bg-accent rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Schedule regular maintenance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Send maintenance reminders</span>
                </label>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Plus className="w-4 h-4" />
                Add Asset
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setAddAssetModalOpen(false)}
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
