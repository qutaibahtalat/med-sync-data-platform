import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestType } from "@/types/sample";
import { QrCode, User, Calendar, Clock, Camera, Check } from "lucide-react";

const SampleIntake = () => {
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTests: TestType[] = [
    {
      id: "T001",
      name: "Complete Blood Count",
      category: "Hematology",
      description: "Comprehensive blood analysis",
      duration: 45,
      price: 25.00,
      requiresSpecialPrep: false,
      sampleType: "blood"
    },
    {
      id: "T002",
      name: "Lipid Panel",
      category: "Chemistry",
      description: "Cholesterol analysis",
      duration: 60,
      price: 35.00,
      requiresSpecialPrep: true,
      sampleType: "blood"
    },
    {
      id: "T003",
      name: "Urinalysis",
      category: "Urinalysis",
      description: "Complete urine examination",
      duration: 30,
      price: 15.00,
      requiresSpecialPrep: false,
      sampleType: "urine"
    }
  ];

  const generateBarcode = () => {
    return `SAM${Date.now().toString().slice(-8)}`;
  };

  const handleBarcodeScanner = () => {
    // Simulate barcode scanning
    const scannedData = {
      id: "P" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      name: "Scanned Patient",
      phone: "+92 300 1234567",
      email: "patient@example.com"
    };
    setPatientInfo(scannedData);
    console.log("Barcode scanned:", scannedData);
  };

  const handleSubmit = async () => {
    if (!selectedTest || !patientInfo.name || !patientInfo.phone) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Sample intake submitted:", {
        patient: patientInfo,
        test: selectedTest,
        barcode: generateBarcode(),
        timestamp: new Date()
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setPatientInfo({ id: "", name: "", phone: "", email: "" });
        setSelectedTest(null);
      }, 3000);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Sample Submitted Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Sample ID: <span className="font-mono font-bold">{generateBarcode()}</span>
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sample Intake</h1>
          <p className="text-gray-600">Register new samples for testing</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleBarcodeScanner}>
            <QrCode className="w-4 h-4" />
            Scan Barcode
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Scan ID Card
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
            <CardDescription>Enter or scan patient details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Full Name *</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient name"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+92 300 1234567"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="patient@example.com"
                value={patientInfo.email}
                onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID (Auto-generated)</Label>
              <Input
                id="patientId"
                placeholder="Auto-generated on submit"
                value={patientInfo.id}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Test Selection</CardTitle>
            <CardDescription>Choose the test to be performed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableTests.map((test) => (
              <div
                key={test.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTest?.id === test.id 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTest(test)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {test.duration}min
                      </div>
                      <Badge variant="secondary">{test.sampleType}</Badge>
                      {test.requiresSpecialPrep && (
                        <Badge variant="outline">Special Prep</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">PKR {test.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sample Details */}
      {selectedTest && (
        <Card>
          <CardHeader>
            <CardTitle>Sample Details</CardTitle>
            <CardDescription>Review and confirm sample information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Sample ID</Label>
                <p className="text-lg font-mono">{generateBarcode()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Collection Time</Label>
                <p className="text-lg">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Expected Completion</Label>
                <p className="text-lg">
                  {new Date(Date.now() + selectedTest.duration * 60000).toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" disabled={isSubmitting}>
                Save as Draft
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !patientInfo.name || !patientInfo.phone}
              >
                {isSubmitting ? "Submitting..." : "Submit Sample"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SampleIntake;
