
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus,
  Search,
  Download,
  Eye,
  Calendar
} from "lucide-react";

const CommissionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const commissionData = {
    totalEarned: 125000,
    thisMonth: 25000,
    totalReferrals: 145,
    pendingPayment: 15000
  };

  const doctors = [
    {
      id: "D001",
      name: "Dr. Sarah Johnson",
      speciality: "Cardiology",
      totalReferrals: 45,
      totalCommission: 45000,
      thisMonth: 8500,
      commissionRate: "15%",
      status: "active"
    },
    {
      id: "D002", 
      name: "Dr. Michael Chen",
      speciality: "Internal Medicine",
      totalReferrals: 38,
      totalCommission: 32000,
      thisMonth: 6500,
      commissionRate: "12%",
      status: "active"
    },
    {
      id: "D003",
      name: "Dr. Emily Rodriguez",
      speciality: "Pediatrics", 
      totalReferrals: 62,
      totalCommission: 48000,
      thisMonth: 9800,
      commissionRate: "18%",
      status: "active"
    }
  ];

  const recentTransactions = [
    {
      id: "T001",
      doctor: "Dr. Sarah Johnson",
      patient: "John Doe",
      test: "Cardiac Markers",
      amount: 1500,
      commission: 225,
      date: "2024-01-15",
      status: "paid"
    },
    {
      id: "T002",
      doctor: "Dr. Michael Chen", 
      patient: "Jane Smith",
      test: "Complete Blood Count",
      amount: 800,
      commission: 96,
      date: "2024-01-14",
      status: "pending"
    },
    {
      id: "T003",
      doctor: "Dr. Emily Rodriguez",
      patient: "Bob Wilson",
      test: "Thyroid Panel",
      amount: 1200,
      commission: 216,
      date: "2024-01-13",
      status: "paid"
    }
  ];

  const stats = [
    { 
      label: "Total Earned", 
      value: `PKR ${commissionData.totalEarned.toLocaleString()}`, 
      icon: DollarSign, 
      color: "text-green-500" 
    },
    { 
      label: "This Month", 
      value: `PKR ${commissionData.thisMonth.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-blue-500" 
    },
    { 
      label: "Total Referrals", 
      value: commissionData.totalReferrals.toString(), 
      icon: Users, 
      color: "text-purple-500" 
    },
    { 
      label: "Pending Payment", 
      value: `PKR ${commissionData.pendingPayment.toLocaleString()}`, 
      icon: Calendar, 
      color: "text-orange-500" 
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commission Management</h1>
          <p className="text-gray-600">Track doctor referrals and commission payments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Doctor Commission Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Commission Overview</CardTitle>
          <CardDescription>Commission details for all referring doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {doctor.id}
                  </div>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                    <p className="text-xs text-gray-500">
                      {doctor.totalReferrals} referrals • {doctor.commissionRate} rate
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">PKR {doctor.totalCommission.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+PKR {doctor.thisMonth.toLocaleString()} this month</p>
                  <Badge variant={doctor.status === "active" ? "default" : "secondary"}>
                    {doctor.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Commission Transactions</CardTitle>
          <CardDescription>Latest commission transactions and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {transaction.id}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.doctor}</p>
                    <p className="text-sm text-gray-600">{transaction.patient} • {transaction.test}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">PKR {transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-green-600">Commission: PKR {transaction.commission.toLocaleString()}</p>
                  <Badge variant={transaction.status === "paid" ? "default" : "outline"}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionPage;
