import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface DeceasedApprovalInfo {
  requisitionNumber: string;
  customerNumber: string;
  customerName: string;
  deathDate: string;
  claimAmount: string;
  requisitionDate: string;
  postedBy: string;
}

const DeceasedCustomerApproval: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [approvalData, setApprovalData] = useState<DeceasedApprovalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load approval data when customer number is entered
  const loadApprovalData = (custNumber: string) => {
    if (!custNumber.trim()) {
      setApprovalData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock approval data
      const mockData: DeceasedApprovalInfo[] = [
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}001`,
          customerNumber: custNumber,
          customerName: `John Doe - ${custNumber}`,
          deathDate: "2024-01-15",
          claimAmount: "₦500,000.00",
          requisitionDate: "2024-01-20",
          postedBy: "Branch Manager",
        },
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}002`,
          customerNumber: custNumber,
          customerName: `Jane Smith - ${custNumber}`,
          deathDate: "2024-02-10",
          claimAmount: "₦750,000.00",
          requisitionDate: "2024-02-15",
          postedBy: "Operations Officer",
        },
        {
          requisitionNumber: `REQ${custNumber.slice(-4)}003`,
          customerNumber: custNumber,
          customerName: `Bob Johnson - ${custNumber}`,
          deathDate: "2024-03-05",
          claimAmount: "₦1,200,000.00",
          requisitionDate: "2024-03-10",
          postedBy: "Customer Service",
        },
      ];
      setApprovalData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerNumberChange = (value: string) => {
    setCustomerNumber(value);
    loadApprovalData(value);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Deceased Customer Approval
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

              {/* Deceased Customer Approval Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Deceased Customer Approval Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Requisition Number</TableHead>
                          <TableHead>Customer Number</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Death Date</TableHead>
                          <TableHead>Claim Amount</TableHead>
                          <TableHead>Requisition Date</TableHead>
                          <TableHead>Posted By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              Loading approval data...
                            </TableCell>
                          </TableRow>
                        ) : approvalData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              {customerNumber.trim() ? "No deceased customer approval records found." : "Enter a Customer Number to view approval details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          approvalData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.requisitionNumber}</TableCell>
                              <TableCell>{item.customerNumber}</TableCell>
                              <TableCell>{item.customerName}</TableCell>
                              <TableCell>{item.deathDate}</TableCell>
                              <TableCell className="font-medium">{item.claimAmount}</TableCell>
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

export default DeceasedCustomerApproval;