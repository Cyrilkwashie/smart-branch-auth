import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CustomerRelationship {
  customerId: string;
  customerDescription: string;
  postingDate: string;
  dateOfIncorpDOB: string;
  createdBy: string;
  relationshipType: string;
}

const AddCustomerRelationship: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [relationships, setRelationships] = useState<CustomerRelationship[]>([]);

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    // Simulate auto-populating customer name based on ID
    if (value.trim()) {
      setCustomerName(`Customer ${value}`);
    } else {
      setCustomerName("");
    }
  };

  // Load table data on component mount
  useEffect(() => {
    const mockData: CustomerRelationship[] = [
      {
        customerId: "CUST001",
        customerDescription: "John Doe Corporation",
        postingDate: "2024-01-15",
        dateOfIncorpDOB: "2010-05-20",
        createdBy: "Admin User",
        relationshipType: "Primary",
      },
      {
        customerId: "CUST002",
        customerDescription: "Jane Smith LLC",
        postingDate: "2024-01-16",
        dateOfIncorpDOB: "2015-08-10",
        createdBy: "System User",
        relationshipType: "Secondary",
      },
      {
        customerId: "CUST003",
        customerDescription: "Bob Johnson Inc",
        postingDate: "2024-01-17",
        dateOfIncorpDOB: "2008-12-05",
        createdBy: "Manager User",
        relationshipType: "Tertiary",
      },
    ];
    setRelationships(mockData);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Add Customer Relationship
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
                        readOnly
                        placeholder=""
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Relationships Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Relationships</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Customer Description</TableHead>
                          <TableHead>Posting Date</TableHead>
                          <TableHead>Date of Incorp/DOB</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Relationship Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relationships.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                              No customer relationships found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          relationships.map((relationship, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{relationship.customerId}</TableCell>
                              <TableCell>{relationship.customerDescription}</TableCell>
                              <TableCell>{relationship.postingDate}</TableCell>
                              <TableCell>{relationship.dateOfIncorpDOB}</TableCell>
                              <TableCell>{relationship.createdBy}</TableCell>
                              <TableCell>{relationship.relationshipType}</TableCell>
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

export default AddCustomerRelationship;