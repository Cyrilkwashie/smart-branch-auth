import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface ChequebookIssuance {
  requisitionNumber: string;
  accountNumber: string;
  accountName: string;
  leavesNumber: string;
  requisitionDate: string;
  postedBy: string;
  noOfBooks: number;
  endPage: string;
}

const ChequebookIssuance: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [issuanceData, setIssuanceData] = useState<ChequebookIssuance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load issuance data when account number is entered
  const loadIssuanceData = (accNumber: string) => {
    if (!accNumber.trim()) {
      setIssuanceData([]);
      setAccountName("");
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Auto-fill account name
      setAccountName(`Account Holder ${accNumber}`);

      // Mock issuance data
      const mockData: ChequebookIssuance[] = [
        {
          requisitionNumber: `REQ${accNumber.slice(-4)}001`,
          accountNumber: accNumber,
          accountName: `Account Holder ${accNumber}`,
          leavesNumber: "50",
          requisitionDate: "2024-01-15",
          postedBy: "Branch Officer",
          noOfBooks: 1,
          endPage: "050",
        },
        {
          requisitionNumber: `REQ${accNumber.slice(-4)}002`,
          accountNumber: accNumber,
          accountName: `Account Holder ${accNumber}`,
          leavesNumber: "100",
          requisitionDate: "2024-02-20",
          postedBy: "Customer Service",
          noOfBooks: 2,
          endPage: "100",
        },
        {
          requisitionNumber: `REQ${accNumber.slice(-4)}003`,
          accountNumber: accNumber,
          accountName: `Account Holder ${accNumber}`,
          leavesNumber: "50",
          requisitionDate: "2024-03-10",
          postedBy: "Branch Manager",
          noOfBooks: 1,
          endPage: "050",
        },
      ];
      setIssuanceData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    loadIssuanceData(value);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <SidebarTrigger />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Chequebook Issuance
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Account Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => handleAccountNumberChange(e.target.value)}
                        placeholder="Enter Account Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        value={accountName}
                        readOnly
                        className="bg-gray-50"
                        placeholder="Account Name"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chequebook Issuance Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Chequebook Issuance Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Requisition Number</TableHead>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead>Leaves Number</TableHead>
                          <TableHead>Requisition Date</TableHead>
                          <TableHead>Posted By</TableHead>
                          <TableHead>No of Books</TableHead>
                          <TableHead>End Page</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                              Loading chequebook issuance data...
                            </TableCell>
                          </TableRow>
                        ) : issuanceData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                              {accountNumber.trim() ? "No chequebook issuance records found for this account." : "Enter an Account Number to view issuance details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          issuanceData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.requisitionNumber}</TableCell>
                              <TableCell>{item.accountNumber}</TableCell>
                              <TableCell>{item.accountName}</TableCell>
                              <TableCell>{item.leavesNumber}</TableCell>
                              <TableCell>{item.requisitionDate}</TableCell>
                              <TableCell>{item.postedBy}</TableCell>
                              <TableCell>{item.noOfBooks}</TableCell>
                              <TableCell>{item.endPage}</TableCell>
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

export default ChequebookIssuance;
