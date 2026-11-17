import { Truck, Users, Package, AlertCircle, CheckCircle, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export function TMSDashboard() {
  const stats = [
    {
      title: "Active Transports",
      value: "28",
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Vehicles Online",
      value: "17/24",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "71%",
      changeType: "neutral",
    },
    {
      title: "Active Drivers",
      value: "17",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+3",
      changeType: "positive",
    },
    {
      title: "Completed Today",
      value: "64",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      change: "+8",
      changeType: "positive",
    },
    {
      title: "Delayed Shipments",
      value: "3",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: "-2",
      changeType: "positive",
    },
    {
      title: "Total Distance Today",
      value: "2,847 km",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+15%",
      changeType: "positive",
    },
  ];

  const recentTransports = [
    {
      id: "TRP-2024-001",
      vehicle: "34-ABC-123",
      driver: "Əli Həsənov",
      route: "Bakı → Gəncə",
      status: "IN_TRANSIT",
      eta: "14:30",
      progress: 65,
    },
    {
      id: "TRP-2024-002",
      vehicle: "90-DEF-456",
      driver: "Vüqar Məmmədov",
      route: "Sumqayıt → Mingəçevir",
      status: "DISPATCHED",
      eta: "16:45",
      progress: 25,
    },
    {
      id: "TRP-2024-003",
      vehicle: "77-GHI-789",
      driver: "Rəşad Əliyev",
      route: "Gəncə → Bakı",
      status: "DELAYED",
      eta: "18:20",
      progress: 45,
    },
    {
      id: "TRP-2024-004",
      vehicle: "10-JKL-012",
      driver: "Kamran Quliyev",
      route: "Bakı → Lənkəran",
      status: "IN_TRANSIT",
      eta: "17:15",
      progress: 80,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      IN_TRANSIT: { label: "In Transit", className: "bg-blue-100 text-blue-800" },
      DISPATCHED: { label: "Dispatched", className: "bg-purple-100 text-purple-800" },
      DELAYED: { label: "Delayed", className: "bg-red-100 text-red-800" },
      COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800" },
      PLANNED: { label: "Planned", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status] || statusConfig.PLANNED;
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 px-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transports & Live Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Active Transports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransports.map((transport) => (
                <div
                  key={transport.id}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">{transport.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {transport.vehicle} • {transport.driver}
                      </p>
                    </div>
                    {getStatusBadge(transport.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{transport.route}</span>
                    <span className="font-medium">ETA: {transport.eta}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        transport.status === "DELAYED"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${transport.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Map Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center p-4">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Live Map View
                </p>
                <p className="text-xs text-muted-foreground">
                  Real-time vehicle tracking
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">In Transit</span>
                </div>
                <span className="font-medium">15</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <span className="font-medium">7</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  <span className="text-muted-foreground">Offline</span>
                </div>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}