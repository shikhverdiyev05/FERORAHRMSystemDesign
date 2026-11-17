1️⃣ TMS ANA MODÜLLERİ
1. Dashboard

Genel operasyon ekranı.

Gösterilecekler:

Active transports

Active vehicles

Active drivers

Delayed shipments

Today completed deliveries

Vehicles online/offline

Live map overview

Widget örnekleri:

Active Transports: 28
Vehicles Online: 17
Drivers Active: 17
Completed Today: 64
Delayed: 3
2️⃣ Manage Transports (ANA MODÜL)

Bu senin GPS takip ekranın olacak.

Her transport için:

Transport ID
Shipment ID
Vehicle
Driver
Origin
Destination
Route
Status
Start Time
Estimated Arrival
Distance
Cargo Type
Weight

Transport Status:

PLANNED
DISPATCHED
IN_TRANSIT
DELAYED
COMPLETED
CANCELLED
Transport Detail Page

Transport seçildiğinde açılan sayfa:

Transport Information

Transport ID
Shipment ID
Driver
Vehicle
Cargo Type
Weight
Volume
Priority

Route Info

Origin
Destination
Stops
Distance
Estimated Duration

Trip Info

Start Time
Current Status
ETA
Remaining Distance

Driver Info

Driver Name
Phone
License

Vehicle Info

Plate Number
Vehicle Type
Capacity
Fuel Type
Transport Detail Page – MAP

Sayfanın en alt kısmında:

Live Map

Haritada gösterilecek:

Transport route

Current vehicle position

Destination

Origin

Stops

Her transport farklı renk olacak.

Örnek:

Transport 1 → Blue
Transport 2 → Red
Transport 3 → Green
Transport 4 → Orange

Harita için:

Leaflet

OpenStreetMap

3️⃣ Vehicles

Araç yönetimi.

Vehicle fields:

Vehicle ID
Plate Number
Vehicle Type
Capacity
Fuel Type
Status
Assigned Driver

Status:

AVAILABLE
IN_TRANSPORT
MAINTENANCE
OUT_OF_SERVICE
4️⃣ Drivers

Şoför yönetimi.

Driver ID
Name
Phone
License Number
Assigned Vehicle
Status

Driver Status:

ACTIVE
OFFLINE
ON_TRIP
5️⃣ Shipments

Taşınan yükler.

Fields:

Shipment ID
Customer
Cargo Type
Weight
Volume
Origin
Destination
Delivery Deadline
6️⃣ Routes

Rota planlama.

Fields:

Route ID
Origin
Destination
Stops
Distance
Estimated Time
7️⃣ Dispatch / Trip Management

Trip başlatma.

Assign Driver
Assign Vehicle
Select Shipment
Select Route
Start Transport
8️⃣ Live Tracking

Bu GPS sisteminin ana ekranı.

Liste:

Transport ID
Vehicle
Driver
Current Speed
Last Location Time
Status

Harita:

tüm araçlar

canlı marker

renk kodu

9️⃣ Geofence (Opsiyonel ama güçlü)

Alan ihlali.

Örnek:

Warehouse zone
Port zone
Delivery zone

Event:

ENTERED
EXITED
🔟 Reports

Raporlama.

Trip history
Distance travelled
Fuel usage
Driver performance
Delivery time report
11️⃣ Alerts

Uyarılar.

Vehicle stopped
Route deviation
Late delivery
Geofence violation
12️⃣ Settings

Sistem ayarları.

Map settings
Transport status rules
User permissions
API keys
🔷 Manage Transport Sayfası Tasarımı

Sayfa yapısı şöyle olmalı:

------------------------------------------------
Transport List
------------------------------------------------

| ID | Vehicle | Driver | Status | ETA | Details |

------------------------------------------------

Transport Detail (seçildiğinde)

Transport Info
Driver Info
Vehicle Info
Route Info
Trip Status

------------------------------------------------
LIVE MAP
------------------------------------------------

Harita yüksekliği:

600px
🔷 Map üzerinde gösterilecek veri

APK uygulamasından gelen veri:

transport_id
vehicle_id
driver_id
lat
lng
speed
timestamp

Haritada:

marker = vehicle
color = transport
popup = vehicle + driver

Popup örneği:

Vehicle: 90-AB-123
Driver: Ali Hasanov
Speed: 64 km/h
Last update: 14:20