import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sample } from "@/types/sample";
import { Search, Eye, Edit, MapPin, Printer, Download } from "lucide-react";

const SampleTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);

  const mockSamples: Sample[] = [
    {
      id: "SAM12345678",
      patientId: "P001",
      patientName: "John Doe",
      testType: {
        id: "T001",
        name: "Complete Blood Count",
        category: "Hematology",
        description: "Comprehensive blood analysis",
        duration: 45,
        price: 25.00,
        requiresSpecialPrep: false,
        sampleType: "blood"
      },
      status: "processing",
      priority: "normal",
      receivedAt: new Date("2024-01-15T09:30:00"),
      barcode: "SAM12345678"
    },
    {
      id: "SAM12345679",
      patientId: "P002",
      patientName: "Jane Smith",
      testType: {
        id: "T002",
        name: "Lipid Panel",
        category: "Chemistry",
        description: "Cholesterol analysis",
        duration: 60,
        price: 35.00,
        requiresSpecialPrep: true,
        sampleType: "blood"
      },
      status: "completed",
      priority: "high",
      receivedAt: new Date("2024-01-14T14:15:00"),
      processedAt: new Date("2024-01-14T15:00:00"),
      completedAt: new Date("2024-01-15T08:30:00"),
      barcode: "SAM12345679"
    },
    {
      id: "SAM12345680",
      patientId: "P003",
      patientName: "Bob Johnson",
      testType: {
        id: "T003",
        name: "Urinalysis",
        category: "Urinalysis",
        description: "Complete urine examination",
        duration: 30,
        price: 15.00,
        requiresSpecialPrep: false,
        sampleType: "urine"
      },
      status: "received",
      priority: "urgent",
      receivedAt: new Date("2024-01-15T11:00:00"),
      barcode: "SAM12345680"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "normal": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSamples = mockSamples.filter(sample => {
    const matchesSearch = 
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.testType.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getTimeElapsed = (receivedAt: Date) => {
    const now = new Date();
    const diff = now.getTime() - receivedAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  const handleUpdateSample = (sampleId: string) => {
    console.log("Updating sample:", sampleId);
    // Implementation for updating sample status
  };

  const handleViewSample = (sample: Sample) => {
    setSelectedSample(sample);
    console.log("Viewing sample details:", sample);
  };

  const handleTrackSample = (sampleId: string) => {
    console.log("Tracking sample:", sampleId);
    // Implementation for real-time tracking
  };

  const handlePrintReport = (sampleId: string) => {
    console.log("Printing report for sample:", sampleId);
    window.print();
  };

  const handleDownloadReport = (sampleId: string) => {
    console.log("Downloading report for sample:", sampleId);
    // Generate and download PDF report
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sample Tracking</h1>
          <p className="text-gray-600">Monitor sample status and workflow</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by sample ID, patient, or test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "received", "processing", "completed"].map((status) => (
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
        {filteredSamples.map((sample) => (
          <Card key={sample.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mb-2">
                      {sample.id}
                    </div>
                    <h3 className="font-semibold text-lg">{sample.patientName}</h3>
                    <p className="text-gray-600">{sample.testType.name}</p>
                    <p className="text-sm text-gray-500">
                      Received {getTimeElapsed(sample.receivedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex flex-col space-y-2">
                      <Badge className={getStatusColor(sample.status)}>
                        {sample.status}
                      </Badge>
                      <Badge className={getPriorityColor(sample.priority)}>
                        {sample.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTrackSample(sample.id)}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Track
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSample(sample)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateSample(sample.id)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Update
                    </Button>
                    {sample.status === "completed" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePrintReport(sample.id)}
                        >
                          <Printer className="w-4 h-4 mr-1" />
                          Print
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(sample.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-8">
                    <div className={`flex items-center space-x-2 ${sample.receivedAt ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${sample.receivedAt ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Received</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${sample.processedAt ? 'text-green-600' : sample.status === 'processing' ? 'text-yellow-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${sample.processedAt ? 'bg-green-600' : sample.status === 'processing' ? 'bg-yellow-600' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Processing</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${sample.completedAt ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${sample.completedAt ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Completed</span>
                    </div>
                  </div>
                  
                  {sample.status === 'processing' && (
                    <div className="text-sm text-gray-600">
                      Est. completion: {new Date(sample.receivedAt.getTime() + sample.testType.duration * 60000).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sample Details Modal */}
      {selectedSample && (
        <Card className="fixed inset-0 z-50 bg-white m-4 overflow-auto">
          <CardHeader>
            <CardTitle>Sample Details - {selectedSample.id}</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4"
              onClick={() => setSelectedSample(null)}
            >
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Patient Information</h4>
                <p>Name: {selectedSample.patientName}</p>
                <p>ID: {selectedSample.patientId}</p>
              </div>
              <div>
                <h4 className="font-medium">Test Information</h4>
                <p>Test: {selectedSample.testType.name}</p>
                <p>Category: {selectedSample.testType.category}</p>
                <p>Duration: {selectedSample.testType.duration} minutes</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Status Information</h4>
              <p>Current Status: {selectedSample.status}</p>
              <p>Priority: {selectedSample.priority}</p>
              <p>Received: {selectedSample.receivedAt.toLocaleString()}</p>
              {selectedSample.processedAt && (
                <p>Processed: {selectedSample.processedAt.toLocaleString()}</p>
              )}
              {selectedSample.completedAt && (
                <p>Completed: {selectedSample.completedAt.toLocaleString()}</p>
              )}
            </div>

            {selectedSample.notes && (
              <div>
                <h4 className="font-medium">Notes</h4>
                <p>{selectedSample.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SampleTracking;
