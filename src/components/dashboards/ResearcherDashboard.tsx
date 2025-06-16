
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CurrentView } from "@/pages/Index";
import { 
  Database, 
  BarChart3, 
  FileSearch, 
  Users,
  Plus,
  FlaskConical
} from "lucide-react";

interface ResearcherDashboardProps {
  onViewChange: (view: CurrentView) => void;
}

const ResearcherDashboard = ({ onViewChange }: ResearcherDashboardProps) => {
  const stats = [
    { label: "Available Datasets", value: "1,245", icon: Database, color: "text-blue-500" },
    { label: "Active Studies", value: "8", icon: FileSearch, color: "text-green-500" },
    { label: "Data Points", value: "45,678", icon: BarChart3, color: "text-purple-500" },
    { label: "Participants", value: "892", icon: Users, color: "text-orange-500" },
  ];

  const activeStudies = [
    { id: "ST001", title: "Cardiovascular Risk Factors", participants: 150, status: "active", completion: "78%" },
    { id: "ST002", title: "Diabetes Biomarkers", participants: 89, status: "recruiting", completion: "45%" },
    { id: "ST003", title: "Liver Function Analysis", participants: 203, status: "active", completion: "92%" },
    { id: "ST004", title: "Genetic Markers Study", participants: 67, status: "paused", completion: "23%" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Dashboard</h1>
          <p className="text-gray-600">Access anonymized data and manage research studies</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => onViewChange("new-study")}
        >
          <Plus className="w-4 h-4" />
          New Study
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

      {/* Active Studies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5" />
            Active Research Studies
          </CardTitle>
          <CardDescription>
            Ongoing studies and data collection progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeStudies.map((study) => (
              <div key={study.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {study.id}
                  </div>
                  <div>
                    <p className="font-medium">{study.title}</p>
                    <p className="text-sm text-gray-600">{study.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={study.status === "active" ? "default" : 
                            study.status === "recruiting" ? "secondary" : "outline"}
                  >
                    {study.status}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    {study.completion} complete
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewChange("study-data")}
                  >
                    View Data
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

export default ResearcherDashboard;
