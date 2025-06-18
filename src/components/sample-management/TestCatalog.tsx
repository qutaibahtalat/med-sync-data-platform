import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestType } from "@/types/sample";
import { labDataStore } from "@/store/labData";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  TestTube,
  Clock,
  DollarSign,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestCatalogProps {
  onNavigateBack?: () => void;
}

const TestCatalog = ({ onNavigateBack }: TestCatalogProps) => {
  const [tests, setTests] = useState<TestType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [editingTest, setEditingTest] = useState<TestType | null>(null);
  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    description: "",
    duration: 0,
    price: 0,
    requiresSpecialPrep: false,
    sampleType: "blood" as "blood" | "urine" | "other"
  });
  const { toast } = useToast();

  useEffect(() => {
    setTests(labDataStore.getTests());
  }, []);

  const handleBackButton = () => {
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      window.history.back();
    }
  };

  const handleAddTest = () => {
    if (!newTest.name || !newTest.category || !newTest.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    const addedTest = labDataStore.addTest(newTest);
    setTests(labDataStore.getTests());
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
    
    toast({
      title: "Test Added",
      description: `${addedTest.name} has been added to the catalog.`,
    });
  };

  const handleEditTest = () => {
    if (!editingTest) return;

    const updated = labDataStore.updateTest(editingTest.id, editingTest);
    if (updated) {
      setTests(labDataStore.getTests());
      setEditingTest(null);
      toast({
        title: "Test Updated",
        description: `${updated.name} has been updated.`,
      });
    }
  };

  const handleDeleteTest = (id: string) => {
    const success = labDataStore.deleteTest(id);
    if (success) {
      setTests(labDataStore.getTests());
      toast({
        title: "Test Deleted",
        description: "Test has been removed from the catalog.",
      });
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || test.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(tests.map(test => test.category)));

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBackButton}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Test Catalog</h1>
            <p className="text-gray-600">Manage available laboratory tests</p>
          </div>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsAddingTest(true)}
        >
          <Plus className="w-4 h-4" />
          Add New Test
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          className="px-3 py-2 border border-gray-200 rounded-md text-sm w-full sm:w-auto"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add/Edit Test Form */}
      {(isAddingTest || editingTest) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTest ? "Edit Test" : "Add New Test"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  placeholder="Enter test name"
                  value={editingTest ? editingTest.name : newTest.name}
                  onChange={(e) => editingTest 
                    ? setEditingTest({...editingTest, name: e.target.value})
                    : setNewTest({...newTest, name: e.target.value})
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category"
                  value={editingTest ? editingTest.category : newTest.category}
                  onChange={(e) => editingTest 
                    ? setEditingTest({...editingTest, category: e.target.value})
                    : setNewTest({...newTest, category: e.target.value})
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter test description"
                value={editingTest ? editingTest.description : newTest.description}
                onChange={(e) => editingTest 
                  ? setEditingTest({...editingTest, description: e.target.value})
                  : setNewTest({...newTest, description: e.target.value})
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="0"
                  value={editingTest ? editingTest.duration : newTest.duration}
                  onChange={(e) => editingTest 
                    ? setEditingTest({...editingTest, duration: parseInt(e.target.value) || 0})
                    : setNewTest({...newTest, duration: parseInt(e.target.value) || 0})
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (PKR)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={editingTest ? editingTest.price : newTest.price}
                  onChange={(e) => editingTest 
                    ? setEditingTest({...editingTest, price: parseFloat(e.target.value) || 0})
                    : setNewTest({...newTest, price: parseFloat(e.target.value) || 0})
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sampleType">Sample Type</Label>
                <select
                  id="sampleType"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editingTest ? editingTest.sampleType : newTest.sampleType}
                  onChange={(e) => editingTest 
                    ? setEditingTest({...editingTest, sampleType: e.target.value as any})
                    : setNewTest({...newTest, sampleType: e.target.value as any})
                  }
                >
                  <option value="blood">Blood</option>
                  <option value="urine">Urine</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="specialPrep"
                checked={editingTest ? editingTest.requiresSpecialPrep : newTest.requiresSpecialPrep}
                onChange={(e) => editingTest 
                  ? setEditingTest({...editingTest, requiresSpecialPrep: e.target.checked})
                  : setNewTest({...newTest, requiresSpecialPrep: e.target.checked})
                }
              />
              <Label htmlFor="specialPrep">Requires Special Preparation</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingTest(false);
                  setEditingTest(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingTest ? handleEditTest : handleAddTest}>
                {editingTest ? "Update Test" : "Add Test"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{test.name}</CardTitle>
                <Badge variant="secondary">{test.category}</Badge>
              </div>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{test.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>PKR {test.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-gray-500" />
                  <span>{test.sampleType}</span>
                </div>
                {test.requiresSpecialPrep && (
                  <Badge variant="outline" className="text-xs">Special Prep</Badge>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingTest(test)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteTest(test.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <TestTube className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No tests found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default TestCatalog;
