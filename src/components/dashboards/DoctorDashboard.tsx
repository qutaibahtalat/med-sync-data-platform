
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  Plus,
  Stethoscope,
  Download,
  Eye
} from "lucide-react";

const DoctorDashboard = () => {
  const stats = [
    { label: "Total Patients", value: "156", icon: Users, color: "text-blue-500" },
    { label: "Pending Reports", value: "12", icon: FileText, color: "text-orange-500" },
    { label: "Today's Appointments", value: "8", icon: Calendar, color: "text-green-500" },
    { label: "Critical Results", value: "2", icon: TrendingUp, color: "text-red-500" },
  ];

  const pendingReports = [
    { id: "R001", patient: "Emily Davis", test: "Cardiac Markers", date: "2024-01-15", status: "ready" },
    { id: "R002", patient: "Michael Wilson", test: "Thyroid Function", date: "2024-01-14", status: "abnormal" },
    { id: "R003", patient: "Sarah Connor", test: "Liver Function", date: "2024-01-13", status: "ready" },
    { id: "R004", patient: "David Lee", test: "Kidney Function", date: "2024-01-12", status: "critical" },
  ];

  const quickActions = [
    { title: "Request Test", description: "Order new lab tests", icon: Plus },
    { title: "View Reports", description: "Review test results", icon: FileText },
    { title: "Patient History", description: "Access patient records", icon: Users },
    { title: "Schedule Appointment", description: "Book patient visits", icon: Calendar },
    { title: "Generate Report", description: "Create custom reports", icon: Download },
    { title: "Critical Alerts", description: "View urgent results", icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Review patient results and manage care</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Request Test
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
          <CardDescription>Common clinical tasks</CardDescription>
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

      {/* Pending Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Pending Reports Review
          </CardTitle>
          <CardDescription>
            Test results requiring your review and approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {report.id}
                  </div>
                  <div>
                    <p className="font-medium">{report.patient}</p>
                    <p className="text-sm text-gray-600">{report.test}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={report.status === "critical" ? "destructive" : 
                            report.status === "abnormal" ? "default" : "secondary"}
                  >
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Review
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

export default DoctorDashboard;
