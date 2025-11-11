import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CustomerMapping {
  customerId: string;
  accountDescription: string;
  amount: string;
  noOfAccounts: number;
}

const CustomerMappingEnquiry: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [mappings, setMappings] = useState<CustomerMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load customer mappings based on customer number
  const loadCustomerMappings = (number: string) => {
    if (!number.trim()) {
      setMappings([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data based on customer number
      const mockData: CustomerMapping[] = [
        {
          customerId: `CUST${number}001`,
          accountDescription: `Savings Account - Customer ${number}`,
          amount: "₦500,000.00",
          noOfAccounts: 3,
        },
        {
          customerId: `CUST${number}002`,
          accountDescription: `Current Account - Customer ${number}`,
          amount: "₦750,000.00",
          noOfAccounts: 2,
        },
        {
          customerId: `CUST${number}003`,
          accountDescription: `Fixed Deposit - Customer ${number}`,
          amount: "₦1,200,000.00",
          noOfAccounts: 1,
        },
      ];
      setMappings(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerNumberChange = (value: string) => {
    setCustomerNumber(value);
    loadCustomerMappings(value);
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
                Customer Mapping Enquiry
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Customer Number Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <Label htmlFor="customerNumber">Customer Number</Label>
                    <Input
                      id="customerNumber"
                      value={customerNumber}
                      onChange={(e) => handleCustomerNumberChange(e.target.value)}
                      placeholder="Enter Customer Number"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Mapping Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Mapping Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Account Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>No of Accounts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                              Loading customer mappings...
                            </TableCell>
                          </TableRow>
                        ) : mappings.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                              {customerNumber.trim() ? "No customer mappings found for this number." : "Enter a Customer Number to view mapping details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          mappings.map((mapping, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{mapping.customerId}</TableCell>
                              <TableCell>{mapping.accountDescription}</TableCell>
                              <TableCell className="font-medium">{mapping.amount}</TableCell>
                              <TableCell className="text-center">{mapping.noOfAccounts}</TableCell>
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

export default CustomerMappingEnquiry;