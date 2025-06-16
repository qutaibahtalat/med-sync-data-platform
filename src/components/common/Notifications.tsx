
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info, CheckCircle, X, MarkAsRead } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "N001",
      type: "critical",
      title: "Critical Test Result",
      message: "Patient John Doe has abnormal cardiac markers requiring immediate attention.",
      timestamp: new Date("2024-01-15T10:30:00"),
      read: false,
      category: "medical"
    },
    {
      id: "N002",
      type: "info",
      title: "Equipment Maintenance Due",
      message: "Centrifuge #3 is due for maintenance within 7 days.",
      timestamp: new Date("2024-01-15T09:15:00"),
      read: false,
      category: "equipment"
    },
    {
      id: "N003",
      type: "success",
      title: "Test Results Approved",
      message: "Lipid panel for patient Jane Smith has been approved and sent.",
      timestamp: new Date("2024-01-15T08:45:00"),
      read: true,
      category: "results"
    },
    {
      id: "N004",
      type: "warning",
      title: "Low Inventory Alert",
      message: "Blood collection tubes are running low (15 remaining).",
      timestamp: new Date("2024-01-14T16:20:00"),
      read: false,
      category: "inventory"
    },
    {
      id: "N005",
      type: "info",
      title: "New Study Proposal",
      message: "Research study 'Diabetes Biomarkers' has been submitted for review.",
      timestamp: new Date("2024-01-14T14:30:00"),
      read: true,
      category: "research"
    },
    {
      id: "N006",
      type: "success",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Johnson on Jan 20 has been confirmed.",
      timestamp: new Date("2024-01-14T11:15:00"),
      read: false,
      category: "appointments"
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info": return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "default";
      case "success": return "secondary";
      case "info": return "outline";
      default: return "outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical": return "bg-red-100 text-red-800";
      case "equipment": return "bg-purple-100 text-purple-800";
      case "results": return "bg-green-100 text-green-800";
      case "inventory": return "bg-yellow-100 text-yellow-800";
      case "research": return "bg-blue-100 text-blue-800";
      case "appointments": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? {...notification, read: true}
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({...notification, read: true}))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All notifications read"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead}>
            <MarkAsRead className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      <Badge variant={getNotificationBadge(notification.type) as any}>
                        {notification.type}
                      </Badge>
                      <Badge className={getCategoryColor(notification.category)}>
                        {notification.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
