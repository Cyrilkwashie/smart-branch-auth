import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, TrendingUp, TrendingDown, Users, DollarSign, Calendar, AlertCircle, CheckCircle2, Clock, Cake } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
              {/* RM Profile Card */}
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-2xl font-bold">John Doe</h2>
                          <p className="text-muted-foreground">Relationship Manager</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <span className="text-muted-foreground">Branch:</span>
                            <span className="font-medium">Downtown Branch</span>
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center gap-1">
                            <span className="text-muted-foreground">ID:</span>
                            <span className="font-medium">RM-2024-001</span>
                          </span>
                        </div>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 border-0">
                          ⭐ Gold Performance Level
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                        <p className="text-3xl font-bold">150</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +8 this month
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                        <p className="text-3xl font-bold">$5.2M</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +12% growth
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Daily Target</p>
                        <p className="text-sm font-bold">80%</p>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-xs text-muted-foreground">4 of 5 goals achieved</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                        <p className="text-3xl font-bold">+12%</p>
                        <p className="text-xs text-green-600">vs last month</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Metrics */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b bg-muted/50">
                  <CardTitle className="text-lg">Key Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Deposits Book</p>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">$2.2M</p>
                      <Progress value={73} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Loans Book</p>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">$3.0M</p>
                      <Progress value={85} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">NPL Ratio</p>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">2.5%</p>
                      <p className="text-xs text-green-600">Within target</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Cross-Sell Rate</p>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold">15%</p>
                      <Progress value={15} className="h-1" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Fee Income</p>
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">$10K</p>
                      <p className="text-xs text-green-600">+5% vs target</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alerts & Notifications */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b bg-muted/50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Alerts & Notifications
                      <Badge variant="secondary" className="ml-auto">4</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Follow-up Required</p>
                          <p className="text-sm text-muted-foreground">Client meeting scheduled tomorrow at 10:00 AM</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900">
                        <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">KYC Update Pending</p>
                          <p className="text-sm text-muted-foreground">3 customers require document verification</p>
                          <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                        <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Loan Renewal Due</p>
                          <p className="text-sm text-muted-foreground">ABC Corp loan renewal in 5 days - $500K</p>
                          <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Cake className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">Customer Birthday</p>
                          <p className="text-sm text-muted-foreground">Jane Doe celebrates today - Send wishes</p>
                          <p className="text-xs text-muted-foreground mt-1">Today</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar & Tasks */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b bg-muted/50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                            14
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">2:00</div>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">Meeting with SME Client</p>
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">High Priority</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Discuss new loan application - $750K</p>
                          <p className="text-xs text-muted-foreground mt-2">📍 Conference Room B</p>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm mb-3">Pending Tasks</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="h-5 w-5 rounded border-2 border-muted-foreground"></div>
                            <div className="flex-1">
                              <p className="text-sm">Review 2 loan approvals</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Today</Badge>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="h-5 w-5 rounded border-2 border-muted-foreground"></div>
                            <div className="flex-1">
                              <p className="text-sm">Customer site visit - XYZ Ltd</p>
                            </div>
                            <Badge variant="outline" className="text-xs">Tomorrow</Badge>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="h-5 w-5 rounded border-2 border-muted-foreground"></div>
                            <div className="flex-1">
                              <p className="text-sm">Quarterly report submission</p>
                            </div>
                            <Badge variant="outline" className="text-xs">This Week</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
