import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Cake,
  Award,
  Target,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Dashboard Overview</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, Cyril!
              </p>
            </div>
          </AppHeader>

          <main className="flex-1 p-6 overflow-auto">
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* RM Profile Card - Left Side */}
                <div className="lg:col-span-3">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow min-h-[550px] flex flex-col">
                    <div className="relative flex-1">
                      {/* Header Background */}
                      <div className="h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600"></div>

                      {/* Profile Content */}
                      <div className="px-6 pb-6 flex-1">
                        {/* Avatar */}
                        <div className="relative -mt-12 mb-4">
                          <div className="relative inline-block">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80" />
                              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                JD
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 rounded-full border-4 border-background"></div>
                          </div>
                        </div>

                        {/* Profile Info */}
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold">Cyril Kwashie</h2>
                            <p className="text-sm text-muted-foreground">
                              Relationship Manager
                            </p>
                          </div>

                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950 hover:from-yellow-500 hover:to-yellow-600 border-0 shadow-sm">
                            <Award className="h-3 w-3 mr-1" />
                            Gold Performance
                          </Badge>

                          <Separator />

                          {/* Contact Info */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Branch
                                </p>
                                <p className="font-medium">Downtown Branch</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                                <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Employee ID
                                </p>
                                <p className="font-medium">RM-2024-001</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                                <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Email
                                </p>
                                <p className="font-medium text-xs">
                                  cyril.kwashie@smartbranch.com
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                                <Phone className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  Phone
                                </p>
                                <p className="font-medium">+1 (555) 123-4567</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Main Content - Right Side */}
                <div className="lg:col-span-9 space-y-6">
                  {/* Performance Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                              Total Customers
                            </p>
                            <p className="text-3xl font-bold">150</p>
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="font-medium">+8</span>
                              <span className="text-muted-foreground">
                                this month
                              </span>
                            </div>
                          </div>
                          <div className="h-12 w-12 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                              Portfolio Value
                            </p>
                            <p className="text-3xl font-bold">$5.2M</p>
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="font-medium">+12%</span>
                              <span className="text-muted-foreground">
                                growth
                              </span>
                            </div>
                          </div>
                          <div className="h-12 w-12 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">
                              Daily Target Achievement
                            </p>
                            <p className="text-2xl font-bold">80%</p>
                          </div>
                          <div className="space-y-2">
                            <Progress value={80} className="h-3" />
                            <p className="text-xs text-muted-foreground">
                              4 of 5 goals completed today
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <p className="text-sm font-medium text-muted-foreground">
                              Revenue Growth
                            </p>
                            <p className="text-3xl font-bold">+12%</p>
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-muted-foreground">
                                vs last month
                              </span>
                            </div>
                          </div>
                          <div className="h-12 w-12 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Financial Metrics */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-muted/20">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Key Financial Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Deposits
                            </p>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-2xl font-bold">$2.2M</p>
                          <Progress value={73} className="h-2" />
                          <p className="text-xs text-green-600">
                            +5.2% vs target
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Loans
                            </p>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                          </div>
                          <p className="text-2xl font-bold">$3.0M</p>
                          <Progress value={85} className="h-2" />
                          <p className="text-xs text-green-600">
                            +8.5% vs target
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              NPL Ratio
                            </p>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-2xl font-bold">2.5%</p>
                          <div className="h-2 w-full bg-green-100 dark:bg-green-950 rounded-full"></div>
                          <p className="text-xs text-green-600">
                            Within limits
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Cross-Sell
                            </p>
                            <Target className="h-4 w-4 text-purple-500" />
                          </div>
                          <p className="text-2xl font-bold">15%</p>
                          <Progress value={60} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            60% of target
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Fee Income
                            </p>
                            <DollarSign className="h-4 w-4 text-green-500" />
                          </div>
                          <p className="text-2xl font-bold">$10K</p>
                          <Progress value={105} className="h-2" />
                          <p className="text-xs text-green-600">
                            +5% vs target
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alerts & Notifications */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="border-b bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5 text-red-600" />
                      Alerts & Notifications
                      <Badge className="ml-auto bg-red-500 hover:bg-red-600">
                        4 New
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10 border border-blue-200 dark:border-blue-900 hover:shadow-md transition-all cursor-pointer">
                        <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1">
                            Follow-up Required
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Client meeting scheduled tomorrow at 10:00 AM
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />2 hours ago
                          </p>
                        </div>
                      </div>

                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-950/30 dark:to-orange-950/10 border border-orange-200 dark:border-orange-900 hover:shadow-md transition-all cursor-pointer">
                        <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1">
                            KYC Update Pending
                          </p>
                          <p className="text-sm text-muted-foreground">
                            3 customers require document verification
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />5 hours ago
                          </p>
                        </div>
                      </div>

                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/30 dark:to-red-950/10 border border-red-200 dark:border-red-900 hover:shadow-md transition-all cursor-pointer">
                        <Clock className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1">
                            Loan Renewal Due
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ABC Corp loan renewal in 5 days - $500K
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />1 day ago
                          </p>
                        </div>
                      </div>

                      <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/10 border border-green-200 dark:border-green-900 hover:shadow-md transition-all cursor-pointer">
                        <Cake className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1">
                            Customer Birthday
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Jane Doe celebrates today - Send wishes
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Today
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar & Tasks */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Today's Meeting */}
                      <div className="relative">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex flex-col items-center justify-center font-bold shadow-lg">
                              <span className="text-xs">Jan</span>
                              <span className="text-xl">14</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2 font-medium">
                              2:00 PM
                            </div>
                          </div>
                          <div className="flex-1 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-semibold">
                                Meeting with SME Client
                              </p>
                              <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-sm">
                                High
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Discuss new loan application - $750K
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Conference Room B
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />1 hour
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Pending Tasks */}
                      <div>
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          Pending Tasks
                        </h4>
                        <div className="space-y-2">
                          <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20">
                            <div className="h-5 w-5 rounded border-2 border-primary group-hover:bg-primary/10 transition-colors"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Review 2 loan approvals
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            >
                              Today
                            </Badge>
                          </div>
                          <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20">
                            <div className="h-5 w-5 rounded border-2 border-primary group-hover:bg-primary/10 transition-colors"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Customer site visit - XYZ Ltd
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                            >
                              Tomorrow
                            </Badge>
                          </div>
                          <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all cursor-pointer border border-transparent hover:border-primary/20">
                            <div className="h-5 w-5 rounded border-2 border-primary group-hover:bg-primary/10 transition-colors"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                Quarterly report submission
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                            >
                              This Week
                            </Badge>
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
