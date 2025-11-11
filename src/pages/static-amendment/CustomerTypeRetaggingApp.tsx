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
  postingDate: string;
  postedBy: string;
}

const CustomerTypeRetaggingApp: React.FC = () => {
  const [branch, setBranch] = useState("");
  const [branchDropdown, setBranchDropdown] = useState("");
  const [customerData, setCustomerData] = useState<CustomerTypeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when branch is entered
  const loadCustomerData = (branchValue: string) => {
    if (!branchValue.trim()) {
      setCustomerData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock customer type data
      const mockData: CustomerTypeInfo[] = [
        {
          customerId: "CUST001234",
          customerName: "John Doe",
          dobDoi: "1990-05-15",
          contactNumber: "+234-801-234-5678",
          branch: branchValue,
          postingDate: "2024-01-15",
          postedBy: "Admin User",
        },
        {
          customerId: "CUST005678",
          customerName: "Jane Smith",
          dobDoi: "1985-08-22",
          contactNumber: "+234-802-345-6789",
          branch: branchValue,
          postingDate: "2024-02-10",
          postedBy: "System Admin",
        },
        {
          customerId: "CUST009012",
          customerName: "Bob Johnson",
          dobDoi: "1992-12-03",
          contactNumber: "+234-803-456-7890",
          branch: branchValue,
          postingDate: "2024-03-05",
          postedBy: "Branch Manager",
        },
      ];
      setCustomerData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleBranchChange = (value: string) => {
    setBranch(value);
    loadCustomerData(value);
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
                Customer Type Retagging App
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Branch Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Branch Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        value={branch}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        placeholder="Enter Branch"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchDropdown">Branch Selection</Label>
                      <Select value={branchDropdown} onValueChange={setBranchDropdown}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
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
                          <TableHead>Posting Date</TableHead>
                          <TableHead>Posted By</TableHead>
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
                              {branch.trim() ? "No customer type data found for this branch." : "Enter a Branch to view customer type information."}
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
                              <TableCell>{customer.postingDate}</TableCell>
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

export default CustomerTypeRetaggingApp;