
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CurrentView } from "@/pages/Index";
import { 
  TestTube, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Microscope,
  FileText,
  Package,
  Wrench
} from "lucide-react";

interface LabTechnicianDashboardProps {
  onViewChange: (view: CurrentView) => void;
}

const LabTechnicianDashboard = ({ onViewChange }: LabTechnicianDashboardProps) => {
  const stats = [
    { label: "Pending Tests", value: "23", icon: Clock, color: "text-orange-500" },
    { label: "In Progress", value: "8", icon: TestTube, color: "text-blue-500" },
    { label: "Completed Today", value: "45", icon: CheckCircle, color: "text-green-500" },
    { label: "Urgent Tests", value: "3", icon: AlertTriangle, color: "text-red-500" },
  ];

  const recentSamples = [
    { id: "S001", patient: "John Doe", test: "Blood Chemistry", status: "pending", priority: "normal" },
    { id: "S002", patient: "Jane Smith", test: "Complete Blood Count", status: "in-progress", priority: "urgent" },
    { id: "S003", patient: "Bob Johnson", test: "Lipid Panel", status: "completed", priority: "normal" },
    { id: "S004", patient: "Alice Brown", test: "Glucose Test", status: "pending", priority: "high" },
  ];

  const quickActions = [
    { title: "Sample Intake", description: "Register new samples", icon: Plus, view: "sample-intake" as CurrentView },
    { title: "Test Catalog", description: "View available tests", icon: TestTube, view: "test-catalog" as CurrentView },
    { title: "Sample Tracking", description: "Track sample progress", icon: Microscope, view: "sample-tracking" as CurrentView },
    { title: "Result Entry", description: "Enter test results", icon: FileText, view: "result-entry" as CurrentView },
    { title: "Inventory", description: "Manage supplies", icon: Package, view: "inventory" as CurrentView },
    { title: "Equipment", description: "Monitor equipment", icon: Wrench, view: "equipment" as CurrentView }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Technician Dashboard</h1>
          <p className="text-gray-600">Manage samples, tests, and results</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => onViewChange("sample-intake")}
        >
          <Plus className="w-4 h-4" />
          New Sample
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common laboratory tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => onViewChange(action.view)}
                >
                  <IconComponent className="w-6 h-6" />
                  <div className="text-center">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Samples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-5 h-5" />
            Recent Samples
          </CardTitle>
          <CardDescription>
            Latest samples requiring your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSamples.map((sample) => (
              <div key={sample.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {sample.id}
                  </div>
                  <div>
                    <p className="font-medium">{sample.patient}</p>
                    <p className="text-sm text-gray-600">{sample.test}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={sample.priority === "urgent" ? "destructive" : 
                            sample.priority === "high" ? "default" : "secondary"}
                  >
                    {sample.priority}
                  </Badge>
                  <Badge 
                    variant={sample.status === "completed" ? "default" : "outline"}
                  >
                    {sample.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewChange("sample-tracking")}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabTechnicianDashboard;
