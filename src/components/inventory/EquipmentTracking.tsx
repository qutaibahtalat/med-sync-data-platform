
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Equipment, MaintenanceRecord } from "@/types/inventory";
import { Search, Plus, Wrench, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

const EquipmentTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const mockEquipment: Equipment[] = [
    {
      id: "EQ001",
      name: "Automated Hematology Analyzer",
      model: "HemCount Pro 3000",
      serialNumber: "HC3000-2023-001",
      manufacturer: "MedTech Systems",
      installDate: new Date("2023-06-15"),
      lastMaintenance: new Date("2024-01-01"),
      nextMaintenance: new Date("2024-04-01"),
      maintenanceInterval: 90,
      status: "operational",
      location: "Hematology Lab - Station 1",
      notes: "Primary analyzer for CBC tests"
    },
    {
      id: "EQ002",
      name: "Chemistry Analyzer",
      model: "ChemPro Max 5000",
      serialNumber: "CPM5000-2022-089",
      manufacturer: "BioAnalytics Corp",
      installDate: new Date("2022-11-10"),
      lastMaintenance: new Date("2023-12-15"),
      nextMaintenance: new Date("2024-01-20"),
      maintenanceInterval: 30,
      status: "maintenance",
      location: "Chemistry Lab - Station 2",
      notes: "Requires calibration service"
    },
    {
      id: "EQ003",
      name: "Microscope - Digital",
      model: "DigiScope 4K Pro",
      serialNumber: "DS4K-2023-156",
      manufacturer: "Optics Excellence",
      installDate: new Date("2023-03-20"),
      lastMaintenance: new Date("2023-12-20"),
      nextMaintenance: new Date("2024-06-20"),
      maintenanceInterval: 180,
      status: "operational",
      location: "Pathology Lab - Bench 3",
      notes: "Used for manual cell counts and morphology"
    },
    {
      id: "EQ004",
      name: "Centrifuge - High Speed",
      model: "SpinMax 15000",
      serialNumber: "SM15K-2021-234",
      manufacturer: "LabEquip Solutions",
      installDate: new Date("2021-08-05"),
      lastMaintenance: new Date("2023-11-30"),
      nextMaintenance: new Date("2024-01-18"),
      maintenanceInterval: 45,
      status: "calibration",
      location: "Sample Prep Area",
      notes: "Annual calibration in progress"
    }
  ];

  const mockMaintenanceRecords: MaintenanceRecord[] = [
    {
      id: "MR001",
      equipmentId: "EQ001",
      type: "preventive",
      description: "Quarterly maintenance and calibration",
      performedBy: "TechService Inc",
      performedAt: new Date("2024-01-01"),
      cost: 450.00,
      nextMaintenanceDate: new Date("2024-04-01"),
      notes: "All systems functioning normally"
    },
    {
      id: "MR002",
      equipmentId: "EQ002",
      type: "corrective",
      description: "Reagent line replacement",
      performedBy: "Internal Tech Team",
      performedAt: new Date("2023-12-15"),
      cost: 75.00,
      notes: "Line blockage cleared, system operational"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "calibration": return "bg-blue-100 text-blue-800";
      case "out_of_service": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4" />;
      case "maintenance": return <Wrench className="w-4 h-4" />;
      case "calibration": return <Calendar className="w-4 h-4" />;
      case "out_of_service": return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = 
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getDaysUntilMaintenance = (nextMaintenance: Date) => {
    const today = new Date();
    const diffTime = nextMaintenance.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    totalEquipment: mockEquipment.length,
    operational: mockEquipment.filter(eq => eq.status === "operational").length,
    needsMaintenance: mockEquipment.filter(eq => {
      const daysUntil = getDaysUntilMaintenance(eq.nextMaintenance);
      return daysUntil <= 7;
    }).length,
    outOfService: mockEquipment.filter(eq => eq.status === "out_of_service").length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment Tracking</h1>
          <p className="text-gray-600">Monitor equipment status and maintenance schedules</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Equipment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold">{stats.totalEquipment}</p>
              </div>
              <Wrench className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Operational</p>
                <p className="text-2xl font-bold text-green-600">{stats.operational}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.needsMaintenance}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Service</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfService}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "operational", "maintenance", "calibration", "out_of_service"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status.replace('_', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredEquipment.map((equipment) => {
          const daysUntilMaintenance = getDaysUntilMaintenance(equipment.nextMaintenance);
          
          return (
            <Card key={equipment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getStatusIcon(equipment.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{equipment.name}</h3>
                      <p className="text-gray-600">{equipment.model}</p>
                      <p className="text-sm text-gray-500">Serial: {equipment.serialNumber}</p>
                      <p className="text-sm text-gray-500">Manufacturer: {equipment.manufacturer}</p>
                      <p className="text-sm text-gray-500">Location: {equipment.location}</p>
                      {equipment.notes && (
                        <p className="text-sm text-gray-500">Notes: {equipment.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(equipment.status)}>
                      {equipment.status.replace('_', ' ')}
                    </Badge>
                    
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Installed: {equipment.installDate.toLocaleDateString()}
                      </p>
                      {equipment.lastMaintenance && (
                        <p className="text-gray-600">
                          Last Service: {equipment.lastMaintenance.toLocaleDateString()}
                        </p>
                      )}
                      <p className={`font-medium ${
                        daysUntilMaintenance < 0 ? 'text-red-600' : 
                        daysUntilMaintenance <= 7 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        Next Service: {equipment.nextMaintenance.toLocaleDateString()}
                        {daysUntilMaintenance < 0 
                          ? ` (Overdue by ${Math.abs(daysUntilMaintenance)} days)`
                          : daysUntilMaintenance === 0 
                          ? ' (Due today)'
                          : ` (${daysUntilMaintenance} days)`
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      Service Log
                    </Button>
                    <Button variant="outline" size="sm">
                      Schedule Maintenance
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Maintenance</CardTitle>
          <CardDescription>Latest maintenance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMaintenanceRecords.map((record) => {
              const equipment = mockEquipment.find(eq => eq.id === record.equipmentId);
              return (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{equipment?.name}</h4>
                    <p className="text-sm text-gray-600">{record.description}</p>
                    <p className="text-xs text-gray-500">
                      {record.performedAt.toLocaleDateString()} by {record.performedBy}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={record.type === "corrective" ? "destructive" : "secondary"}>
                      {record.type}
                    </Badge>
                    {record.cost && (
                      <p className="text-sm text-gray-600 mt-1">${record.cost.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentTracking;
