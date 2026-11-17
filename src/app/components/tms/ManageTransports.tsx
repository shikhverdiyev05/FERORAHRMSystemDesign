import { useState } from "react";
import { Search, Filter, Plus, MapPin, Clock, Truck, User, Package, Navigation } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";

interface Transport {
  id: string;
  shipmentId: string;
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  status: string;
  startTime: string;
  eta: string;
  distance: string;
  cargoType: string;
  weight: string;
  currentLocation?: string;
  speed?: string;
  progress?: number;
  phone?: string;
  license?: string;
  vehicleType?: string;
  capacity?: string;
  fuelType?: string;
  stops?: string[];
}

const mockTransports: Transport[] = [
  {
    id: "TRP-2024-001",
    shipmentId: "SHP-2024-156",
    vehicle: "34-ABC-123",
    driver: "Əli Həsənov",
    origin: "Bakı Dəniz Limanı",
    destination: "Gəncə Anbar",
    status: "IN_TRANSIT",
    startTime: "08:30",
    eta: "14:30",
    distance: "365 km",
    cargoType: "Electronics",
    weight: "4,500 kg",
    currentLocation: "Yevlax",
    speed: "85 km/h",
    progress: 65,
    phone: "+994 50 123 45 67",
    license: "AZ12345678",
    vehicleType: "Truck 20T",
    capacity: "20,000 kg",
    fuelType: "Diesel",
    stops: ["Sumqayıt", "Yevlax"],
  },
  {
    id: "TRP-2024-002",
    shipmentId: "SHP-2024-157",
    vehicle: "90-DEF-456",
    driver: "Vüqar Məmmədov",
    origin: "Sumqayıt Anbar",
    destination: "Mingəçevir Terminal",
    status: "DISPATCHED",
    startTime: "10:15",
    eta: "16:45",
    distance: "280 km",
    cargoType: "Building Materials",
    weight: "8,200 kg",
    progress: 25,
    phone: "+994 55 234 56 78",
    license: "AZ23456789",
    vehicleType: "Truck 15T",
    capacity: "15,000 kg",
    fuelType: "Diesel",
    stops: ["Gəncə"],
  },
  {
    id: "TRP-2024-003",
    shipmentId: "SHP-2024-158",
    vehicle: "77-GHI-789",
    driver: "Rəşad Əliyev",
    origin: "Gəncə Fabrik",
    destination: "Bakı Təchizat Mərkəzi",
    status: "DELAYED",
    startTime: "07:00",
    eta: "18:20",
    distance: "365 km",
    cargoType: "Textiles",
    weight: "3,100 kg",
    currentLocation: "Göygöl",
    speed: "45 km/h",
    progress: 45,
    phone: "+994 70 345 67 89",
    license: "AZ34567890",
    vehicleType: "Truck 10T",
    capacity: "10,000 kg",
    fuelType: "Diesel",
    stops: ["Tovuz", "Gədəbəy"],
  },
  {
    id: "TRP-2024-004",
    shipmentId: "SHP-2024-159",
    vehicle: "10-JKL-012",
    driver: "Kamran Quliyev",
    origin: "Bakı Sənaye Parkı",
    destination: "Lənkəran Bazar",
    status: "IN_TRANSIT",
    startTime: "06:45",
    eta: "17:15",
    distance: "268 km",
    cargoType: "Food Products",
    weight: "2,800 kg",
    currentLocation: "Salyan",
    speed: "75 km/h",
    progress: 80,
    phone: "+994 51 456 78 90",
    license: "AZ45678901",
    vehicleType: "Refrigerated Truck",
    capacity: "8,000 kg",
    fuelType: "Diesel",
    stops: ["Sabirabad", "Neftçala"],
  },
  {
    id: "TRP-2024-005",
    shipmentId: "SHP-2024-160",
    vehicle: "50-MNO-345",
    driver: "Elvin Hüseynov",
    origin: "Bakı",
    destination: "Şəki",
    status: "PLANNED",
    startTime: "15:00",
    eta: "21:30",
    distance: "325 km",
    cargoType: "Machinery Parts",
    weight: "5,600 kg",
    progress: 0,
    phone: "+994 77 567 89 01",
    license: "AZ56789012",
    vehicleType: "Truck 15T",
    capacity: "15,000 kg",
    fuelType: "Diesel",
    stops: ["Şamaxı", "İsmayıllı", "Qəbələ"],
  },
  {
    id: "TRP-2024-006",
    shipmentId: "SHP-2024-161",
    vehicle: "99-PQR-678",
    driver: "Tural Qasımov",
    origin: "Gəncə",
    destination: "Bakı",
    status: "COMPLETED",
    startTime: "05:30",
    eta: "11:30",
    distance: "365 km",
    cargoType: "Agricultural Products",
    weight: "6,400 kg",
    progress: 100,
    phone: "+994 50 678 90 12",
    license: "AZ67890123",
    vehicleType: "Truck 20T",
    capacity: "20,000 kg",
    fuelType: "Diesel",
    stops: ["Göygöl", "Ağstafa"],
  },
];

