
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Trash2, 
  GripVertical, 
  Save,
  Eye,
  Copy
} from "lucide-react";

interface TemplateSection {
  id: string;
  type: "header" | "parameters" | "interpretation" | "recommendations" | "footer";
  title: string;
  content: string;
  order: number;
}

const ReportTemplateBuilder = () => {
  const [templateName, setTemplateName] = useState("");
  const [sections, setSections] = useState<TemplateSection[]>([
    {
      id: "1",
      type: "header",
      title: "Lab Information",
      content: "Laboratory Name: {LAB_NAME}\nDate: {DATE}\nTime: {TIME}",
      order: 1
    },
    {
      id: "2",
      type: "parameters",
      title: "Test Results",
      content: "{TEST_PARAMETERS}",
      order: 2
    }
  ]);

  const predefinedTemplates = [
    { name: "Complete Blood Count", category: "Hematology" },
    { name: "Lipid Panel", category: "Chemistry" },
    { name: "Liver Function Tests", category: "Chemistry" },
    { name: "Kidney Function Tests", category: "Chemistry" },
    { name: "Thyroid Function", category: "Endocrinology" },
    { name: "Cardiac Markers", category: "Cardiology" },
    { name: "Diabetes Panel", category: "Endocrinology" },
    { name: "Urinalysis", category: "Urinalysis" },
    { name: "Coagulation Studies", category: "Hematology" },
    { name: "Tumor Markers", category: "Oncology" },
    { name: "Infectious Disease Panel", category: "Microbiology" },
    { name: "Autoimmune Panel", category: "Immunology" }
  ];

  const sectionTypes = [
    { value: "header", label: "Header", color: "bg-blue-100 text-blue-800" },
    { value: "parameters", label: "Parameters", color: "bg-green-100 text-green-800" },
    { value: "interpretation", label: "Interpretation", color: "bg-purple-100 text-purple-800" },
    { value: "recommendations", label: "Recommendations", color: "bg-orange-100 text-orange-800" },
    { value: "footer", label: "Footer", color: "bg-gray-100 text-gray-800" }
  ];

  const addSection = (type: string) => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: type as any,
      title: `New ${type}`,
      content: "",
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const updateSection = (id: string, field: string, value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = sections.findIndex(s => s.id === id);
    if (
      (direction === "up" && index > 0) || 
      (direction === "down" && index < sections.length - 1)
    ) {
      const newSections = [...sections];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      setSections(newSections);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Template Builder</h1>
          <p className="text-gray-600">Create and customize report templates with drag-and-drop</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Builder */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  placeholder="Enter template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-3">
            {sections.map((section, index) => (
              <Card key={section.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex flex-col space-y-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveSection(section.id, "up")}
                        disabled={index === 0}
                      >
                        <GripVertical className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveSection(section.id, "down")}
                        disabled={index === sections.length - 1}
                      >
                        <GripVertical className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={sectionTypes.find(t => t.value === section.type)?.color}>
                            {section.type}
                          </Badge>
                          <Input
                            value={section.title}
                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                            className="font-medium"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteSection(section.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <textarea
                        className="w-full p-3 border rounded-md resize-none"
                        rows={4}
                        placeholder="Enter section content..."
                        value={section.content}
                        onChange={(e) => updateSection(section.id, "content", e.target.value)}
                      />
                      
                      <div className="text-xs text-gray-500">
                        Available variables: {"{LAB_NAME}"}, {"{DATE}"}, {"{TIME}"}, {"{PATIENT_NAME}"}, {"{TEST_PARAMETERS}"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Section Buttons */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {sectionTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant="outline"
                    size="sm"
                    onClick={() => addSection(type.value)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add {type.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predefined Templates */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predefined Templates</CardTitle>
              <CardDescription>Start with a template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {predefinedTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded font-mono">{"{LAB_NAME}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{DATE}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{TIME}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{PATIENT_NAME}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{PATIENT_ID}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{TEST_PARAMETERS}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{DOCTOR_NAME}"}</div>
                <div className="p-2 bg-gray-50 rounded font-mono">{"{INTERPRETATION}"}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplateBuilder;
