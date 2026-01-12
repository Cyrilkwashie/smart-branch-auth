import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface MDACodeInfo {
  accountNumber: string;
  accountName: string;
  organisationCode: string;
}

const CustomerMDACodeTagging: React.FC = () => {
  const [customer, setCustomer] = useState("");
  const [mdaCodeExisting, setMdaCodeExisting] = useState("");
  const [mdaCodeNew, setMdaCodeNew] = useState("");
  const [mdaData, setMdaData] = useState<MDACodeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when customer is entered
  const loadMdaData = (customerValue: string) => {
    if (!customerValue.trim()) {
      setMdaData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock MDA code data
      const mockData: MDACodeInfo[] = [
        {
          accountNumber: "1234567890",
          accountName: `Savings Account - ${customerValue}`,
          organisationCode: "MDA001",
        },
        {
          accountNumber: "0987654321",
          accountName: `Current Account - ${customerValue}`,
          organisationCode: "MDA002",
        },
        {
          accountNumber: "1122334455",
          accountName: `Fixed Deposit - ${customerValue}`,
          organisationCode: "MDA003",
        },
      ];
      setMdaData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerChange = (value: string) => {
    setCustomer(value);
    loadMdaData(value);
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
                Customer MDA Code Tagging
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* MDA Code Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">MDA Code Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Customer</Label>
                      <Input
                        id="customer"
                        value={customer}
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        placeholder="Enter Customer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mdaCodeExisting">MDA Code (Existing)</Label>
                      <Input
                        id="mdaCodeExisting"
                        value={mdaCodeExisting}
                        onChange={(e) => setMdaCodeExisting(e.target.value)}
                        placeholder="Enter Existing MDA Code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mdaCodeNew">MDA Code (New)</Label>
                      <Input
                        id="mdaCodeNew"
                        value={mdaCodeNew}
                        onChange={(e) => setMdaCodeNew(e.target.value)}
                        placeholder="Enter New MDA Code"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* MDA Code Tagging Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">MDA Code Tagging Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead>Organisation Code</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                              Loading MDA code data...
                            </TableCell>
                          </TableRow>
                        ) : mdaData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                              {customer.trim() ? "No MDA code data found for this customer." : "Enter a Customer to view MDA code information."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          mdaData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.accountNumber}</TableCell>
                              <TableCell>{item.accountName}</TableCell>
                              <TableCell>{item.organisationCode}</TableCell>
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

export default CustomerMDACodeTagging;