export function ManageTransports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      IN_TRANSIT: { label: "In Transit", className: "bg-blue-100 text-blue-800" },
      DISPATCHED: { label: "Dispatched", className: "bg-purple-100 text-purple-800" },
      DELAYED: { label: "Delayed", className: "bg-red-100 text-red-800" },
      COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800" },
      PLANNED: { label: "Planned", className: "bg-gray-100 text-gray-800" },
      CANCELLED: { label: "Cancelled", className: "bg-orange-100 text-orange-800" },
    };

    const config = statusConfig[status] || statusConfig.PLANNED;
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredTransports = mockTransports.filter((transport) => {
    const matchesSearch =
      transport.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || transport.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (transport: Transport) => {
    setSelectedTransport(transport);
    setDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Manage Transports</h1>
          <p className="text-muted-foreground">Real-time GPS tracking and transport management</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Transport
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, driver, or vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                <SelectItem value="DELAYED">Delayed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PLANNED">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transport List */}
      <Card>
        <CardHeader>
          <CardTitle>Transport List ({filteredTransports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transport ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead className="hidden lg:table-cell">Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">ETA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransports.map((transport) => (
                  <TableRow key={transport.id} className="cursor-pointer hover:bg-accent/50">
                    <TableCell className="font-medium">{transport.id}</TableCell>
                    <TableCell>{transport.vehicle}</TableCell>
                    <TableCell>{transport.driver}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="truncate max-w-32">{transport.origin}</span>
                        <span>→</span>
                        <span className="truncate max-w-32">{transport.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transport.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transport.eta}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(transport)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transport Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transport Details</DialogTitle>
            <DialogDescription>
              Detailed information and live tracking for {selectedTransport?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedTransport && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{selectedTransport.id}</h3>
                  {getStatusBadge(selectedTransport.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipment ID: {selectedTransport.shipmentId}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transport Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Transport Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Cargo Type</p>
                      <p className="text-sm font-medium">{selectedTransport.cargoType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Weight</p>
                      <p className="text-sm font-medium">{selectedTransport.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Priority</p>
                      <Badge variant="outline">Standard</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Driver Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Driver Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Driver Name</p>
                      <p className="text-sm font-medium">{selectedTransport.driver}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <p className="text-sm font-medium">{selectedTransport.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">License</p>
                      <p className="text-sm font-medium">{selectedTransport.license}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Vehicle Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Plate Number</p>
                      <p className="text-sm font-medium">{selectedTransport.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Vehicle Type</p>
                      <p className="text-sm font-medium">{selectedTransport.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                      <p className="text-sm font-medium">{selectedTransport.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Fuel Type</p>
                      <p className="text-sm font-medium">{selectedTransport.fuelType}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Route Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Route Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Origin</p>
                      <p className="text-sm font-medium">{selectedTransport.origin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Destination</p>
                      <p className="text-sm font-medium">{selectedTransport.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Stops</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedTransport.stops?.map((stop, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {stop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Distance</p>
                      <p className="text-sm font-medium">{selectedTransport.distance}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trip Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Trip Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Start Time</p>
                      <p className="text-sm font-medium">{selectedTransport.startTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ETA</p>
                      <p className="text-sm font-medium">{selectedTransport.eta}</p>
                    </div>
                    {selectedTransport.currentLocation && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current Location</p>
                        <p className="text-sm font-medium">{selectedTransport.currentLocation}</p>
                      </div>
                    )}
                    {selectedTransport.speed && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current Speed</p>
                        <p className="text-sm font-medium">{selectedTransport.speed}</p>
                      </div>
                    )}
                  </div>

                  {selectedTransport.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm text-muted-foreground">{selectedTransport.progress}%</p>
                      </div>
                      <Progress value={selectedTransport.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Live Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Live Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-4">
                      <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium text-muted-foreground mb-2">
                        Live Map View
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Real-time vehicle position: {selectedTransport.currentLocation || "Loading..."}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Map integration: Leaflet + OpenStreetMap
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
