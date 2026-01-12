import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface SpecialCustomer {
  customerId: string;
  customerName: string;
  customerNumber: string;
  accountNumber: string;
  accountName: string;

}


const SpecialCustomerReg: React.FC = () => {
  const specialCustomers: SpecialCustomer[] = [
    {
      customerId: "CUST001",
      customerName: "John Doe",
      customerNumber: "1234567890",
      accountNumber: "1234567890",
      accountName: "John Doe Savings Account",
    },
    {
      customerId: "CUST001",
      customerName: "John Doe",
      customerNumber: "1234567890",
      accountNumber: "1234567890",
      accountName: "John Doe Savings Account",
    },
    {
      customerId: "CUST001",
      customerName: "John Doe",
      customerNumber: "1234567890",
      accountNumber: "1234567890",
      accountName: "John Doe Savings Account",
    },
    {
      customerId: "CUST001",
      customerName: "John Doe",
      customerNumber: "1234567890",
      accountNumber: "1234567890",
      accountName: "John Doe Savings Account",
    },
    {
      customerId: "CUST001",
      customerName: "John Doe",
      customerNumber: "1234567890",
      accountNumber: "1234567890",
      accountName: "John Doe Savings Account",
    },
  ];

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "Active" ? "default" : "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Special Customer Registration
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Special Customer Registrations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer ID</TableHead>
                          <TableHead>Customer Name</TableHead>
                          <TableHead>Customer Number</TableHead>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {specialCustomers.map((customer, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{customer.customerId}</TableCell>
                            <TableCell>{customer.customerName}</TableCell>
                            <TableCell>{customer.customerNumber}</TableCell>
                            <TableCell>{customer.accountNumber}</TableCell>
                            <TableCell>{customer.accountName}</TableCell>

                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
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

export default SpecialCustomerReg;