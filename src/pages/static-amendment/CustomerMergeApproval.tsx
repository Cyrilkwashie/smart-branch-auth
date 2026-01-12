import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface MergeApprovalInfo {
  requestId: string;
  accountDescription: string;
  postedBy: string;
  accountLink: string;
  postingDate: string;
}

const CustomerMergeApproval: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [approvalData, setApprovalData] = useState<MergeApprovalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load approval data when account number is entered
  const loadApprovalData = (accNumber: string) => {
    if (!accNumber.trim()) {
      setApprovalData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock approval data
      const mockData: MergeApprovalInfo[] = [
        {
          requestId: `REQ${accNumber.slice(-4)}001`,
          accountDescription: `Primary Savings Account - ${accNumber}`,
          postedBy: "Admin User",
          accountLink: `LINK-${accNumber}-001`,
          postingDate: "2024-01-15",
        },
        {
          requestId: `REQ${accNumber.slice(-4)}002`,
          accountDescription: `Secondary Current Account - ${accNumber}`,
          postedBy: "System Admin",
          accountLink: `LINK-${accNumber}-002`,
          postingDate: "2024-02-10",
        },
        {
          requestId: `REQ${accNumber.slice(-4)}003`,
          accountDescription: `Fixed Deposit Account - ${accNumber}`,
          postedBy: "Branch Manager",
          accountLink: `LINK-${accNumber}-003`,
          postingDate: "2024-03-05",
        },
      ];
      setApprovalData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
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
                Customer Merge Approval
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Account Number Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={(e) => handleAccountNumberChange(e.target.value)}
                      placeholder="Enter Account Number"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Merge Approval Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Merge Approval Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Account Description</TableHead>
                          <TableHead>Posted By</TableHead>
                          <TableHead>Account Link</TableHead>
                          <TableHead>Posting Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              Loading approval data...
                            </TableCell>
                          </TableRow>
                        ) : approvalData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              {accountNumber.trim() ? "No merge approval data found for this account." : "Enter an Account Number to view merge approval details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          approvalData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.requestId}</TableCell>
                              <TableCell>{item.accountDescription}</TableCell>
                              <TableCell>{item.postedBy}</TableCell>
                              <TableCell className="text-blue-600">{item.accountLink}</TableCell>
                              <TableCell>{item.postingDate}</TableCell>
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

export default CustomerMergeApproval;