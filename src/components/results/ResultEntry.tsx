
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestParameter, ResultEntry as ResultEntryType } from "@/types/result";
import { labDataStore, StoredSample } from "@/store/labData";
import { AlertTriangle, CheckCircle, Save, Send, ArrowLeft, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResultEntry = () => {
  const [samples, setSamples] = useState<StoredSample[]>([]);
  const [selectedSample, setSelectedSample] = useState<StoredSample | null>(null);
  const [results, setResults] = useState<ResultEntryType[]>([]);
  const [interpretation, setInterpretation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    loadSamples();
  }, []);

  const loadSamples = () => {
    const allSamples = labDataStore.getSamples();
    // Filter samples that need result entry
    const pendingSamples = allSamples.filter(s => s.status === "processing" || s.status === "received");
    setSamples(pendingSamples);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  const filteredSamples = samples.filter(sample =>
    sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sample.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateResult = (parameterId: string, value: string) => {
    const parameter = testParameters.find(p => p.id === parameterId);
    if (!parameter) return;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

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
    if (!selectedSample) {
      toast({
        title: "Error",
        description: "Please select a sample first.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      // Update sample with draft results
      const updated = labDataStore.updateSample(selectedSample.id, {
        results,
        notes: interpretation,
        status: "processing"
      });

      if (updated) {
        toast({
          title: "Draft Saved",
          description: "Results have been saved as draft successfully.",
        });
        loadSamples();
      }
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
    if (!selectedSample) {
      toast({
        title: "Error",
        description: "Please select a sample first.",
        variant: "destructive"
      });
      return;
    }

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
      // Update sample with final results and mark as completed
      const updated = labDataStore.updateSample(selectedSample.id, {
        results,
        notes: interpretation,
        status: "completed",
        completedAt: new Date()
      });

      if (updated) {
        toast({
          title: "Submitted for Review",
          description: "Results have been submitted and sample marked as completed.",
        });
        
        // Reset form after successful submission
        setResults([]);
        setInterpretation("");
        setSelectedSample(null);
        loadSamples();
      }
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
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBackButton}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Result Entry</h1>
            <p className="text-gray-600">
              {selectedSample ? `Enter results for sample ${selectedSample.id}` : "Select a sample to enter results"}
            </p>
          </div>
        </div>
        {selectedSample && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
        )}
      </div>

      {!selectedSample ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Sample</CardTitle>
            <CardDescription>Choose a sample to enter test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search samples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredSamples.map((sample) => (
                  <div
                    key={sample.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedSample(sample)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{sample.id}</p>
                        <p className="text-sm text-gray-600">{sample.patientName}</p>
                        <p className="text-sm text-gray-500">{sample.testType.name}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={sample.status === "processing" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}>
                          {sample.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {sample.receivedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSamples.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No samples available for result entry</p>
                  <p className="text-sm">All samples are either completed or archived</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
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
              <CardTitle>Test Parameters for {selectedSample.testType.name}</CardTitle>
              <CardDescription>Enter values for each parameter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {testParameters.map((parameter) => {
                const result = results.find(r => r.parameterId === parameter.id);
                return (
                  <div key={parameter.id} className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center p-4 border rounded-lg">
                    <div>
                      <Label className="font-medium">{parameter.name}</Label>
                      <p className="text-sm text-gray-600">
                        Normal: {parameter.normalRange.min} - {parameter.normalRange.max} {parameter.unit}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        step="0.01"
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
        </>
      )}
    </div>
  );
};

export default ResultEntry;
