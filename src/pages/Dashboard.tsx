import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">🧠 SMART BRANCH – RM DASHBOARD</h1>
            </div>

            {/* RM Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👤 RM Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Branch: Downtown Branch</p>
                    <p className="text-muted-foreground">Role: Relationship Manager</p>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Performance Level: Gold</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Performance Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">150</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Portfolio Value</p>
                    <p className="text-2xl font-bold">$5.2M</p>
                    <p className="text-xs text-muted-foreground">Loans: $3M, Deposits: $2.2M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Daily Targets</p>
                    <p className="text-2xl font-bold text-green-500">80% Achieved</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Monthly Revenue Growth</p>
                    <p className="text-2xl font-bold text-green-500">+12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Financial Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💰 Key Financial Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Deposits Book</p>
                    <p className="text-xl font-bold">$2.2M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Loans Book</p>
                    <p className="text-xl font-bold">$3M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">NPL Ratio</p>
                    <p className="text-xl font-bold">2.5%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cross-Sell Rate</p>
                    <p className="text-xl font-bold">15%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fee Income</p>
                    <p className="text-xl font-bold">$10K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alerts & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔔 Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Follow-up</p>
                        <p className="text-sm text-muted-foreground">Client meeting tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Bell className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium">KYC Update</p>
                        <p className="text-sm text-muted-foreground">3 customers pending</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Bell className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Loan Renewal</p>
                        <p className="text-sm text-muted-foreground">Due in 5 days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Bell className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Customer Birthday</p>
                        <p className="text-sm text-muted-foreground">Jane Doe, today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar & Task List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📅 Calendar & Task List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Today</p>
                        <p className="text-sm text-muted-foreground">Meeting with SME Client at 2 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Pending</p>
                        <p className="text-sm text-muted-foreground">2 approvals, 1 customer visit</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
