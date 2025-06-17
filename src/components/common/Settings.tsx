
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Building, 
  DollarSign, 
  Globe, 
  Bell, 
  Shield,
  Save,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [labSettings, setLabSettings] = useState({
    labName: "MedSync Laboratory",
    address: "Block A, Gulberg III, Lahore",
    phone: "+92 42 123 4567",
    email: "info@medsynclab.com",
    website: "www.medsynclab.com",
    license: "LAB-PK-2024-001",
    currency: "PKR",
    timezone: "Asia/Karachi",
    defaultLanguage: "English"
  });

  const [pricingSettings, setPricingSettings] = useState({
    defaultCurrency: "PKR",
    taxRate: 17, // GST in Pakistan
    discountThreshold: 10000,
    bulkDiscountRate: 10,
    emergencyCharges: 500,
    homeCollectionCharges: 300
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    criticalAlerts: true,
    reportReady: true,
    appointmentReminders: true,
    systemMaintenance: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const currencies = [
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" }
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const settings = {
        lab: labSettings,
        pricing: pricingSettings,
        notifications: notificationSettings,
        updatedAt: new Date()
      };
      
      console.log("Settings saved:", settings);
      
      toast({
        title: "Settings Saved",
        description: "All settings have been updated successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage laboratory configuration and preferences</p>
          </div>
        </div>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Laboratory Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Laboratory Information
            </CardTitle>
            <CardDescription>Basic laboratory details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="labName">Laboratory Name</Label>
              <Input
                id="labName"
                value={labSettings.labName}
                onChange={(e) => setLabSettings({...labSettings, labName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
                value={labSettings.address}
                onChange={(e) => setLabSettings({...labSettings, address: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={labSettings.phone}
                  onChange={(e) => setLabSettings({...labSettings, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={labSettings.email}
                  onChange={(e) => setLabSettings({...labSettings, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={labSettings.website}
                  onChange={(e) => setLabSettings({...labSettings, website: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  value={labSettings.license}
                  onChange={(e) => setLabSettings({...labSettings, license: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing Configuration
            </CardTitle>
            <CardDescription>Currency and pricing settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <select
                id="defaultCurrency"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={pricingSettings.defaultCurrency}
                onChange={(e) => setPricingSettings({...pricingSettings, defaultCurrency: e.target.value})}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
              <Badge className="bg-green-100 text-green-800">
                Recommended: PKR for Pakistan
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={pricingSettings.taxRate}
                  onChange={(e) => setPricingSettings({...pricingSettings, taxRate: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bulkDiscountRate">Bulk Discount (%)</Label>
                <Input
                  id="bulkDiscountRate"
                  type="number"
                  value={pricingSettings.bulkDiscountRate}
                  onChange={(e) => setPricingSettings({...pricingSettings, bulkDiscountRate: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountThreshold">Discount Threshold (PKR)</Label>
              <Input
                id="discountThreshold"
                type="number"
                value={pricingSettings.discountThreshold}
                onChange={(e) => setPricingSettings({...pricingSettings, discountThreshold: parseFloat(e.target.value) || 0})}
              />
              <p className="text-sm text-gray-600">Orders above this amount get bulk discount</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyCharges">Emergency Charges (PKR)</Label>
                <Input
                  id="emergencyCharges"
                  type="number"
                  value={pricingSettings.emergencyCharges}
                  onChange={(e) => setPricingSettings({...pricingSettings, emergencyCharges: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeCollectionCharges">Home Collection (PKR)</Label>
                <Input
                  id="homeCollectionCharges"
                  type="number"
                  value={pricingSettings.homeCollectionCharges}
                  onChange={(e) => setPricingSettings({...pricingSettings, homeCollectionCharges: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Regional Settings
            </CardTitle>
            <CardDescription>Timezone and language preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={labSettings.timezone}
                onChange={(e) => setLabSettings({...labSettings, timezone: e.target.value})}
              >
                <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <select
                id="defaultLanguage"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={labSettings.defaultLanguage}
                onChange={(e) => setLabSettings({...labSettings, defaultLanguage: e.target.value})}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Currency Display Format</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <p>PKR 2,500.00 (Recommended for Pakistan)</p>
                <p>₨ 2,500.00 (Symbol format)</p>
                <p>2,500.00 PKR (Suffix format)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure alert and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <p className="text-sm text-gray-600">
                    {key === 'criticalAlerts' && 'Immediate alerts for critical test results'}
                    {key === 'emailNotifications' && 'General email notifications'}
                    {key === 'smsNotifications' && 'SMS alerts and updates'}
                    {key === 'reportReady' && 'Notify when reports are ready'}
                    {key === 'appointmentReminders' && 'Appointment reminder notifications'}
                    {key === 'systemMaintenance' && 'System maintenance notifications'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({...notificationSettings, [key]: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            System Information
          </CardTitle>
          <CardDescription>Current system status and version information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900">System Version</h4>
              <p className="text-2xl font-bold text-blue-600">v2.1.0</p>
              <p className="text-sm text-gray-600">Latest stable release</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900">Database Status</h4>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900">Last Backup</h4>
              <p className="text-lg font-semibold text-green-600">2 hours ago</p>
              <p className="text-sm text-gray-600">Auto-backup enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
