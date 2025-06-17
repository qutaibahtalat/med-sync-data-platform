
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ArrowLeft,
  Save,
  X,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  expiryDate?: Date;
  lastRestocked: Date;
  location: string;
}

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "INV001",
      name: "Blood Collection Tubes (EDTA)",
      category: "Consumables",
      currentStock: 250,
      minThreshold: 100,
      maxCapacity: 1000,
      unit: "pieces",
      costPerUnit: 15.00,
      supplier: "MedSupply Pakistan",
      expiryDate: new Date("2025-06-30"),
      lastRestocked: new Date("2024-01-10"),
      location: "Storage A1"
    },
    {
      id: "INV002",
      name: "Reagent Kit - CBC",
      category: "Reagents",
      currentStock: 45,
      minThreshold: 20,
      maxCapacity: 100,
      unit: "kits",
      costPerUnit: 850.00,
      supplier: "Bio-Tech Solutions",
      expiryDate: new Date("2024-12-15"),
      lastRestocked: new Date("2024-01-05"),
      location: "Refrigerator B2"
    },
    {
      id: "INV003",
      name: "Disposable Pipette Tips",
      category: "Consumables",
      currentStock: 15,
      minThreshold: 50,
      maxCapacity: 500,
      unit: "boxes",
      costPerUnit: 120.00,
      supplier: "Lab Equipment Co.",
      lastRestocked: new Date("2023-12-20"),
      location: "Storage A2"
    },
    {
      id: "INV004",
      name: "Quality Control Serum",
      category: "Quality Control",
      currentStock: 8,
      minThreshold: 5,
      maxCapacity: 25,
      unit: "vials",
      costPerUnit: 450.00,
      supplier: "QC Materials Ltd",
      expiryDate: new Date("2024-08-30"),
      lastRestocked: new Date("2024-01-12"),
      location: "Freezer C1"
    },
    {
      id: "INV005",
      name: "Microscope Slides",
      category: "Consumables",
      currentStock: 180,
      minThreshold: 100,
      maxCapacity: 500,
      unit: "pieces",
      costPerUnit: 5.00,
      supplier: "Glass Tech Pakistan",
      lastRestocked: new Date("2024-01-08"),
      location: "Storage A3"
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    currentStock: 0,
    minThreshold: 0,
    maxCapacity: 0,
    unit: "",
    costPerUnit: 0,
    supplier: "",
    location: ""
  });

  const categories = ["all", "Consumables", "Reagents", "Quality Control", "Equipment", "Chemicals"];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minThreshold);
  const expiringSoonItems = inventory.filter(item => 
    item.expiryDate && item.expiryDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    if (item.currentStock <= item.minThreshold) return { status: "low", color: "bg-red-500", textColor: "text-red-700" };
    if (percentage < 30) return { status: "medium", color: "bg-yellow-500", textColor: "text-yellow-700" };
    return { status: "good", color: "bg-green-500", textColor: "text-green-700" };
  };

  const getTotalValue = () => {
    return inventory.reduce((total, item) => total + (item.currentStock * item.costPerUnit), 0);
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const itemToAdd: InventoryItem = {
        id: `INV${(inventory.length + 1).toString().padStart(3, '0')}`,
        ...newItem,
        lastRestocked: new Date()
      };

      setInventory(prev => [...prev, itemToAdd]);
      
      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to inventory.`,
      });
      
      setNewItem({
        name: "",
        category: "",
        currentStock: 0,
        minThreshold: 0,
        maxCapacity: 0,
        unit: "",
        costPerUnit: 0,
        supplier: "",
        location: ""
      });
      setIsAddingItem(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateStock = (itemId: string, newStock: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, currentStock: newStock, lastRestocked: new Date() }
          : item
      )
    );
    
    toast({
      title: "Stock Updated",
      description: "Inventory has been updated successfully.",
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Item Deleted",
        description: "Item has been removed from inventory.",
      });
    }
  };

  if (isAddingItem) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setIsAddingItem(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
              <p className="text-gray-600">Add a new item to inventory</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Information</CardTitle>
            <CardDescription>Enter details for the new inventory item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  placeholder="Enter item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Reagents">Reagents</option>
                  <option value="Quality Control">Quality Control</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Chemicals">Chemicals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={newItem.currentStock}
                  onChange={(e) => setNewItem({...newItem, currentStock: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minThreshold">Min Threshold</Label>
                <Input
                  id="minThreshold"
                  type="number"
                  value={newItem.minThreshold}
                  onChange={(e) => setNewItem({...newItem, minThreshold: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  value={newItem.maxCapacity}
                  onChange={(e) => setNewItem({...newItem, maxCapacity: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  placeholder="e.g., pieces, boxes, vials"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="costPerUnit">Cost per Unit (PKR)</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  step="0.01"
                  value={newItem.costPerUnit}
                  onChange={(e) => setNewItem({...newItem, costPerUnit: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Storage A1, Refrigerator B2"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                placeholder="Enter supplier name"
                value={newItem.supplier}
                onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>
                <Save className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Track and manage laboratory supplies</p>
          </div>
        </div>
        <Button onClick={() => setIsAddingItem(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{expiringSoonItems.length}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">PKR {getTotalValue().toFixed(2)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {categories.map((category) => (
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

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage your laboratory inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => {
              const stockStatus = getStockStatus(item);
              const isExpiringSoon = item.expiryDate && item.expiryDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              
              return (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-xs text-gray-500">{item.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${stockStatus.textColor}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${stockStatus.color}`}></div>
                      </div>
                      <p className="text-xs text-gray-500">Min: {item.minThreshold}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Cost</p>
                      <p className="font-medium">PKR {item.costPerUnit}</p>
                      <p className="text-xs text-gray-500">per {item.unit}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Supplier</p>
                      <p className="font-medium text-sm">{item.supplier}</p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Expiry</p>
                      {item.expiryDate ? (
                        <p className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : ''}`}>
                          {item.expiryDate.toLocaleDateString()}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">N/A</p>
                      )}
                      {isExpiringSoon && (
                        <Badge variant="destructive" className="text-xs">Expiring Soon</Badge>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="font-medium">PKR {(item.currentStock * item.costPerUnit).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Stock"
                      onBlur={(e) => {
                        const newStock = parseInt(e.target.value);
                        if (newStock >= 0) {
                          handleUpdateStock(item.id, newStock);
                          e.target.value = "";
                        }
                      }}
                    />
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredInventory.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or add new items</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
