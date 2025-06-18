import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/user";
import { Eye, EyeOff, User, Lock, Mail, Shield, Stethoscope, Microscope, FlaskConical } from "lucide-react";

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
    { 
      value: "lab-technician" as UserRole, 
      label: "Lab Technician", 
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: Microscope,
      description: "Manage samples & tests"
    },
    { 
      value: "doctor" as UserRole, 
      label: "Doctor", 
      color: "bg-gradient-to-r from-green-500 to-green-600",
      icon: Stethoscope,
      description: "Request tests & review results"
    },
    { 
      value: "patient" as UserRole, 
      label: "Patient", 
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      icon: User,
      description: "View reports & book appointments"
    },
    { 
      value: "researcher" as UserRole, 
      label: "Researcher", 
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      icon: FlaskConical,
      description: "Conduct studies & analyze data"
    }
  ];

  const handleLogin = () => {
    if (credentials.email && credentials.password) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden min-h-screen w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-lg relative z-10 backdrop-blur-sm bg-white/95 shadow-2xl border-0 max-h-[95vh] overflow-y-auto mx-auto">
        <CardHeader className="text-center space-y-4 pb-6 px-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent break-words">
              MedSync LMS
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-gray-600 break-words px-2">
              Advanced Laboratory Management System
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6 pb-6">
          {/* Role Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Your Role</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Button
                    key={role.value}
                    variant="outline"
                    className={`p-3 sm:p-4 h-auto border-2 transition-all duration-300 ${
                      selectedRole === role.value
                        ? `${role.color} text-white border-transparent shadow-lg scale-105`
                        : "hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedRole(role.value)}
                  >
                    <div className="text-center space-y-1 sm:space-y-2 w-full">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
                      <div className="space-y-1">
                        <p className="font-medium text-xs sm:text-sm leading-tight break-words">{role.label}</p>
                        <p className="text-[10px] sm:text-xs opacity-80 leading-tight break-words px-1">{role.description}</p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-2 focus:border-blue-500 transition-colors"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-12 h-12 border-2 focus:border-blue-500 transition-colors"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className={`w-full h-12 text-base font-semibold ${
              roles.find(r => r.value === selectedRole)?.color
            } hover:opacity-90 transition-all duration-300 shadow-lg`}
            onClick={handleLogin}
            disabled={!credentials.email || !credentials.password}
          >
            Login as {roles.find(r => r.value === selectedRole)?.label}
          </Button>

          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 text-center">
              <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 text-sm">
                Forgot Password?
              </Button>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={onShowSignup}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto font-semibold"
                >
                  Sign up here
                </Button>
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-gray-500 pt-4 border-t">
            <p className="mb-1">© 2024 MedSync Laboratory Management System</p>
            <p>
              Powered by{" "}
              <a href="https://mindspire.org" className="text-blue-600 hover:text-blue-800 font-medium">
                mindspire.org
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
