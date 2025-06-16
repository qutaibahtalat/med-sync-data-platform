
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TestParameter, ResultEntry as ResultEntryType } from "@/types/result";
import { AlertTriangle, CheckCircle, Save, Send } from "lucide-react";

const ResultEntry = () => {
  const [sampleId] = useState("SAM12345678");
  const [results, setResults] = useState<ResultEntryType[]>([]);

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Result Entry</h1>
          <p className="text-gray-600">Enter test results for sample {sampleId}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Submit for Review
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
          {testParameters.map((parameter) => (
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
                  className="text-sm"
                />
              </div>
            </div>
          ))}
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultEntry;
