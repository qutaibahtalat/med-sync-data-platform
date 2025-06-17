
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TestCatalogItem } from "@/types/sample";
import { Search, Plus, Edit, TestTube2, Trash2, ArrowLeft, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TestCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTest, setEditingTest] = useState<TestCatalogItem | null>(null);
  const [tests, setTests] = useState<TestCatalogItem[]>([
    {
      id: "T001",
      name: "Complete Blood Count",
      category: "Hematology",
      description: "Comprehensive blood analysis including RBC, WBC, platelets",
      duration: 45,
      price: 2500.00,
      requiresSpecialPrep: false,
      sampleType: "blood",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "T002",
      name: "Lipid Panel",
      category: "Chemistry",
      description: "Cholesterol, triglycerides, HDL, LDL analysis",
      duration: 60,
      price: 3500.00,
      requiresSpecialPrep: true,
      sampleType: "blood",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-10")
    },
    {
      id: "T003",
      name: "Urinalysis",
      category: "Urinalysis",
      description: "Complete urine examination including microscopy",
      duration: 30,
      price: 1500.00,
      requiresSpecialPrep: false,
      sampleType: "urine",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-05")
    },
    {
      id: "T004",
      name: "Thyroid Function Panel",
      category: "Endocrinology",
      description: "TSH, T3, T4 hormone levels",
      duration: 90,
      price: 4500.00,
      requiresSpecialPrep: false,
      sampleType: "blood",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-12")
    }
  ]);
  
  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    description: "",
    duration: 0,
    price: 0,
    requiresSpecialPrep: false,
    sampleType: "blood" as "blood" | "urine" | "saliva" | "tissue" | "other"
  });
  
  const { toast } = useToast();

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSampleTypeColor = (type: string) => {
    switch (type) {
      case "blood": return "bg-red-100 text-red-800";
      case "urine": return "bg-yellow-100 text-yellow-800";
      case "saliva": return "bg-blue-100 text-blue-800";
      case "tissue": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddTest = async () => {
    if (!newTest.name || !newTest.category || !newTest.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const testToAdd: TestCatalogItem = {
        id: `T${(tests.length + 1).toString().padStart(3, '0')}`,
        ...newTest,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setTests(prev => [...prev, testToAdd]);
      
      toast({
        title: "Test Added",
        description: `${newTest.name} has been added to the catalog.`,
      });
      
      setNewTest({
        name: "",
        category: "",
        description: "",
        duration: 0,
        price: 0,
        requiresSpecialPrep: false,
        sampleType: "blood"
      });
      setIsAddingTest(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add test. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditTest = async () => {
    if (!editingTest) return;

    try {
      setTests(prev => 
        prev.map(test => 
          test.id === editingTest.id 
            ? { ...editingTest, updatedAt: new Date() }
            : test
        )
      );
      
      toast({
        title: "Test Updated",
        description: `${editingTest.name} has been updated successfully.`,
      });
      
      setEditingTest(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update test. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTest = async (testId: string) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        setTests(prev => prev.filter(test => test.id !== testId));
        
        toast({
          title: "Test Deleted",
          description: "Test has been removed from the catalog.",
        });
        
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete test. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleToggleStatus = async (testId: string) => {
    try {
      setTests(prev => 
        prev.map(test => 
          test.id === testId 
            ? { ...test, isActive: !test.isActive, updatedAt: new Date() }
            : test
        )
      );
      
      toast({
        title: "Status Updated",
        description: "Test status has been updated.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isAddingTest || editingTest) {
    const currentTest = editingTest || newTest;
    const isEditing = !!editingTest;
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => {
              setIsAddingTest(false);
              setEditingTest(null);
              setNewTest({
                name: "",
                category: "",
                description: "",
                duration: 0,
                price: 0,
                requiresSpecialPrep: false,
                sampleType: "blood"
              });
            }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? "Edit Test" : "Add New Test"}
              </h1>
              <p className="text-gray-600">
                {isEditing ? "Update test information" : "Add a new test to the catalog"}
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Information</CardTitle>
            <CardDescription>Enter test details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name *</Label>
                <Input
                  id="testName"
                  placeholder="Enter test name"
                  value={isEditing ? editingTest.name : newTest.name}
                  onChange={(e) => {
                    if (isEditing) {
                      setEditingTest({...editingTest, name: e.target.value});
                    } else {
                      setNewTest({...newTest, name: e.target.value});
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={isEditing ? editingTest.category : newTest.category}
                  onChange={(e) => {
                    if (isEditing) {
                      setEditingTest({...editingTest, category: e.target.value});
                    } else {
                      setNewTest({...newTest, category: e.target.value});
                    }
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Urinalysis">Urinalysis</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Immunology">Immunology</option>
                  <option value="Oncology">Oncology</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
                placeholder="Enter test description"
                value={isEditing ? editingTest.description : newTest.description}
                onChange={(e) => {
                  if (isEditing) {
                    setEditingTest({...editingTest, description: e.target.value});
                  } else {
                    setNewTest({...newTest, description: e.target.value});
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Duration in minutes"
                  value={isEditing ? editingTest.duration : newTest.duration}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (isEditing) {
                      setEditingTest({...editingTest, duration: value});
                    } else {
                      setNewTest({...newTest, duration: value});
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (PKR)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price in PKR"
                  value={isEditing ? editingTest.price : newTest.price}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    if (isEditing) {
                      setEditingTest({...editingTest, price: value});
                    } else {
                      setNewTest({...newTest, price: value});
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sampleType">Sample Type</Label>
                <select
                  id="sampleType"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={isEditing ? editingTest.sampleType : newTest.sampleType}
                  onChange={(e) => {
                    const value = e.target.value as "blood" | "urine" | "saliva" | "tissue" | "other";
                    if (isEditing) {
                      setEditingTest({...editingTest, sampleType: value});
                    } else {
                      setNewTest({...newTest, sampleType: value});
                    }
                  }}
                >
                  <option value="blood">Blood</option>
                  <option value="urine">Urine</option>
                  <option value="saliva">Saliva</option>
                  <option value="tissue">Tissue</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="specialPrep"
                checked={isEditing ? editingTest.requiresSpecialPrep : newTest.requiresSpecialPrep}
                onChange={(e) => {
                  if (isEditing) {
                    setEditingTest({...editingTest, requiresSpecialPrep: e.target.checked});
                  } else {
                    setNewTest({...newTest, requiresSpecialPrep: e.target.checked});
                  }
                }}
              />
              <Label htmlFor="specialPrep">Requires Special Preparation</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingTest(false);
                  setEditingTest(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={isEditing ? handleEditTest : handleAddTest}>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update Test" : "Add Test"}
              </Button>
            </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Test Catalog</h1>
            <p className="text-gray-600">Manage available laboratory tests</p>
          </div>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddingTest(true)}>
          <Plus className="w-4 h-4" />
          Add New Test
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {filteredTests.length} tests found
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Card key={test.id} className={`hover:shadow-md transition-shadow ${!test.isActive ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <TestTube2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription>{test.category}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setEditingTest(test)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTest(test.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{test.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={getSampleTypeColor(test.sampleType)}>
                  {test.sampleType}
                </Badge>
                {test.requiresSpecialPrep && (
                  <Badge variant="outline">Special Prep</Badge>
                )}
                <Badge 
                  variant={test.isActive ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => handleToggleStatus(test.id)}
                >
                  {test.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span>
                  <p className="text-gray-600">{test.duration} min</p>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <p className="text-gray-600">PKR {test.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Created: {test.createdAt.toLocaleDateString()}</p>
                <p>Updated: {test.updatedAt.toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <TestTube2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first test"}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsAddingTest(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Test
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCatalog;
