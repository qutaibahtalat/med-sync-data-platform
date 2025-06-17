
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Copy, 
  Edit,
  Trash2,
  GripVertical, 
  Save,
  Eye,
  ArrowLeft,
  Download,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  sections: TemplateSection[];
  isDefault: boolean;
  createdAt: Date;
  usage: number;
}

interface TemplateSection {
  id: string;
  type: "header" | "patient_info" | "test_results" | "reference_ranges" | "interpretation" | "recommendations" | "doctor_signature" | "lab_signature" | "footer";
  title: string;
  content: string;
  order: number;
  isRequired: boolean;
}

const AdvancedReportTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: "TPL001",
      name: "Standard Blood Work Report",
      category: "Hematology",
      description: "Complete blood count with detailed parameters and reference ranges",
      isDefault: true,
      createdAt: new Date("2024-01-01"),
      usage: 450,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Laboratory Header",
          content: `{LAB_NAME}
{LAB_ADDRESS}
Phone: {LAB_PHONE} | Email: {LAB_EMAIL}
License: {LAB_LICENSE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Information",
          content: `Patient Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Patient ID: {PATIENT_ID}
Sample ID: {SAMPLE_ID}
Collection Date: {COLLECTION_DATE}
Report Date: {REPORT_DATE}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Test Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        }
      ]
    },
    {
      id: "TPL002",
      name: "Comprehensive Chemistry Panel",
      category: "Chemistry",
      description: "Liver, kidney, and metabolic function tests with clinical correlation",
      isDefault: false,
      createdAt: new Date("2024-01-05"),
      usage: 320,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Lab Header",
          content: `{LAB_NAME} - CHEMISTRY DEPARTMENT
{LAB_ADDRESS}
{LAB_PHONE} | {LAB_EMAIL}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Demographics",
          content: `Name: {PATIENT_NAME}
Age/Sex: {PATIENT_AGE}/{PATIENT_GENDER}
ID: {PATIENT_ID} | Sample: {SAMPLE_ID}
Collected: {COLLECTION_DATE} | Reported: {REPORT_DATE}
Referring Doctor: {DOCTOR_NAME}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Chemistry Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Clinical Interpretation",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL003",
      name: "Cardiac Risk Assessment",
      category: "Cardiology",
      description: "Cardiac markers with risk stratification and recommendations",
      isDefault: false,
      createdAt: new Date("2024-01-08"),
      usage: 180,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Cardiac Laboratory",
          content: `{LAB_NAME} - CARDIAC BIOMARKERS
Specialized Cardiac Testing Laboratory
{LAB_ADDRESS} | {LAB_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Details",
          content: `Patient: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Sample ID: {SAMPLE_ID}
Collection: {COLLECTION_DATE} {COLLECTION_TIME}
Clinical History: {CLINICAL_HISTORY}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Cardiac Markers",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Risk Assessment",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: true
        },
        {
          id: "s5",
          type: "recommendations",
          title: "Clinical Recommendations",
          content: `{RECOMMENDATIONS}`,
          order: 5,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL004",
      name: "Diabetes Monitoring Panel",
      category: "Endocrinology",
      description: "Glucose, HbA1c, and related parameters for diabetes management",
      isDefault: false,
      createdAt: new Date("2024-01-10"),
      usage: 275,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Endocrinology Lab",
          content: `{LAB_NAME} - ENDOCRINOLOGY SECTION
Diabetes Care Laboratory
{LAB_ADDRESS}
Contact: {LAB_PHONE} | {LAB_EMAIL}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Information",
          content: `Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Sex: {PATIENT_GENDER}
Patient ID: {PATIENT_ID}
Sample ID: {SAMPLE_ID}
Collection Date: {COLLECTION_DATE}
Fasting Status: {FASTING_STATUS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Diabetes Panel Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "reference_ranges",
          title: "Reference Information",
          content: `Target Ranges for Diabetes Management:
- HbA1c: <7% (53 mmol/mol) for most adults
- Fasting Glucose: 80-130 mg/dL (4.4-7.2 mmol/L)
- Postprandial: <180 mg/dL (10.0 mmol/L)`,
          order: 4,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL005",
      name: "Infectious Disease Panel",
      category: "Microbiology",
      description: "Comprehensive infectious disease testing with interpretation",
      isDefault: false,
      createdAt: new Date("2024-01-12"),
      usage: 150,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Microbiology Lab",
          content: `{LAB_NAME} - MICROBIOLOGY DEPARTMENT
Infectious Disease Testing Laboratory
{LAB_ADDRESS}
Emergency Contact: {LAB_EMERGENCY_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient & Sample Info",
          content: `Patient: {PATIENT_NAME}
Age/Gender: {PATIENT_AGE}/{PATIENT_GENDER}
Patient ID: {PATIENT_ID}
Sample Type: {SAMPLE_TYPE}
Collection: {COLLECTION_DATE} {COLLECTION_TIME}
Clinical Symptoms: {SYMPTOMS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Test Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Clinical Interpretation",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: true
        }
      ]
    },
    {
      id: "TPL006",
      name: "Thyroid Function Complete",
      category: "Endocrinology",
      description: "Complete thyroid panel with TSH, T3, T4, and antibodies",
      isDefault: false,
      createdAt: new Date("2024-01-15"),
      usage: 290,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Thyroid Lab",
          content: `{LAB_NAME} - THYROID FUNCTION LABORATORY
Specialized Endocrine Testing
{LAB_ADDRESS} | {LAB_PHONE}
Accreditation: {LAB_ACCREDITATION}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Details",
          content: `Patient Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Patient ID: {PATIENT_ID} | Sample ID: {SAMPLE_ID}
Collection Date: {COLLECTION_DATE}
Medication History: {MEDICATIONS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Thyroid Function Tests",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Thyroid Status Interpretation",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL007",
      name: "Tumor Markers Panel",
      category: "Oncology",
      description: "Cancer screening and monitoring markers with clinical correlation",
      isDefault: false,
      createdAt: new Date("2024-01-18"),
      usage: 95,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Oncology Lab",
          content: `{LAB_NAME} - ONCOLOGY LABORATORY
Tumor Marker Specialist Center
{LAB_ADDRESS}
24/7 Support: {LAB_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Information",
          content: `Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Patient ID: {PATIENT_ID}
Sample ID: {SAMPLE_ID}
Collection: {COLLECTION_DATE}
Clinical Indication: {INDICATION}
Previous Results: {PREVIOUS_RESULTS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Tumor Markers",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Clinical Significance",
          content: `{INTERPRETATION}

Important Note: Tumor markers should be interpreted in conjunction with clinical findings, imaging studies, and other laboratory parameters. These results alone are not diagnostic for cancer.`,
          order: 4,
          isRequired: true
        }
      ]
    },
    {
      id: "TPL008",
      name: "Allergy Testing Report",
      category: "Immunology",
      description: "Comprehensive allergy panel with specific IgE results",
      isDefault: false,
      createdAt: new Date("2024-01-20"),
      usage: 120,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Allergy Lab",
          content: `{LAB_NAME} - ALLERGY & IMMUNOLOGY
Specialized Allergy Testing Center
{LAB_ADDRESS}
Consultation: {LAB_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Details",
          content: `Patient: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Patient ID: {PATIENT_ID}
Sample ID: {SAMPLE_ID}
Test Date: {COLLECTION_DATE}
Allergic Symptoms: {SYMPTOMS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Specific IgE Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Allergy Assessment",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: false
        },
        {
          id: "s5",
          type: "recommendations",
          title: "Management Recommendations",
          content: `{RECOMMENDATIONS}`,
          order: 5,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL009",
      name: "Coagulation Studies",
      category: "Hematology",
      description: "Complete coagulation panel for bleeding disorders assessment",
      isDefault: false,
      createdAt: new Date("2024-01-22"),
      usage: 160,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Coagulation Lab",
          content: `{LAB_NAME} - COAGULATION LABORATORY
Hemostasis & Thrombosis Center
{LAB_ADDRESS} | Emergency: {LAB_EMERGENCY_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Patient Information",
          content: `Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Sex: {PATIENT_GENDER}
Patient ID: {PATIENT_ID} | Sample ID: {SAMPLE_ID}
Collection: {COLLECTION_DATE} {COLLECTION_TIME}
Medications: {ANTICOAGULANTS}
Clinical History: {BLEEDING_HISTORY}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Coagulation Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Hemostasis Assessment",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: false
        }
      ]
    },
    {
      id: "TPL010",
      name: "Pediatric Growth Panel",
      category: "Pediatrics",
      description: "Growth hormone and related parameters for pediatric patients",
      isDefault: false,
      createdAt: new Date("2024-01-25"),
      usage: 75,
      sections: [
        {
          id: "s1",
          type: "header",
          title: "Pediatric Lab",
          content: `{LAB_NAME} - PEDIATRIC ENDOCRINOLOGY
Children's Growth & Development Laboratory
{LAB_ADDRESS}
Pediatric Hotline: {LAB_PEDIATRIC_PHONE}`,
          order: 1,
          isRequired: true
        },
        {
          id: "s2",
          type: "patient_info",
          title: "Child Information",
          content: `Child Name: {PATIENT_NAME}
Age: {PATIENT_AGE} | Gender: {PATIENT_GENDER}
Date of Birth: {DATE_OF_BIRTH}
Patient ID: {PATIENT_ID}
Sample ID: {SAMPLE_ID}
Collection Date: {COLLECTION_DATE}
Height: {HEIGHT} cm | Weight: {WEIGHT} kg
Growth Concerns: {GROWTH_CONCERNS}`,
          order: 2,
          isRequired: true
        },
        {
          id: "s3",
          type: "test_results",
          title: "Growth Panel Results",
          content: `{TEST_PARAMETERS}`,
          order: 3,
          isRequired: true
        },
        {
          id: "s4",
          type: "interpretation",
          title: "Growth Assessment",
          content: `{INTERPRETATION}`,
          order: 4,
          isRequired: false
        },
        {
          id: "s5",
          type: "recommendations",
          title: "Follow-up Recommendations",
          content: `{RECOMMENDATIONS}`,
          order: 5,
          isRequired: false
        }
      ]
    }
  ]);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", "Hematology", "Chemistry", "Endocrinology", "Cardiology", "Microbiology", "Oncology", "Immunology", "Pediatrics"];

  const handleDuplicateTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newTemplate: ReportTemplate = {
        ...template,
        id: `TPL${(templates.length + 1).toString().padStart(3, '0')}`,
        name: `${template.name} (Copy)`,
        isDefault: false,
        createdAt: new Date(),
        usage: 0
      };
      
      setTemplates(prev => [...prev, newTemplate]);
      toast({
        title: "Template Duplicated",
        description: `${template.name} has been duplicated successfully.`,
      });
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.isDefault) {
      toast({
        title: "Cannot Delete",
        description: "Default templates cannot be deleted.",
        variant: "destructive"
      });
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      toast({
        title: "Template Deleted",
        description: "Template has been deleted successfully.",
      });
    }
  };

  const moveSection = (templateId: string, sectionId: string, direction: "up" | "down") => {
    setTemplates(prev => 
      prev.map(template => {
        if (template.id !== templateId) return template;
        
        const sections = [...template.sections];
        const index = sections.findIndex(s => s.id === sectionId);
        
        if (
          (direction === "up" && index > 0) || 
          (direction === "down" && index < sections.length - 1)
        ) {
          const targetIndex = direction === "up" ? index - 1 : index + 1;
          [sections[index], sections[targetIndex]] = [sections[targetIndex], sections[index]];
          
          // Update order
          sections.forEach((section, idx) => {
            section.order = idx + 1;
          });
        }
        
        return { ...template, sections };
      })
    );
  };

  if (selectedTemplate && isEditing) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => {
              setSelectedTemplate(null);
              setIsEditing(false);
            }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Template</h1>
              <p className="text-gray-600">Customize {selectedTemplate.name}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Template Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Template Name</Label>
                    <Input value={selectedTemplate.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select className="w-full p-2 border rounded-md">
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input value={selectedTemplate.description} />
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="space-y-3">
              {selectedTemplate.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveSection(selectedTemplate.id, section.id, "up")}
                          disabled={index === 0}
                        >
                          <GripVertical className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveSection(selectedTemplate.id, section.id, "down")}
                          disabled={index === selectedTemplate.sections.length - 1}
                        >
                          <GripVertical className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge>{section.type.replace(/_/g, ' ')}</Badge>
                            <Input value={section.title} className="font-medium" />
                            {section.isRequired && (
                              <Badge variant="destructive">Required</Badge>
                            )}
                          </div>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        
                        <textarea
                          className="w-full p-3 border rounded-md resize-none font-mono text-sm"
                          rows={6}
                          value={section.content}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{LAB_NAME}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{LAB_ADDRESS}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{LAB_PHONE}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{PATIENT_NAME}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{PATIENT_AGE}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{PATIENT_GENDER}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{TEST_PARAMETERS}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{INTERPRETATION}"}</div>
                  <div className="p-2 bg-gray-50 rounded font-mono">{"{RECOMMENDATIONS}"}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Header
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Patient Info
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Test Results
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Interpretation
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Recommendations
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Signature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Advanced Report Templates</h1>
            <p className="text-gray-600">Professional report templates with drag & drop customization</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Template
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Template
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {filteredTemplates.length} templates
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDuplicateTemplate(template.id)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    disabled={template.isDefault}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {template.sections.length} sections
                </Badge>
                {template.isDefault && (
                  <Badge variant="default">Default</Badge>
                )}
                <Badge variant="outline">
                  {template.usage} uses
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Template Sections:</h4>
                <div className="space-y-1">
                  {template.sections.slice(0, 3).map((section) => (
                    <div key={section.id} className="text-xs text-gray-600 flex items-center justify-between">
                      <span>{section.title}</span>
                      {section.isRequired && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                    </div>
                  ))}
                  {template.sections.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{template.sections.length - 3} more sections
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsEditing(true);
                  }}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-3 h-3" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">
                Created: {template.createdAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedReportTemplates;
