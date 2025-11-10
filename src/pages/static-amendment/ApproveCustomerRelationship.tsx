import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

interface CustomerRelationship {
  customerName: string;
  dateOfIncorpDOB: string;
  postingDate: string;
  createdBy: string;
  relationshipType: string;
}

const ApproveCustomerRelationship: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [relationships, setRelationships] = useState<CustomerRelationship[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load customer relationships based on ID
  const loadCustomerRelationships = (id: string) => {
    if (!id.trim()) {
      setRelationships([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data based on customer ID
      const mockData: CustomerRelationship[] = [
        {
          customerName: `Customer ${id} Corporation`,
          dateOfIncorpDOB: "2010-05-20",
          postingDate: "2024-01-15",
          createdBy: "Admin User",
          relationshipType: "Primary",
        },
        {
          customerName: `Customer ${id} LLC`,
          dateOfIncorpDOB: "2015-08-10",
          postingDate: "2024-01-16",
          createdBy: "System User",
          relationshipType: "Secondary",
        },
        {
          customerName: `Customer ${id} Inc`,
          dateOfIncorpDOB: "2008-12-05",
          postingDate: "2024-01-17",
          createdBy: "Manager User",
          relationshipType: "Tertiary",
        },
      ];
      setRelationships(mockData);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    loadCustomerRelationships(value);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Approve Customer Relationship
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Customer ID Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="max-w-md">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      value={customerId}
                      onChange={(e) => handleCustomerIdChange(e.target.value)}
                      placeholder="Enter Customer ID"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Relationships Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Customer Relationships for Approval</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Date of Incorp/DOB</TableHead>
                          <TableHead>Posting Date</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Relationship Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              Loading customer relationships...
                            </TableCell>
                          </TableRow>
                        ) : relationships.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              {customerId.trim() ? "No customer relationships found for this ID." : "Enter a Customer ID to view relationships for approval."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          relationships.map((relationship, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{relationship.customerName}</TableCell>
                              <TableCell>{relationship.dateOfIncorpDOB}</TableCell>
                              <TableCell>{relationship.postingDate}</TableCell>
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

export default ApproveCustomerRelationship;
