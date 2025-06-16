
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube2, User, Calendar, FileText } from "lucide-react";

const RequestTest = () => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    dob: "",
    notes: ""
  });

  const availableTests = [
    { id: "T001", name: "Complete Blood Count", category: "Hematology", price: 25.00 },
    { id: "T002", name: "Lipid Panel", category: "Chemistry", price: 35.00 },
    { id: "T003", name: "Thyroid Function", category: "Endocrinology", price: 45.00 },
    { id: "T004", name: "Liver Function", category: "Chemistry", price: 30.00 },
    { id: "T005", name: "Kidney Function", category: "Chemistry", price: 28.00 },
    { id: "T006", name: "Cardiac Markers", category: "Cardiology", price: 55.00 }
  ];

  const toggleTest = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const getTotalCost = () => {
    return selectedTests.reduce((total, testId) => {
      const test = availableTests.find(t => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const handleSubmit = () => {
    console.log("Test request submitted:", {
      patient: patientInfo,
      tests: selectedTests,
      totalCost: getTotalCost(),
      timestamp: new Date()
    });
    alert("Test request submitted successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Request Test</h1>
          <p className="text-gray-600">Order laboratory tests for your patients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
            <CardDescription>Enter patient details</CardDescription>
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
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Clinical Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add clinical notes or special instructions"
                value={patientInfo.notes}
                onChange={(e) => setPatientInfo({...patientInfo, notes: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube2 className="w-5 h-5" />
              Test Selection
            </CardTitle>
            <CardDescription>Choose tests to order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableTests.map((test) => (
              <div
                key={test.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTests.includes(test.id) 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleTest(test.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{test.name}</h4>
                    <Badge variant="secondary" className="mt-1">{test.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${test.price.toFixed(2)}</div>
                    {selectedTests.includes(test.id) && (
                      <Badge variant="default" className="mt-1">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      {selectedTests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Order Summary
            </CardTitle>
            <CardDescription>Review your test order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium">Selected Tests</Label>
                  <p className="text-lg font-bold">{selectedTests.length}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium">Total Cost</Label>
                  <p className="text-lg font-bold">${getTotalCost().toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium">Estimated Time</Label>
                  <p className="text-lg font-bold">2-4 hours</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handleSubmit}>Submit Order</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RequestTest;
