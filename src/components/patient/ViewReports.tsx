
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, FileText, Calendar } from "lucide-react";

const ViewReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const reports = [
    {
      id: "R001",
      testName: "Complete Blood Count",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      status: "completed",
      results: {
        "White Blood Cells": { value: "7.2", unit: "K/μL", normal: "4.5-11.0", status: "normal" },
        "Red Blood Cells": { value: "4.5", unit: "M/μL", normal: "4.2-5.4", status: "normal" },
        "Hemoglobin": { value: "14.2", unit: "g/dL", normal: "12.0-15.5", status: "normal" },
        "Platelets": { value: "285", unit: "K/μL", normal: "150-450", status: "normal" }
      },
      interpretation: "All values within normal range. No abnormalities detected."
    },
    {
      id: "R002",
      testName: "Cholesterol Panel",
      date: "2024-01-10",
      doctor: "Dr. Michael Chen",
      status: "completed",
      results: {
        "Total Cholesterol": { value: "220", unit: "mg/dL", normal: "< 200", status: "elevated" },
        "LDL Cholesterol": { value: "145", unit: "mg/dL", normal: "< 100", status: "elevated" },
        "HDL Cholesterol": { value: "45", unit: "mg/dL", normal: "> 40", status: "normal" },
        "Triglycerides": { value: "165", unit: "mg/dL", normal: "< 150", status: "elevated" }
      },
      interpretation: "Elevated cholesterol levels. Recommend dietary changes and follow-up in 3 months."
    },
    {
      id: "R003",
      testName: "Glucose Test",
      date: "2024-01-08",
      doctor: "Dr. Emily Rodriguez",
      status: "pending",
      results: {},
      interpretation: ""
    },
    {
      id: "R004",
      testName: "Thyroid Function",
      date: "2024-01-05",
      doctor: "Dr. David Wilson",
      status: "completed",
      results: {
        "TSH": { value: "2.1", unit: "mIU/L", normal: "0.4-4.0", status: "normal" },
        "Free T4": { value: "1.3", unit: "ng/dL", normal: "0.9-1.7", status: "normal" },
        "Free T3": { value: "3.2", unit: "pg/mL", normal: "2.3-4.2", status: "normal" }
      },
      interpretation: "Thyroid function is normal. Continue current monitoring schedule."
    }
  ];

  const filteredReports = reports.filter(report =>
    report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (reportId: string) => {
    console.log("Downloading report:", reportId);
    alert("Report download started!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Test Reports</h1>
          <p className="text-gray-600">View and download your medical test results</p>
        </div>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-1">
                      {report.id}
                    </div>
                    <h3 className="font-semibold">{report.testName}</h3>
                    <p className="text-sm text-gray-600">{report.doctor}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{report.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      {report.status === "completed" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Details */}
        {selectedReport && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {selectedReport.testName} - {selectedReport.id}
              </CardTitle>
              <CardDescription>
                Performed on {selectedReport.date} by {selectedReport.doctor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedReport.status === "completed" ? (
                <>
                  <div className="space-y-3">
                    <h4 className="font-medium text-lg">Test Results</h4>
                    {Object.entries(selectedReport.results).map(([parameter, data]: [string, any]) => (
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

                  {selectedReport.interpretation && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-lg mb-2">Doctor's Interpretation</h4>
                      <p className="text-gray-700">{selectedReport.interpretation}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleDownload(selectedReport.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Share with Doctor
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">This report is still being processed.</p>
                  <p className="text-sm text-gray-400 mt-2">You will be notified when results are available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewReports;
