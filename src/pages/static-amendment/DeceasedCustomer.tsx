import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DeceasedCustomerInfo {
  customerNumber: string;
  customerDescription: string;
  deathDate: string;
  dateClaimLodge: string;
  dateSettlement: string;
  postedBy: string;
}

const DeceasedCustomer: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [flag, setFlag] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [deceasedCustomers, setDeceasedCustomers] = useState<DeceasedCustomerInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when customer number is entered
  const loadDeceasedCustomerData = (number: string) => {
    if (!number.trim()) {
      setDeceasedCustomers([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock deceased customer data
      const mockData: DeceasedCustomerInfo[] = [
        {
          customerNumber: `CUST${number}001`,
          customerDescription: `Savings Account - Customer ${number}`,
          deathDate: "2024-01-15",
          dateClaimLodge: "2024-01-20",
          dateSettlement: "2024-02-15",
          postedBy: "John Doe",
        },
        {
          customerNumber: `CUST${number}002`,
          customerDescription: `Current Account - Customer ${number}`,
          deathDate: "2024-02-10",
          dateClaimLodge: "2024-02-15",
          dateSettlement: "2024-03-10",
          postedBy: "Jane Smith",
        },
        {
          customerNumber: `CUST${number}003`,
          customerDescription: `Fixed Deposit - Customer ${number}`,
          deathDate: "2024-03-05",
          dateClaimLodge: "2024-03-10",
          dateSettlement: "2024-04-05",
          postedBy: "Bob Johnson",
        },
      ];
      setDeceasedCustomers(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerNumberChange = (value: string) => {
    setCustomerNumber(value);
    loadDeceasedCustomerData(value);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Deceased Customer Enquiry
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter Customer Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flag">Flag</Label>
                      <Select value={flag} onValueChange={setFlag}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Flag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deathDate">Death Date</Label>
                      <Input
                        id="deathDate"
                        type="date"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deceased Customer Enquiry Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Deceased Customer Enquiry Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer Number</TableHead>
                          <TableHead>Customer Description</TableHead>
                          <TableHead>Death Date</TableHead>
                          <TableHead>Date Claim Lodge</TableHead>
                          <TableHead>Date Settlement</TableHead>
                          <TableHead>Posted By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              Loading deceased customer data...
                            </TableCell>
                          </TableRow>
                        ) : deceasedCustomers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              {customerNumber.trim() ? "No deceased customer records found for this number." : "Enter a Customer Number to view enquiry results."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          deceasedCustomers.map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{customer.customerNumber}</TableCell>
                              <TableCell>{customer.customerDescription}</TableCell>
                              <TableCell>{customer.deathDate}</TableCell>
                              <TableCell>{customer.dateClaimLodge}</TableCell>
                              <TableCell>{customer.dateSettlement}</TableCell>
                              <TableCell>{customer.postedBy}</TableCell>
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

export default DeceasedCustomer;