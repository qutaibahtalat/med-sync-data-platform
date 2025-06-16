
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, CheckCircle, XCircle, Eye } from "lucide-react";

const ReviewResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const pendingResults = [
    {
      id: "R001",
      patientName: "Emily Davis",
      patientId: "P001",
      testName: "Cardiac Markers",
      date: "2024-01-15",
      status: "ready",
      results: {
        "Troponin I": { value: "0.05", unit: "ng/mL", normal: "< 0.04", status: "elevated" },
        "CK-MB": { value: "8.2", unit: "ng/mL", normal: "0.0-6.3", status: "elevated" },
        "Myoglobin": { value: "95", unit: "ng/mL", normal: "25-72", status: "elevated" }
      },
      priority: "critical"
    },
    {
      id: "R002",
      patientName: "Michael Wilson",
      patientId: "P002",
      testName: "Thyroid Function",
      date: "2024-01-14",
      status: "ready",
      results: {
        "TSH": { value: "12.5", unit: "mIU/L", normal: "0.4-4.0", status: "elevated" },
        "Free T4": { value: "0.8", unit: "ng/dL", normal: "0.9-1.7", status: "low" },
        "Free T3": { value: "2.1", unit: "pg/mL", normal: "2.3-4.2", status: "low" }
      },
      priority: "high"
    },
    {
      id: "R003",
      patientName: "Sarah Connor",
      patientId: "P003",
      testName: "Liver Function",
      date: "2024-01-13",
      status: "ready",
      results: {
        "ALT": { value: "25", unit: "U/L", normal: "7-35", status: "normal" },
        "AST": { value: "30", unit: "U/L", normal: "8-35", status: "normal" },
        "Bilirubin": { value: "1.1", unit: "mg/dL", normal: "0.3-1.2", status: "normal" }
      },
      priority: "normal"
    }
  ];

  const filteredResults = pendingResults.filter(result => {
    const matchesSearch = 
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || result.priority === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (resultId: string) => {
    console.log("Approving result:", resultId);
    alert("Result approved and sent to patient!");
  };

  const handleReject = (resultId: string) => {
    console.log("Rejecting result:", resultId);
    alert("Result rejected and sent back to lab!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Review Results</h1>
          <p className="text-gray-600">Review and approve test results</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by patient, test, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results List */}
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1">
                      {result.id}
                    </div>
                    <h3 className="font-semibold">{result.patientName}</h3>
                    <p className="text-sm text-gray-600">{result.testName}</p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      variant={result.priority === "critical" ? "destructive" : 
                              result.priority === "high" ? "default" : "secondary"}
                    >
                      {result.priority}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedResult(result)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Result Details */}
        {selectedResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Result Details - {selectedResult.id}
              </CardTitle>
              <CardDescription>
                {selectedResult.patientName} - {selectedResult.testName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(selectedResult.results).map(([parameter, data]: [string, any]) => (
                  <div key={parameter} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{parameter}</h4>
                        <p className="text-sm text-gray-600">Normal: {data.normal}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{data.value} {data.unit}</p>
                        <Badge 
                          variant={data.status === "elevated" || data.status === "low" ? "destructive" : "secondary"}
                        >
                          {data.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Clinical Notes</label>
                <Textarea placeholder="Add your clinical interpretation..." rows={3} />
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleApprove(selectedResult.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Send
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleReject(selectedResult.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewResults;
