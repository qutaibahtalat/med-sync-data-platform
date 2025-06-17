
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Calendar,
  Search,
  Download,
  Filter,
  ArrowLeft
} from "lucide-react";

interface FinanceRecord {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: Date;
  reference?: string;
}

const FinanceDashboard = () => {
  const [dateFilter, setDateFilter] = useState("thisMonth");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const mockFinanceData: FinanceRecord[] = [
    {
      id: "F001",
      type: "income",
      category: "Test Revenue",
      description: "CBC Test - Patient: John Doe",
      amount: 2500,
      date: new Date("2024-01-15"),
      reference: "SAM12345678"
    },
    {
      id: "F002",
      type: "income",
      category: "Test Revenue",
      description: "Lipid Panel - Patient: Jane Smith",
      amount: 3500,
      date: new Date("2024-01-14"),
      reference: "SAM12345679"
    },
    {
      id: "F003",
      type: "expense",
      category: "Equipment Maintenance",
      description: "Hematology Analyzer Service",
      amount: 450,
      date: new Date("2024-01-10"),
      reference: "EQ001"
    },
    {
      id: "F004",
      type: "expense",
      category: "Supplies",
      description: "Blood Collection Tubes Purchase",
      amount: 3750,
      date: new Date("2024-01-08"),
      reference: "INV001"
    },
    {
      id: "F005",
      type: "income",
      category: "Doctor Commission",
      description: "Commission from Dr. Ahmed",
      amount: 1200,
      date: new Date("2024-01-12"),
      reference: "DOC001"
    }
  ];

  const getTotalIncome = () => {
    return mockFinanceData
      .filter(record => record.type === "income")
      .reduce((total, record) => total + record.amount, 0);
  };

  const getTotalExpenses = () => {
    return mockFinanceData
      .filter(record => record.type === "expense")
      .reduce((total, record) => total + record.amount, 0);
  };

  const getNetProfit = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const filteredRecords = mockFinanceData.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || record.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Test Revenue", "Equipment Maintenance", "Supplies", "Doctor Commission", "Utilities", "Staff Salary"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
            <p className="text-gray-600">Track income, expenses, and profitability</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">PKR {getTotalIncome().toFixed(2)}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">PKR {getTotalExpenses().toFixed(2)}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${getNetProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  PKR {getNetProfit().toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getTotalIncome() > 0 ? ((getNetProfit() / getTotalIncome()) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="thisQuarter">This Quarter</option>
          <option value="thisYear">This Year</option>
        </select>
      </div>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-8 rounded ${record.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <h4 className="font-medium">{record.description}</h4>
                    <p className="text-sm text-gray-600">{record.category}</p>
                    <p className="text-xs text-gray-500">
                      {record.date.toLocaleDateString()} 
                      {record.reference && ` • Ref: ${record.reference}`}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant={record.type === "income" ? "default" : "destructive"}>
                    {record.type}
                  </Badge>
                  <p className={`text-lg font-bold mt-1 ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.type === 'income' ? '+' : '-'}PKR {record.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
