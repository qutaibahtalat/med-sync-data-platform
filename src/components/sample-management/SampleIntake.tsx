
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestType } from "@/types/sample";
import { QrCode, User, Calendar, Clock } from "lucide-react";

const SampleIntake = () => {
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    dob: "",
    phone: ""
  });

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

  const handleSubmit = () => {
    console.log("Sample intake submitted:", {
      patient: patientInfo,
      test: selectedTest,
      barcode: generateBarcode(),
      timestamp: new Date()
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sample Intake</h1>
          <p className="text-gray-600">Register new samples for testing</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <QrCode className="w-4 h-4" />
          Scan Barcode
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
            <CardDescription>Enter or scan patient details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={patientInfo.id}
                onChange={(e) => setPatientInfo({...patientInfo, id: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientInfo.name}
                onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={patientInfo.dob}
                onChange={(e) => setPatientInfo({...patientInfo, dob: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={patientInfo.phone}
                onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
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
                    <div className="font-bold">${test.price.toFixed(2)}</div>
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
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleSubmit}>Submit Sample</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SampleIntake;
