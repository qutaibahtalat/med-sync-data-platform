
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, FileText, Printer, Mail, Search } from "lucide-react";

interface TestReport {
  id: string;
  sampleId: string;
  patientName: string;
  testName: string;
  status: "draft" | "approved" | "sent";
  createdAt: Date;
  approvedBy?: string;
  hasAbnormalValues: boolean;
  hasCriticalValues: boolean;
}

const ReportGenerator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const mockReports: TestReport[] = [
    {
      id: "RPT001",
      sampleId: "SAM12345678",
      patientName: "John Doe",
      testName: "Complete Blood Count",
      status: "approved",
      createdAt: new Date("2024-01-15T10:30:00"),
      approvedBy: "Dr. Smith",
      hasAbnormalValues: false,
      hasCriticalValues: false
    },
    {
      id: "RPT002",
      sampleId: "SAM12345679",
      patientName: "Jane Smith", 
      testName: "Lipid Panel",
      status: "approved",
      createdAt: new Date("2024-01-14T16:45:00"),
      approvedBy: "Dr. Johnson",
      hasAbnormalValues: true,
      hasCriticalValues: false
    },
    {
      id: "RPT003",
      sampleId: "SAM12345680",
      patientName: "Bob Johnson",
      testName: "Thyroid Function",
      status: "draft",
      createdAt: new Date("2024-01-15T09:15:00"),
      hasAbnormalValues: false,
      hasCriticalValues: false
    },
    {
      id: "RPT004",
      sampleId: "SAM12345681",
      patientName: "Alice Brown",
      testName: "Cardiac Markers",
      status: "approved",
      createdAt: new Date("2024-01-13T14:20:00"),
      approvedBy: "Dr. Wilson",
      hasAbnormalValues: true,
      hasCriticalValues: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "approved": return "bg-green-100 text-green-800";
      case "sent": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = 
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.sampleId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const generatePDF = (reportId: string) => {
    console.log(`Generating PDF for report ${reportId}`);
    // This would trigger PDF generation
  };

  const sendReport = (reportId: string) => {
    console.log(`Sending report ${reportId}`);
    // This would trigger email/portal delivery
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Generator</h1>
          <p className="text-gray-600">Generate and manage test reports</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Create Custom Report
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "draft", "approved", "sent"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-2">
                      {report.id}
                    </div>
                    <h3 className="font-semibold text-lg">{report.patientName}</h3>
                    <p className="text-gray-600">{report.testName}</p>
                    <p className="text-sm text-gray-500">
                      Created {report.createdAt.toLocaleDateString()} at {report.createdAt.toLocaleTimeString()}
                    </p>
                    {report.approvedBy && (
                      <p className="text-sm text-green-600">Approved by {report.approvedBy}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right space-y-2">
                    <div className="flex flex-col space-y-1">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.hasCriticalValues && (
                        <Badge variant="destructive">Critical Values</Badge>
                      )}
                      {report.hasAbnormalValues && !report.hasCriticalValues && (
                        <Badge variant="default">Abnormal Values</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generatePDF(report.id)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4 mr-1" />
                      Print
                    </Button>
                    {report.status === "approved" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => sendReport(report.id)}
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Manage and customize report templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Standard Blood Work</h4>
              <p className="text-sm text-gray-600 mb-3">Complete blood count with reference ranges</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Chemistry Panel</h4>
              <p className="text-sm text-gray-600 mb-3">Comprehensive metabolic panel format</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Cardiac Profile</h4>
              <p className="text-sm text-gray-600 mb-3">Cardiac markers with risk assessment</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;
