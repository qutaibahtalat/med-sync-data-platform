import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { labDataStore, StoredSample } from "@/store/labData";
import { Search, Eye, Edit, MapPin, Printer, Download, ArrowLeft, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SampleTrackingProps {
  onNavigateBack?: () => void;
}

const SampleTracking = ({ onNavigateBack }: SampleTrackingProps) => {
  const [samples, setSamples] = useState<StoredSample[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<StoredSample | null>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadSamples();
    const interval = setInterval(loadSamples, 5000); // Real-time updates every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSamples = () => {
    setSamples(labDataStore.getSamples());
  };

  const handleBackButton = () => {
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      window.history.back();
    }
  };

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

  const filteredSamples = samples.filter(sample => {
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

  const handleUpdateSample = (sample: StoredSample) => {
    if (!updateStatus) {
      toast({
        title: "Error",
        description: "Please select a status to update.",
        variant: "destructive"
      });
      return;
    }

    const updated = labDataStore.updateSample(sample.id, { 
      status: updateStatus as any,
      processedAt: updateStatus === "processing" ? new Date() : sample.processedAt,
      completedAt: updateStatus === "completed" ? new Date() : sample.completedAt
    });

    if (updated) {
      loadSamples();
      setUpdateStatus("");
      toast({
        title: "Sample Updated",
        description: `Sample ${sample.id} status updated to ${updateStatus}.`,
      });
    }
  };

  const handleViewSample = (sample: StoredSample) => {
    setSelectedSample(sample);
  };

  const handleTrackSample = (sampleId: string) => {
    const sample = samples.find(s => s.id === sampleId);
    if (sample) {
      setSelectedSample(sample);
      toast({
        title: "Real-time Tracking",
        description: `Tracking sample ${sampleId} in real-time.`,
      });
    }
  };

  const handlePrintReport = (sampleId: string) => {
    toast({
      title: "Printing Report",
      description: `Generating print version for sample ${sampleId}.`,
    });
    window.print();
  };

  const handleDownloadReport = (sampleId: string) => {
    toast({
      title: "Downloading Report",
      description: `Preparing PDF download for sample ${sampleId}.`,
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBackButton}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sample Tracking</h1>
            <p className="text-gray-600">Monitor sample status and workflow - Real-time updates</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by sample ID, patient, or test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap space-x-2">
          {["all", "received", "processing", "completed"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="mb-2"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSamples.map((sample) => (
          <Card key={sample.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
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

                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex flex-col space-y-2">
                    <Badge className={getStatusColor(sample.status)}>
                      {sample.status}
                    </Badge>
                    <Badge className={getPriorityColor(sample.priority)}>
                      {sample.priority}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    >
                      <option value="">Update Status</option>
                      <option value="received">Received</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateSample(sample)}
                    >
                      Update
                    </Button>
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <div className="flex flex-wrap space-x-4 sm:space-x-8">
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sample Details - {selectedSample.id}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedSample(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <p>Price: PKR {selectedSample.testType.price.toFixed(2)}</p>
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
                <p>Last Updated: {selectedSample.updatedAt.toLocaleString()}</p>
              </div>

              {selectedSample.notes && (
                <div>
                  <h4 className="font-medium">Notes</h4>
                  <p>{selectedSample.notes}</p>
                </div>
              )}

              {selectedSample.results && selectedSample.results.length > 0 && (
                <div>
                  <h4 className="font-medium">Test Results</h4>
                  <div className="space-y-2">
                    {selectedSample.results.map((result, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded">
                        <p>Parameter: {result.parameterId}</p>
                        <p>Value: {result.value}</p>
                        {result.comment && <p>Comment: {result.comment}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {filteredSamples.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No samples found matching your criteria</p>
          <p className="text-sm">Try adjusting your search or filter settings</p>
        </div>
      )}
    </div>
  );
};

export default SampleTracking;
