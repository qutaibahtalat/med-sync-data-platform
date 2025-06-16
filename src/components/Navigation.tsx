
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/user";
import { CurrentView } from "@/pages/Index";
import { 
  LogOut, 
  Settings, 
  Bell,
  Home
} from "lucide-react";

interface NavigationProps {
  currentRole: UserRole;
  onLogout: () => void;
  onViewChange: (view: CurrentView) => void;
  currentView: CurrentView;
}

const Navigation = ({ currentRole, onLogout, onViewChange, currentView }: NavigationProps) => {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "lab-technician": return "bg-blue-500";
      case "doctor": return "bg-green-500";
      case "patient": return "bg-purple-500";
      case "researcher": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case "lab-technician": return "Lab Technician";
      case "doctor": return "Doctor";
      case "patient": return "Patient";
      case "researcher": return "Researcher";
      default: return "User";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              onClick={() => onViewChange("dashboard")}
              className="flex items-center space-x-2"
            >
              <Home className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">MedSync LMS</h2>
            </Button>
          </div>
          <Badge className={`${getRoleColor(currentRole)} text-white`}>
            {getRoleDisplayName(currentRole)}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange("notifications")}
            className={currentView === "notifications" ? "bg-gray-100" : ""}
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewChange("settings")}
            className={currentView === "settings" ? "bg-gray-100" : ""}
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
