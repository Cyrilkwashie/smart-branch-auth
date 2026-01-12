import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CustomerTypeInfo {
  customerId: string;
  customerName: string;
  dobDoi: string;
  contactNumber: string;
  branch: string;
  createdBy: string;
  customerType: string;
}

const CustomerTypeRetagging: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerData, setCustomerData] = useState<CustomerTypeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when customer ID is entered
  const loadCustomerData = (id: string) => {
    if (!id.trim()) {
      setCustomerData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock customer type data
      const mockData: CustomerTypeInfo[] = [
        {
          customerId: `CUST${id}001`,
          customerName: `John ${id} Doe`,
          dobDoi: "1990-05-15",
          contactNumber: "+234-801-234-5678",
          branch: "001",
          createdBy: "Admin User",
          customerType: "Individual",
        },
        {
          customerId: `CUST${id}002`,
          customerName: `Jane ${id} Smith`,
          dobDoi: "1985-08-22",
          contactNumber: "+234-802-345-6789",
          branch: "002",
          createdBy: "System Admin",
          customerType: "Corporate",
        },
        {
          customerId: `CUST${id}003`,
          customerName: `Bob ${id} Johnson`,
          dobDoi: "1992-12-03",
          contactNumber: "+234-803-456-7890",
          branch: "003",
          createdBy: "Branch Manager",
          customerType: "Individual",
        },
      ];
      setCustomerData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    loadCustomerData(value);
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
                Customer Type Retagging
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerId">Customer ID</Label>
                      <Input
                        id="customerId"
                        value={customerId}
                        onChange={(e) => handleCustomerIdChange(e.target.value)}
                        placeholder="Enter Customer ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchNumber">Branch Number</Label>
                      <Select value={branchNumber} onValueChange={setBranchNumber}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch Number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="001">001</SelectItem>
                          <SelectItem value="002">002</SelectItem>
                          <SelectItem value="003">003</SelectItem>
                          <SelectItem value="004">004</SelectItem>
                          <SelectItem value="005">005</SelectItem>
                        </SelectContent>
                      </Select>
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
                  </div>
                </CardContent>
              </Card>

              {/* Customer Type Information Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Type Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>DOB/DOI</TableHead>
                          <TableHead>Contact Number</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Customer Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              Loading customer type data...
                            </TableCell>
                          </TableRow>
                        ) : customerData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              {customerId.trim() ? "No customer type data found for this ID." : "Enter a Customer ID to view customer type information."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          customerData.map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{customer.customerId}</TableCell>
                              <TableCell>{customer.customerName}</TableCell>
                              <TableCell>{customer.dobDoi}</TableCell>
                              <TableCell>{customer.contactNumber}</TableCell>
                              <TableCell>{customer.branch}</TableCell>
                              <TableCell>{customer.createdBy}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  customer.customerType === 'Individual'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {customer.customerType}
                                </span>
                              </TableCell>
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

export default CustomerTypeRetagging;