import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CustomerSectorInfo {
  customerName: string;
  doiDob: string;
  contactNo: string;
  branch: string;
  postingDate: string;
  createdBy: string;
  customerType: string;
}

const AmendCustomerSectorSegment: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerData, setCustomerData] = useState<CustomerSectorInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when account number is entered
  const loadCustomerData = (number: string) => {
    if (!number.trim()) {
      setCustomerData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock customer sector data
      const mockData: CustomerSectorInfo[] = [
        {
          customerName: `John ${number} Doe`,
          doiDob: "1990-05-15",
          contactNo: "+234-801-234-5678",
          branch: "001",
          postingDate: "2024-01-15",
          createdBy: "Admin User",
          customerType: "Individual",
        },
        {
          customerName: `Jane ${number} Smith`,
          doiDob: "1985-08-22",
          contactNo: "+234-802-345-6789",
          branch: "002",
          postingDate: "2024-02-10",
          createdBy: "System Admin",
          customerType: "Corporate",
        },
        {
          customerName: `Bob ${number} Johnson`,
          doiDob: "1992-12-03",
          contactNo: "+234-803-456-7890",
          branch: "003",
          postingDate: "2024-03-05",
          createdBy: "Branch Manager",
          customerType: "Individual",
        },
      ];
      setCustomerData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
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
                Amend Customer Sector
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
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => handleAccountNumberChange(e.target.value)}
                        placeholder="Enter Account Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerId">Customer ID</Label>
                      <Input
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="Enter Customer ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchNumber">Branch Number</Label>
                      <Input
                        id="branchNumber"
                        value={branchNumber}
                        onChange={(e) => setBranchNumber(e.target.value)}
                        placeholder="Enter Branch Number"
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
                  </div>
                </CardContent>
              </Card>

              {/* Customer Sector Information Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Sector Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>DOI/DOB</TableHead>
                          <TableHead>Contact No</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Posting Date</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Customer Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              Loading customer sector data...
                            </TableCell>
                          </TableRow>
                        ) : customerData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              {accountNumber.trim() ? "No customer sector data found for this account." : "Enter an Account Number to view customer sector information."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          customerData.map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{customer.customerName}</TableCell>
                              <TableCell>{customer.doiDob}</TableCell>
                              <TableCell>{customer.contactNo}</TableCell>
                              <TableCell>{customer.branch}</TableCell>
                              <TableCell>{customer.postingDate}</TableCell>
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

export default AmendCustomerSectorSegment;