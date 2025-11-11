import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CustomerRelationshipInfo {
  customerId: string;
  customerDesk: string;
  postingDate: string;
  dateOfIncorpDob: string;
  createdBy: string;
  relationType: string;
}

const AmendCustomerRelationship: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [branch, setBranch] = useState("");
  const [dateOfIncorpBirthFrom, setDateOfIncorpBirthFrom] = useState("");
  const [dateOfIncorpBirthTo, setDateOfIncorpBirthTo] = useState("");
  const [relationshipData, setRelationshipData] = useState<CustomerRelationshipInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load relationship data when customer ID is entered
  const loadRelationshipData = (id: string) => {
    if (!id.trim()) {
      setRelationshipData([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock relationship data
      const mockData: CustomerRelationshipInfo[] = [
        {
          customerId: `CUST${id}001`,
          customerDesk: "Corporate Banking",
          postingDate: "2024-01-15",
          dateOfIncorpDob: "1990-05-15",
          createdBy: "Admin User",
          relationType: "Primary",
        },
        {
          customerId: `CUST${id}002`,
          customerDesk: "Retail Banking",
          postingDate: "2024-02-10",
          dateOfIncorpDob: "1985-08-22",
          createdBy: "System Admin",
          relationType: "Secondary",
        },
        {
          customerId: `CUST${id}003`,
          customerDesk: "Private Banking",
          postingDate: "2024-03-05",
          dateOfIncorpDob: "1992-12-03",
          createdBy: "Branch Manager",
          relationType: "Joint",
        },
      ];
      setRelationshipData(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    loadRelationshipData(value);
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
                Amend Customer Relationship
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
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter Customer Name"
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
                    <div className="space-y-2">
                      <Label htmlFor="dateOfIncorpBirthFrom">Date of Incorp/Birth (From)</Label>
                      <Input
                        id="dateOfIncorpBirthFrom"
                        type="date"
                        value={dateOfIncorpBirthFrom}
                        onChange={(e) => setDateOfIncorpBirthFrom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfIncorpBirthTo">Date of Incorp/Birth (To)</Label>
                      <Input
                        id="dateOfIncorpBirthTo"
                        type="date"
                        value={dateOfIncorpBirthTo}
                        onChange={(e) => setDateOfIncorpBirthTo(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Relationship Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Relationship Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Customer Desk</TableHead>
                          <TableHead>Posting Date</TableHead>
                          <TableHead>Date of Incorp/DOB</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Relation Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              Loading relationship data...
                            </TableCell>
                          </TableRow>
                        ) : relationshipData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              {customerId.trim() ? "No relationship data found for this customer ID." : "Enter a Customer ID to view relationship details."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          relationshipData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{item.customerId}</TableCell>
                              <TableCell>{item.customerDesk}</TableCell>
                              <TableCell>{item.postingDate}</TableCell>
                              <TableCell>{item.dateOfIncorpDob}</TableCell>
                              <TableCell>{item.createdBy}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.relationType === 'Primary'
                                    ? 'bg-blue-100 text-blue-800'
                                    : item.relationType === 'Secondary'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {item.relationType}
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

export default AmendCustomerRelationship;