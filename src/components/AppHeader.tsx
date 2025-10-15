import { Bell, AlertTriangle, CheckCircle, Info, X, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AppHeaderProps {
  children?: React.ReactNode;
}

// Sample notification data
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Account Verification Required",
    message: "Customer account #12345 requires additional verification documents.",
    time: "2 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "success",
    title: "Transaction Completed",
    message: "Transfer of $2,500 to account #67890 has been processed successfully.",
    time: "15 minutes ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.",
    time: "1 hour ago",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "alert",
    title: "Suspicious Activity Detected",
    message: "Unusual login attempts detected on account #54321.",
    time: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 5,
    type: "success",
    title: "New Account Created",
    message: "Joint account for John and Jane Doe has been successfully created.",
    time: "3 hours ago",
    read: true,
    priority: "medium",
  },
];

const AppHeader = ({ children }: AppHeaderProps) => {
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {children}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors group">
              <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-96 max-w-[calc(100vw-2rem)] max-h-[70vh] p-0 shadow-xl border-2 sm:w-96"
            align="start"
            side="bottom"
            sideOffset={8}
          >
            <div className="p-3 sm:p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <h3 className="font-semibold text-base sm:text-lg">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-7 px-2 hidden sm:flex"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
            </div>
            <ScrollArea className="max-h-[50vh]">
              <div className="p-2">
                {notificationList.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No notifications yet</p>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notificationList.map((notification) => (
                      <div
                        key={notification.id}
                        className={`relative p-3 rounded-lg transition-all duration-200 hover:bg-accent/50 ${
                          !notification.read
                            ? 'bg-primary/5 border-l-2 border-primary'
                            : 'bg-card'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`text-sm font-medium leading-tight ${
                                !notification.read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1.5 py-0.5 ${getPriorityColor(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {notification.time}
                                </div>
                              </div>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 px-2 text-xs opacity-70 hover:opacity-100 hidden sm:flex"
                                >
                                  Mark read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            {notificationList.length > 0 && (
              <div className="p-3 border-t bg-muted/30">
                <Button variant="outline" size="sm" className="w-full text-sm">
                  View All Notifications
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default AppHeader;
