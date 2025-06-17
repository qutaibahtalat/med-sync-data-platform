import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestParameter, ResultEntry as ResultEntryType } from "@/types/result";
import { AlertTriangle, CheckCircle, Save, Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResultEntry = () => {
  const [sampleId] = useState("SAM12345678");
  const [results, setResults] = useState<ResultEntryType[]>([]);
  const [interpretation, setInterpretation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Mock test parameters for Complete Blood Count
  const testParameters: TestParameter[] = [
    {
      id: "WBC",
      name: "White Blood Cells",
      unit: "cells/μL",
      normalRange: { min: 4000, max: 11000 },
      criticalRange: { min: 2000, max: 20000 }
    },
    {
      id: "RBC",
      name: "Red Blood Cells",
      unit: "cells/μL",
      normalRange: { min: 4200000, max: 5400000 },
      criticalRange: { min: 3000000, max: 7000000 }
    },
    {
      id: "HGB",
      name: "Hemoglobin",
      unit: "g/dL",
      normalRange: { min: 12.0, max: 15.5 },
      criticalRange: { min: 7.0, max: 20.0 }
    },
    {
      id: "HCT",
      name: "Hematocrit",
      unit: "%",
      normalRange: { min: 36, max: 46 },
      criticalRange: { min: 20, max: 60 }
    },
    {
      id: "PLT",
      name: "Platelets",
      unit: "cells/μL",
      normalRange: { min: 150000, max: 450000 },
      criticalRange: { min: 50000, max: 1000000 }
    }
  ];

  const updateResult = (parameterId: string, value: string) => {
    const parameter = testParameters.find(p => p.id === parameterId);
    if (!parameter) return;

    const numValue = parseFloat(value);
    const isAbnormal = numValue < parameter.normalRange.min || numValue > parameter.normalRange.max;
    const isCritical = parameter.criticalRange ? 
      (numValue < parameter.criticalRange.min || numValue > parameter.criticalRange.max) : false;

    setResults(prev => {
      const existing = prev.find(r => r.parameterId === parameterId);
      if (existing) {
        return prev.map(r => 
          r.parameterId === parameterId 
            ? { ...r, value: numValue, isAbnormal, isCritical }
            : r
        );
      } else {
        return [...prev, {
          parameterId,
          value: numValue,
          isAbnormal,
          isCritical
        }];
      }
    });
  };

  const updateComment = (parameterId: string, comment: string) => {
    setResults(prev => 
      prev.map(r => 
        r.parameterId === parameterId 
          ? { ...r, comment }
          : r
      )
    );
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        sampleId,
        results,
        interpretation,
        status: "draft",
        savedAt: new Date()
      };
      
      console.log("Draft saved:", draftData);
      toast({
        title: "Draft Saved",
        description: "Results have been saved as draft successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (results.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one test result before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        sampleId,
        results,
        interpretation,
        status: "pending_review",
        submittedAt: new Date(),
        submittedBy: "current_technician_id"
      };
      
      console.log("Submitted for review:", submissionData);
      toast({
        title: "Submitted for Review",
        description: "Results have been submitted for supervisor review.",
      });
      
      // Reset form after successful submission
      setResults([]);
      setInterpretation("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit for review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (parameterId: string) => {
    const result = results.find(r => r.parameterId === parameterId);
    if (!result) return null;

    if (result.isCritical) {
      return <Badge variant="destructive" className="ml-2">Critical</Badge>;
    }
    if (result.isAbnormal) {
      return <Badge variant="default" className="ml-2">Abnormal</Badge>;
    }
    return <Badge variant="secondary" className="ml-2">Normal</Badge>;
  };

  const criticalCount = results.filter(r => r.isCritical).length;
  const abnormalCount = results.filter(r => r.isAbnormal && !r.isCritical).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Result Entry</h1>
            <p className="text-gray-600">Enter test results for sample {sampleId}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleSubmitForReview}
            disabled={isSubmitting || results.length === 0}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Values</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Abnormal Values</p>
                <p className="text-2xl font-bold text-orange-600">{abnormalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Normal Values</p>
                <p className="text-2xl font-bold text-green-600">
                  {results.length - criticalCount - abnormalCount}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parameter Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Test Parameters</CardTitle>
          <CardDescription>Enter values for each parameter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {testParameters.map((parameter) => {
            const result = results.find(r => r.parameterId === parameter.id);
            return (
              <div key={parameter.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">{parameter.name}</Label>
                  <p className="text-sm text-gray-600">
                    Normal: {parameter.normalRange.min} - {parameter.normalRange.max} {parameter.unit}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={result?.value || ""}
                    onChange={(e) => updateResult(parameter.id, e.target.value)}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-500">{parameter.unit}</span>
                </div>
                
                <div>
                  {getStatusBadge(parameter.id)}
                </div>
                
                <div>
                  <Input
                    placeholder="Comments (optional)"
                    value={result?.comment || ""}
                    onChange={(e) => updateComment(parameter.id, e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Interpretation</CardTitle>
          <CardDescription>Provide overall interpretation and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-3 border rounded-lg resize-none"
            rows={4}
            placeholder="Enter clinical interpretation and recommendations..."
            value={interpretation}
            onChange={(e) => setInterpretation(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultEntry;
