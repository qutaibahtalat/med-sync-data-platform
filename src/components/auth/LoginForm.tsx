
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/user";
import { Eye, EyeOff, User, Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
  onShowSignup: () => void;
}

const LoginForm = ({ onLogin, onShowSignup }: LoginFormProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const roles = [
    { value: "lab-technician" as UserRole, label: "Lab Technician", color: "bg-blue-500" },
    { value: "doctor" as UserRole, label: "Doctor", color: "bg-green-500" },
    { value: "patient" as UserRole, label: "Patient", color: "bg-purple-500" },
    { value: "researcher" as UserRole, label: "Researcher", color: "bg-orange-500" }
  ];

  const handleLogin = () => {
    // Mock authentication - in real app would validate credentials
    if (credentials.email && credentials.password) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">MedSync LMS</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Select Role</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <Button
                  key={role.value}
                  variant={selectedRole === role.value ? "default" : "outline"}
                  className="p-3 h-auto"
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="text-center">
                    <Badge className={`${role.color} text-white mb-1`}>
                      {role.label}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleLogin}
            disabled={!credentials.email || !credentials.password}
          >
            Login as {roles.find(r => r.value === selectedRole)?.label}
          </Button>

          <div className="text-center space-y-2">
            <Button variant="link" size="sm">
              Forgot Password?
            </Button>
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Button variant="link" size="sm" onClick={onShowSignup}>
                Sign up
              </Button>
            </div>
          </div>

          <div className="text-xs text-center text-gray-500 mt-4">
            Powered by{" "}
            <a href="https://mindspire.org" className="text-blue-600 hover:text-blue-800">
              mindspire.org
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
