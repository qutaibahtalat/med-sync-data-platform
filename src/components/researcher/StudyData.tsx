
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, BarChart3, Filter } from "lucide-react";

const StudyData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudy, setSelectedStudy] = useState<any>(null);

  const studies = [
    {
      id: "ST001",
      title: "Cardiovascular Risk Factors",
      status: "active",
      participants: 150,
      targetParticipants: 200,
      completion: "78%",
      dataPoints: 2340,
      startDate: "2023-06-01",
      estimatedEnd: "2024-12-31",
      dataTypes: ["Blood Tests", "Demographics", "Medical History"]
    },
    {
      id: "ST002",
      title: "Diabetes Biomarkers",
      status: "recruiting",
      participants: 89,
      targetParticipants: 150,
      completion: "45%",
      dataPoints: 1245,
      startDate: "2023-09-15",
      estimatedEnd: "2025-03-15",
      dataTypes: ["Blood Tests", "Urine Tests", "Lifestyle Data"]
    },
    {
      id: "ST003",
      title: "Liver Function Analysis",
      status: "active",
      participants: 203,
      targetParticipants: 250,
      completion: "92%",
      dataPoints: 3567,
      startDate: "2023-03-01",
      estimatedEnd: "2024-08-31",
      dataTypes: ["Blood Tests", "Imaging Data", "Medical History"]
    },
    {
      id: "ST004",
      title: "Genetic Markers Study",
      status: "paused",
      participants: 67,
      targetParticipants: 100,
      completion: "23%",
      dataPoints: 890,
      startDate: "2023-11-01",
      estimatedEnd: "2025-05-31",
      dataTypes: ["Genetic Data", "Blood Tests", "Demographics"]
    }
  ];

  const filteredStudies = studies.filter(study => {
    const matchesSearch = 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || study.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExportData = (studyId: string) => {
    console.log("Exporting data for study:", studyId);
    alert("Data export started! You will receive a download link via email.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "recruiting": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Data</h1>
          <p className="text-gray-600">Access and analyze your research data</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="recruiting">Recruiting</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Studies List */}
        <div className="space-y-4">
          {filteredStudies.map((study) => (
            <Card key={study.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1">
                      {study.id}
                    </div>
                    <h3 className="font-semibold">{study.title}</h3>
                    <p className="text-sm text-gray-600">
                      {study.participants}/{study.targetParticipants} participants
                    </p>
                    <p className="text-xs text-gray-500">
                      {study.dataPoints} data points collected
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(study.status)}>
                      {study.status}
                    </Badge>
                    <div className="text-sm font-medium">{study.completion}</div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedStudy(study)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Study Details */}
        {selectedStudy && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {selectedStudy.title} - Data Analytics
              </CardTitle>
              <CardDescription>
                Study ID: {selectedStudy.id} | Started: {selectedStudy.startDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Participants</div>
                  <div className="text-2xl font-bold">{selectedStudy.participants}</div>
                  <div className="text-xs text-gray-500">of {selectedStudy.targetParticipants} target</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Data Points</div>
                  <div className="text-2xl font-bold">{selectedStudy.dataPoints}</div>
                  <div className="text-xs text-gray-500">collected</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Completion</div>
                  <div className="text-2xl font-bold">{selectedStudy.completion}</div>
                  <div className="text-xs text-gray-500">of study</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-lg font-bold capitalize">{selectedStudy.status}</div>
                  <div className="text-xs text-gray-500">current</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Available Data Types</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.dataTypes.map((dataType: string) => (
                    <Badge key={dataType} variant="secondary">
                      {dataType}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Quick Analytics</h4>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Recruitment Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(selectedStudy.participants / selectedStudy.targetParticipants) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((selectedStudy.participants / selectedStudy.targetParticipants) * 100)}% complete
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => handleExportData(selectedStudy.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Study Data
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Data
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudyData;
