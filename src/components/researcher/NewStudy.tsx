
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FlaskConical, Users, Calendar, FileText } from "lucide-react";

const NewStudy = () => {
  const [studyData, setStudyData] = useState({
    title: "",
    description: "",
    objective: "",
    duration: "",
    targetParticipants: "",
    studyType: "",
    ethicsApproval: "",
    dataTypes: [] as string[],
    inclusionCriteria: "",
    exclusionCriteria: "",
    budget: ""
  });

  const studyTypes = [
    "Observational", "Clinical Trial", "Epidemiological", 
    "Cross-sectional", "Longitudinal", "Case-Control"
  ];

  const availableDataTypes = [
    "Blood Tests", "Urine Tests", "Imaging Data", "Genetic Data",
    "Demographics", "Medical History", "Medications", "Lifestyle Data"
  ];

  const handleDataTypeChange = (dataType: string, checked: boolean) => {
    if (checked) {
      setStudyData({
        ...studyData,
        dataTypes: [...studyData.dataTypes, dataType]
      });
    } else {
      setStudyData({
        ...studyData,
        dataTypes: studyData.dataTypes.filter(type => type !== dataType)
      });
    }
  };

  const handleSubmit = () => {
    console.log("New study submitted:", studyData);
    alert("Study proposal submitted for review!");
  };

  const isFormValid = () => {
    return studyData.title && studyData.description && studyData.objective && 
           studyData.studyType && studyData.targetParticipants;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Study</h1>
          <p className="text-gray-600">Submit a new research study proposal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              Study Information
            </CardTitle>
            <CardDescription>Basic details about your research study</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Study Title</Label>
              <Input
                id="title"
                placeholder="Enter study title"
                value={studyData.title}
                onChange={(e) => setStudyData({...studyData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Study Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your study"
                value={studyData.description}
                onChange={(e) => setStudyData({...studyData, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Primary Objective</Label>
              <Textarea
                id="objective"
                placeholder="State the primary objective of your study"
                value={studyData.objective}
                onChange={(e) => setStudyData({...studyData, objective: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studyType">Study Type</Label>
              <Select value={studyData.studyType} onValueChange={(value) => 
                setStudyData({...studyData, studyType: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select study type" />
                </SelectTrigger>
                <SelectContent>
                  {studyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="12"
                  value={studyData.duration}
                  onChange={(e) => setStudyData({...studyData, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Target Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="100"
                  value={studyData.targetParticipants}
                  onChange={(e) => setStudyData({...studyData, targetParticipants: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Data Requirements
            </CardTitle>
            <CardDescription>Specify what data you need for your study</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Required Data Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableDataTypes.map((dataType) => (
                  <div key={dataType} className="flex items-center space-x-2">
                    <Checkbox
                      id={dataType}
                      checked={studyData.dataTypes.includes(dataType)}
                      onCheckedChange={(checked) => handleDataTypeChange(dataType, checked as boolean)}
                    />
                    <label htmlFor={dataType} className="text-sm">
                      {dataType}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inclusion">Inclusion Criteria</Label>
              <Textarea
                id="inclusion"
                placeholder="Specify who can participate in your study"
                value={studyData.inclusionCriteria}
                onChange={(e) => setStudyData({...studyData, inclusionCriteria: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exclusion">Exclusion Criteria</Label>
              <Textarea
                id="exclusion"
                placeholder="Specify who cannot participate in your study"
                value={studyData.exclusionCriteria}
                onChange={(e) => setStudyData({...studyData, exclusionCriteria: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethics">Ethics Approval Number</Label>
              <Input
                id="ethics"
                placeholder="IRB-2024-001"
                value={studyData.ethicsApproval}
                onChange={(e) => setStudyData({...studyData, ethicsApproval: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="50000"
                value={studyData.budget}
                onChange={(e) => setStudyData({...studyData, budget: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Summary */}
      {studyData.title && studyData.targetParticipants && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Study Summary
            </CardTitle>
            <CardDescription>Review your study proposal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Study Type</Label>
                <p className="text-lg font-medium">{studyData.studyType || "Not specified"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Duration</Label>
                <p className="text-lg font-medium">{studyData.duration || "0"} months</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Participants</Label>
                <p className="text-lg font-medium">{studyData.targetParticipants || "0"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Data Types</Label>
                <p className="text-lg font-medium">{studyData.dataTypes.length}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleSubmit} disabled={!isFormValid()}>
                Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewStudy;
