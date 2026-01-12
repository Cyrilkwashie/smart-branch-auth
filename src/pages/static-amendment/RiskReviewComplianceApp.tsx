import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface RiskReviewComplianceInfo {
  requisitionNumber: string;
  customerNumber: string;
  accountName: string;
  risk: string;
  requisitionDate: string;
  postedBy: string;
}

const RiskReviewComplianceApp: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [complianceData, setComplianceData] = useState<RiskReviewComplianceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load compliance data when customer number is entered
  const loadComplianceData = (custNumber: string) => {
    if (!custNumber.trim()) {
      setComplianceData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock compliance data
      const mockData: RiskReviewComplianceInfo[] = [
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}001`,
          customerNumber: custNumber,
          accountName: `Savings Account - ${custNumber}`,
          risk: "Low",
          requisitionDate: "2024-01-15",
          postedBy: "Admin User",
        },
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}002`,
          customerNumber: custNumber,
          accountName: `Current Account - ${custNumber}`,
          risk: "Medium",
          requisitionDate: "2024-02-10",
          postedBy: "System Admin",
        },
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}003`,
          customerNumber: custNumber,
          accountName: `Fixed Deposit - ${custNumber}`,
          risk: "High",
          requisitionDate: "2024-03-05",
          postedBy: "Branch Manager",
        },
      ];
      setComplianceData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerNumberChange = (value: string) => {
    setCustomerNumber(value);
    loadComplianceData(value);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Risk Review Compliance App
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Customer Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerNumber">Customer Number</Label>
                      <Input
                        id="customerNumber"
                        value={customerNumber}
                        onChange={(e) => handleCustomerNumberChange(e.target.value)}
                        placeholder="Enter Customer Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select value={branch} onValueChange={setBranch}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">001</SelectItem><SelectItem value="002">002</SelectItem><SelectItem value="003">003</SelectItem><SelectItem value="004">004</SelectItem><SelectItem value="005">005</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Review Compliance Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Risk Review Compliance Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Requisition Number</TableHead>
                          <TableHead>Customer Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead>Risk</TableHead>
                          <TableHead>Requisition Date</TableHead>
                          <TableHead>Posted By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              Loading compliance data...
                            </TableCell>
                          </TableRow>
                        ) : complianceData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              {customerNumber.trim() ? "No risk review compliance data found for this customer." : "Enter a Customer Number to view risk review compliance details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          complianceData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.requisitionNumber}</TableCell>
                              <TableCell>{item.customerNumber}</TableCell>
                              <TableCell>{item.accountName}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.risk === 'Low'
                                    ? 'bg-green-100 text-green-800'
                                    : item.risk === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.risk}
                                </span>
                              </TableCell>
                              <TableCell>{item.requisitionDate}</TableCell>
                              <TableCell>{item.postedBy}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RiskReviewComplianceApp;