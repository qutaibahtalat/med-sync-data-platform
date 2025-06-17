
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestType } from "@/types/sample";
import { QrCode, User, Calendar, Clock, Camera, Check, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SampleIntake = () => {
  const [selectedTests, setSelectedTests] = useState<TestType[]>([]);
  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const availableTests: TestType[] = [
    {
      id: "T001",
      name: "Complete Blood Count",
      category: "Hematology",
      description: "Comprehensive blood analysis",
      duration: 45,
      price: 2500.00,
      requiresSpecialPrep: false,
      sampleType: "blood"
    },
    {
      id: "T002",
      name: "Lipid Panel",
      category: "Chemistry",
      description: "Cholesterol analysis",
      duration: 60,
      price: 3500.00,
      requiresSpecialPrep: true,
      sampleType: "blood"
    },
    {
      id: "T003",
      name: "Urinalysis",
      category: "Urinalysis",
      description: "Complete urine examination",
      duration: 30,
      price: 1500.00,
      requiresSpecialPrep: false,
      sampleType: "urine"
    },
    {
      id: "T004",
      name: "Thyroid Function Panel",
      category: "Endocrinology",
      description: "TSH, T3, T4 hormone levels",
      duration: 90,
      price: 4500.00,
      requiresSpecialPrep: false,
      sampleType: "blood"
    },
    {
      id: "T005",
      name: "Liver Function Tests",
      category: "Chemistry",
      description: "ALT, AST, Bilirubin analysis",
      duration: 75,
      price: 4000.00,
      requiresSpecialPrep: false,
      sampleType: "blood"
    }
  ];

  const generateBarcode = () => {
    return `SAM${Date.now().toString().slice(-8)}`;
  };

  const handleBarcodeScanner = () => {
    // Simulate barcode scanning
    const scannedData = {
      id: "P" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      name: "Ahmed Khan",
      phone: "+92 300 1234567",
      email: "ahmed@example.com",
      age: "35",
      gender: "Male",
      address: "Block A, Gulberg, Lahore"
    };
    setPatientInfo(scannedData);
    toast({
      title: "Barcode Scanned",
      description: "Patient information loaded successfully.",
    });
  };

  const toggleTestSelection = (test: TestType) => {
    setSelectedTests(prev => {
      const isSelected = prev.find(t => t.id === test.id);
      if (isSelected) {
        return prev.filter(t => t.id !== test.id);
      } else {
        return [...prev, test];
      }
    });
  };

  const removeTest = (testId: string) => {
    setSelectedTests(prev => prev.filter(t => t.id !== testId));
  };

  const getTotalAmount = () => {
    return selectedTests.reduce((total, test) => total + test.price, 0);
  };

  const handleSubmit = async () => {
    if (!patientInfo.name || !patientInfo.phone || selectedTests.length === 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields and select at least one test.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        patient: patientInfo,
        tests: selectedTests,
        barcode: generateBarcode(),
        totalAmount: getTotalAmount(),
        timestamp: new Date(),
        status: "received"
      };
      
      console.log("Sample intake submitted:", submissionData);
      
      toast({
        title: "Sample Submitted",
        description: `Sample registered successfully! Total: PKR ${getTotalAmount().toFixed(2)}`,
      });
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setPatientInfo({ id: "", name: "", phone: "", email: "", age: "", gender: "", address: "" });
        setSelectedTests([]);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit sample. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-lg font-semibold text-blue-600 mb-2">
              Total Amount: PKR {getTotalAmount().toFixed(2)}
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
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sample Intake</h1>
            <p className="text-gray-600">Register new samples for testing</p>
          </div>
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Age"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Complete address"
                value={patientInfo.address}
                onChange={(e) => setPatientInfo({...patientInfo, address: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Available Tests</CardTitle>
            <CardDescription>Select tests to be performed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {availableTests.map((test) => (
              <div
                key={test.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTests.find(t => t.id === test.id)
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleTestSelection(test)}
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
                    {selectedTests.find(t => t.id === test.id) && (
                      <Badge className="mt-1">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Selected Tests Summary */}
      {selectedTests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Tests ({selectedTests.length})</CardTitle>
            <CardDescription>Review selected tests and total amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.category}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">PKR {test.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeTest(test.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">PKR {getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              disabled={isSubmitting}
              onClick={() => {
                toast({
                  title: "Draft Saved",
                  description: "Patient information saved as draft.",
                });
              }}
            >
              Save as Draft
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !patientInfo.name || !patientInfo.phone || selectedTests.length === 0}
              className="min-w-32"
            >
              {isSubmitting ? "Submitting..." : `Submit Sample (PKR ${getTotalAmount().toFixed(2)})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SampleIntake;
