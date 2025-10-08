import { Search, Filter, User, TrendingUp, Target } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const customers = [
  { name: "Jane Doe", account: "#123456", products: "Savings, Loan", balance: "$60K" },
  { name: "John Smith", account: "#789012", products: "Checking, Credit Card", balance: "$45K" },
  { name: "Sarah Wilson", account: "#345678", products: "Savings, Investment", balance: "$120K" },
];

const opportunities = [
  {
    customer: "John Smith",
    opportunity: "Cross-Sell: Mutual Fund",
    status: "Open",
    nextAction: "Call on Oct 7",
  },
  {
    customer: "Jane Doe",
    opportunity: "Upsell: Premium Credit Card",
    status: "In Progress",
    nextAction: "Send proposal",
  },
  {
    customer: "Sarah Wilson",
    opportunity: "Loan Refinancing",
    status: "Open",
    nextAction: "Schedule meeting",
  },
];

const CustomerRelationship = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Customer Relationship</h1>
                  <p className="text-sm text-muted-foreground">Manage customer interactions and opportunities</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Search & Filter Section */}
            <Card className="shadow-lg border-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="h-5 w-5 text-primary" />
                  Customer Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Search by name, phone, account number..."
                    className="flex-1 h-11"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48 h-11">
                      <SelectValue placeholder="Segment: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Segment: All</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="h-11 px-8">Search</Button>
                  <Button variant="outline" className="h-11 px-8">Clear</Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer 360° View */}
            <Card className="shadow-lg border-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-primary" />
                  Customer 360° View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10 hover:bg-primary/10">
                        <TableHead className="font-bold text-foreground">Name</TableHead>
                        <TableHead className="font-bold text-foreground">Account Number</TableHead>
                        <TableHead className="font-bold text-foreground">Products</TableHead>
                        <TableHead className="font-bold text-foreground text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer, index) => (
                        <TableRow key={index} className="hover:bg-muted/50 cursor-pointer transition-colors">
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell className="text-muted-foreground">{customer.account}</TableCell>
                          <TableCell>{customer.products}</TableCell>
                          <TableCell className="text-right font-semibold">{customer.balance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Row - Customer Insights & Lead Tracker */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Insights */}
              <Card className="shadow-lg border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm">
                      <span className="font-bold">Jane Doe:</span>{" "}
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                        Low Risk
                      </Badge>
                      {", "}
                      Profitability: <span className="font-semibold">$2K/year</span>, Engagement:{" "}
                      <span className="font-semibold">85/100</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm">
                      <span className="font-bold">John Smith:</span>{" "}
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20">
                        Medium Risk
                      </Badge>
                      {", "}
                      Profitability: <span className="font-semibold">$1.5K/year</span>, Engagement:{" "}
                      <span className="font-semibold">72/100</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <p className="text-sm">
                      <span className="font-bold">Sarah Wilson:</span>{" "}
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                        Low Risk
                      </Badge>
                      {", "}
                      Profitability: <span className="font-semibold">$5K/year</span>, Engagement:{" "}
                      <span className="font-semibold">92/100</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Lead & Opportunity Tracker */}
              <Card className="shadow-lg border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="h-5 w-5 text-primary" />
                    Lead & Opportunity Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-primary/10 hover:bg-primary/10">
                          <TableHead className="font-bold text-foreground">Customer</TableHead>
                          <TableHead className="font-bold text-foreground">Opportunity</TableHead>
                          <TableHead className="font-bold text-foreground">Status</TableHead>
                          <TableHead className="font-bold text-foreground">Next Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {opportunities.map((opp, index) => (
                          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{opp.customer}</TableCell>
                            <TableCell className="text-sm">{opp.opportunity}</TableCell>
                            <TableCell>
                              <Badge
                                variant={opp.status === "Open" ? "default" : "secondary"}
                                className="font-medium"
                              >
                                {opp.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{opp.nextAction}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default CustomerRelationship;
