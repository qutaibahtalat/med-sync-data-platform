
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CurrentView } from "@/pages/Index";
import { 
  FileText, 
  Download, 
  Calendar, 
  Clock,
  CheckCircle,
  Users
} from "lucide-react";

interface PatientDashboardProps {
  onViewChange: (view: CurrentView) => void;
}

const PatientDashboard = ({ onViewChange }: PatientDashboardProps) => {
  const stats = [
    { label: "Total Tests", value: "24", icon: FileText, color: "text-blue-500" },
    { label: "Pending Results", value: "2", icon: Clock, color: "text-orange-500" },
    { label: "Completed", value: "22", icon: CheckCircle, color: "text-green-500" },
    { label: "Next Appointment", value: "3 days", icon: Calendar, color: "text-purple-500" },
  ];

  const recentTests = [
    { id: "T001", name: "Complete Blood Count", date: "2024-01-15", status: "completed", result: "Normal" },
    { id: "T002", name: "Cholesterol Panel", date: "2024-01-10", status: "completed", result: "Elevated" },
    { id: "T003", name: "Glucose Test", date: "2024-01-08", status: "pending", result: "Pending" },
    { id: "T004", name: "Thyroid Function", date: "2024-01-05", status: "completed", result: "Normal" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Health Dashboard</h1>
          <p className="text-gray-600">Track your test results and health status</p>
        </div>
        <Button 
          className="flex items-center gap-2" 
          variant="outline"
          onClick={() => onViewChange("book-appointment")}
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
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

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Test Results
          </CardTitle>
          <CardDescription>
            Your latest test results and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {test.id}
                  </div>
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={test.status === "completed" ? "default" : "outline"}
                  >
                    {test.status}
                  </Badge>
                  <Badge 
                    variant={test.result === "Elevated" ? "destructive" : 
                            test.result === "Normal" ? "secondary" : "outline"}
                  >
                    {test.result}
                  </Badge>
                  {test.status === "completed" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => onViewChange("view-reports")}
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
