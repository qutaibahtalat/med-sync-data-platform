
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Shield, Palette, Save } from "lucide-react";

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    name: "Dr. John Smith",
    email: "john.smith@hospital.com",
    phone: "+1 (555) 123-4567",
    department: "Cardiology",
    notifications: {
      email: true,
      sms: false,
      push: true,
      critical: true
    },
    privacy: {
      shareData: false,
      analytics: true,
      marketing: false
    },
    appearance: {
      theme: "light",
      language: "english",
      timezone: "UTC-5"
    }
  });

  const handleSave = () => {
    console.log("Settings saved:", userSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userSettings.name}
                onChange={(e) => setUserSettings({
                  ...userSettings,
                  name: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userSettings.email}
                onChange={(e) => setUserSettings({
                  ...userSettings,
                  email: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userSettings.phone}
                onChange={(e) => setUserSettings({
                  ...userSettings,
                  phone: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={userSettings.department} onValueChange={(value) =>
                setUserSettings({...userSettings, department: value})
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                  <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={userSettings.notifications.email}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  notifications: {...userSettings.notifications, email: checked}
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via text</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={userSettings.notifications.sms}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  notifications: {...userSettings.notifications, sms: checked}
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-600">Browser notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={userSettings.notifications.push}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  notifications: {...userSettings.notifications, push: checked}
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="critical-notifications">Critical Alerts</Label>
                <p className="text-sm text-gray-600">Urgent medical alerts</p>
              </div>
              <Switch
                id="critical-notifications"
                checked={userSettings.notifications.critical}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  notifications: {...userSettings.notifications, critical: checked}
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-data">Share Anonymized Data</Label>
                <p className="text-sm text-gray-600">Help improve research</p>
              </div>
              <Switch
                id="share-data"
                checked={userSettings.privacy.shareData}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  privacy: {...userSettings.privacy, shareData: checked}
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Usage Analytics</Label>
                <p className="text-sm text-gray-600">Help improve the system</p>
              </div>
              <Switch
                id="analytics"
                checked={userSettings.privacy.analytics}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  privacy: {...userSettings.privacy, analytics: checked}
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">Marketing Communications</Label>
                <p className="text-sm text-gray-600">Product updates and news</p>
              </div>
              <Switch
                id="marketing"
                checked={userSettings.privacy.marketing}
                onCheckedChange={(checked) => setUserSettings({
                  ...userSettings,
                  privacy: {...userSettings.privacy, marketing: checked}
                })}
              />
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance & Localization
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={userSettings.appearance.theme} onValueChange={(value) =>
                setUserSettings({
                  ...userSettings,
                  appearance: {...userSettings.appearance, theme: value}
                })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={userSettings.appearance.language} onValueChange={(value) =>
                setUserSettings({
                  ...userSettings,
                  appearance: {...userSettings.appearance, language: value}
                })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="german">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={userSettings.appearance.timezone} onValueChange={(value) =>
                setUserSettings({
                  ...userSettings,
                  appearance: {...userSettings.appearance, timezone: value}
                })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
