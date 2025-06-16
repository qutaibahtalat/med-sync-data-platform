
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TestCatalogItem } from "@/types/sample";
import { Search, Plus, Edit, TestTube2 } from "lucide-react";

const TestCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const mockTests: TestCatalogItem[] = [
    {
      id: "T001",
      name: "Complete Blood Count",
      category: "Hematology",
      description: "Comprehensive blood analysis including RBC, WBC, platelets",
      duration: 45,
      price: 25.00,
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
      price: 35.00,
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
      price: 15.00,
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
      price: 45.00,
      requiresSpecialPrep: false,
      sampleType: "blood",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-12")
    }
  ];

  const filteredTests = mockTests.filter(test =>
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Catalog</h1>
          <p className="text-gray-600">Manage available laboratory tests</p>
        </div>
        <Button className="flex items-center gap-2">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <TestTube2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <CardDescription>{test.category}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
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
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span>
                  <p className="text-gray-600">{test.duration} min</p>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <p className="text-gray-600">${test.price.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestCatalog;
