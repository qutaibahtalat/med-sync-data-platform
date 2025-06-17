
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Wrench,
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";

interface LabTechnicianDashboardProps {
  onViewChange: (view: CurrentView) => void;
}

const LabTechnicianDashboard = ({ onViewChange }: LabTechnicianDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const stats = [
    { 
      label: "Pending Tests", 
      value: "23", 
      icon: Clock, 
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      trend: "+12%",
      description: "Tests awaiting processing"
    },
    { 
      label: "In Progress", 
      value: "8", 
      icon: TestTube, 
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      trend: "+5%",
      description: "Currently being analyzed"
    },
    { 
      label: "Completed Today", 
      value: "45", 
      icon: CheckCircle, 
      color: "text-green-500",
      bgColor: "bg-green-50",
      trend: "+18%",
      description: "Successfully completed"
    },
    { 
      label: "Urgent Tests", 
      value: "3", 
      icon: AlertTriangle, 
      color: "text-red-500",
      bgColor: "bg-red-50",
      trend: "-2",
      description: "Requires immediate attention"
    },
  ];

  const recentSamples = [
    { 
      id: "S001", 
      patient: "John Doe", 
      test: "Blood Chemistry Panel", 
      status: "pending", 
      priority: "normal",
      receivedTime: "09:30 AM",
      expectedTime: "2:30 PM",
      technician: "You"
    },
    { 
      id: "S002", 
      patient: "Jane Smith", 
      test: "Complete Blood Count", 
      status: "in-progress", 
      priority: "urgent",
      receivedTime: "08:45 AM",
      expectedTime: "11:45 AM",
      technician: "You"
    },
    { 
      id: "S003", 
      patient: "Bob Johnson", 
      test: "Lipid Panel", 
      status: "completed", 
      priority: "normal",
      receivedTime: "07:30 AM",
      expectedTime: "10:30 AM",
      technician: "Sarah Wilson"
    },
    { 
      id: "S004", 
      patient: "Alice Brown", 
      test: "Glucose Tolerance Test", 
      status: "pending", 
      priority: "high",
      receivedTime: "10:15 AM",
      expectedTime: "1:15 PM",
      technician: "You"
    },
  ];

  const quickActions = [
    { 
      title: "Sample Intake", 
      description: "Register new samples", 
      icon: Plus, 
      view: "sample-intake" as CurrentView,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      isWorking: true
    },
    { 
      title: "Test Catalog", 
      description: "View available tests", 
      icon: TestTube, 
      view: "test-catalog" as CurrentView,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      isWorking: true
    },
    { 
      title: "Sample Tracking", 
      description: "Track sample progress", 
      icon: Microscope, 
      view: "sample-tracking" as CurrentView,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      isWorking: true
    },
    { 
      title: "Result Entry", 
      description: "Enter test results", 
      icon: FileText, 
      view: "result-entry" as CurrentView,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      isWorking: true
    },
    { 
      title: "Inventory", 
      description: "Manage supplies", 
      icon: Package, 
      view: "inventory" as CurrentView,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      isWorking: true
    },
    { 
      title: "Equipment", 
      description: "Monitor equipment", 
      icon: Wrench, 
      view: "equipment" as CurrentView,
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      isWorking: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "normal": return "bg-gray-500 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  const filteredSamples = recentSamples.filter(sample => {
    const matchesSearch = sample.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === "all" || sample.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Technician Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage samples, tests, and laboratory operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => onViewChange("notifications")}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Button>
          <Button 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => onViewChange("sample-intake")}
          >
            <Plus className="w-4 h-4" />
            New Sample
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.trend.includes('+') ? 'bg-green-100 text-green-800' : 
                      stat.trend.includes('-') ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Access commonly used laboratory functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200"
                  onClick={() => onViewChange(action.view)}
                >
                  <div className={`p-3 rounded-xl ${action.color} text-white`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    {action.isWorking && (
                      <Badge variant="outline" className="mt-2 text-xs bg-green-50 text-green-700 border-green-200">
                        ✓ Functional
                      </Badge>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Samples with Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Recent Samples
              </CardTitle>
              <CardDescription>
                Latest samples requiring your attention
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search samples..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-200 rounded-md text-sm"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSamples.map((sample) => (
              <div key={sample.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-blue-100 px-3 py-2 rounded-lg font-semibold text-blue-800">
                    {sample.id}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{sample.patient}</p>
                    <p className="text-sm text-gray-600">{sample.test}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>Received: {sample.receivedTime}</span>
                      <span>•</span>
                      <span>Expected: {sample.expectedTime}</span>
                      <span>•</span>
                      <span>Assigned to: {sample.technician}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(sample.priority)}>
                    {sample.priority}
                  </Badge>
                  <Badge className={getStatusColor(sample.status)}>
                    {sample.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewChange("sample-tracking")}
                    >
                      Track
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewChange("result-entry")}
                    >
                      Enter Results
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSamples.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <TestTube className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No samples found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LabTechnicianDashboard;
