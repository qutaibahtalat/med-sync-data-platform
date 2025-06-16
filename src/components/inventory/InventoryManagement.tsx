
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { InventoryItem } from "@/types/inventory";
import { Search, Plus, AlertTriangle, Package, TrendingDown, Calendar } from "lucide-react";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const mockInventory: InventoryItem[] = [
    {
      id: "INV001",
      name: "CBC Reagent Kit",
      category: "reagent",
      sku: "REG-CBC-001",
      currentStock: 25,
      minimumStock: 10,
      unit: "kit",
      costPerUnit: 45.50,
      supplier: "MedSupply Corp",
      expiryDate: new Date("2024-06-15"),
      batchNumber: "BCH240115",
      location: "Reagent Fridge A1",
      status: "in_stock",
      lastUpdated: new Date("2024-01-15")
    },
    {
      id: "INV002",
      name: "Blood Collection Tubes",
      category: "consumable",
      sku: "CON-BCT-002",
      currentStock: 5,
      minimumStock: 20,
      unit: "box",
      costPerUnit: 12.30,
      supplier: "LabTech Solutions",
      location: "Storage Room B2",
      status: "low_stock",
      lastUpdated: new Date("2024-01-14")
    },
    {
      id: "INV003",
      name: "Glucose Control Solution",
      category: "control",
      sku: "CTL-GLC-003",
      currentStock: 0,
      minimumStock: 5,
      unit: "vial",
      costPerUnit: 23.75,
      supplier: "Quality Controls Inc",
      expiryDate: new Date("2024-01-10"),
      batchNumber: "QC240105",
      location: "Control Storage C1",
      status: "expired",
      lastUpdated: new Date("2024-01-13")
    },
    {
      id: "INV004",
      name: "Latex Gloves",
      category: "consumable",
      sku: "CON-GLV-004",
      currentStock: 150,
      minimumStock: 50,
      unit: "box",
      costPerUnit: 8.90,
      supplier: "Safety First Supplies",
      location: "Storage Room B1",
      status: "in_stock",
      lastUpdated: new Date("2024-01-15")
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-green-100 text-green-800";
      case "low_stock": return "bg-yellow-100 text-yellow-800";
      case "out_of_stock": return "bg-red-100 text-red-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reagent": return <Package className="w-4 h-4" />;
      case "consumable": return <Package className="w-4 h-4" />;
      case "control": return <TrendingDown className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getDaysUntilExpiry = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    totalItems: mockInventory.length,
    lowStock: mockInventory.filter(item => item.status === "low_stock").length,
    expired: mockInventory.filter(item => item.status === "expired").length,
    expiringThisWeek: mockInventory.filter(item => {
      const days = getDaysUntilExpiry(item.expiryDate);
      return days !== null && days >= 0 && days <= 7;
    }).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track supplies and manage stock levels</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring This Week</p>
                <p className="text-2xl font-bold text-orange-600">{stats.expiringThisWeek}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "reagent", "consumable", "control", "equipment"].map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInventory.map((item) => {
          const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
          
          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Supplier: {item.supplier}</p>
                      <p className="text-sm text-gray-500">Location: {item.location}</p>
                      {item.batchNumber && (
                        <p className="text-sm text-gray-500">Batch: {item.batchNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                    
                    <div className="text-sm">
                      <p className="font-medium">
                        Stock: {item.currentStock} {item.unit}
                      </p>
                      <p className="text-gray-600">
                        Min: {item.minimumStock} {item.unit}
                      </p>
                      <p className="text-gray-600">
                        ${item.costPerUnit.toFixed(2)} per {item.unit}
                      </p>
                    </div>

                    {item.expiryDate && (
                      <div className="text-sm">
                        <p className="text-gray-600">
                          Expires: {item.expiryDate.toLocaleDateString()}
                        </p>
                        {daysUntilExpiry !== null && (
                          <p className={`font-medium ${
                            daysUntilExpiry < 0 ? 'text-red-600' : 
                            daysUntilExpiry <= 7 ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>
                            {daysUntilExpiry < 0 
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                              : daysUntilExpiry === 0 
                              ? 'Expires today'
                              : `${daysUntilExpiry} days remaining`
                            }
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      Update Stock
                    </Button>
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryManagement;
