import React from "react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Example mock data for the table (same as AmendAdditionalCMAccount)
const tableData = [
  {
    accountNumber: "1234567890",
    accountName: "John Doe",
    customerID: "CUST001",
    cmAccountType: "CM Savings Account",
    currency: "GHS",
    status: "Active",
    branch: "Main Branch",
  },
  {
    accountNumber: "9876543210",
    accountName: "Jane Smith",
    customerID: "CUST002",
    cmAccountType: "CM Current Account",
    currency: "USD",
    status: "Inactive",
    branch: "East Branch",
  },
  // ...more rows
];
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Dummy balance info for reuse
const dummyBalance = {
  availableBalance: "₵10,000.00",
  holdBalance: "₵500.00",
  unclearedEffects: "₵200.00",
  minimumBalance: "₵50.00",
  lienAmount: "₵0.00",
  accruedInterest: "₵100.00",
  accruedCharges: "₵20.00",
};

const BalanceSection = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Balance Information</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Available Balance</Label>
        <Input value={dummyBalance.availableBalance} readOnly />
      </div>
      <div>
        <Label>Hold Balance</Label>
        <Input value={dummyBalance.holdBalance} readOnly />
      </div>
      <div>
        <Label>Uncleared Effects</Label>
        <Input value={dummyBalance.unclearedEffects} readOnly />
      </div>
      <div>
        <Label>Minimum Balance</Label>
        <Input value={dummyBalance.minimumBalance} readOnly />
      </div>
      <div>
        <Label>Lien Amount</Label>
        <Input value={dummyBalance.lienAmount} readOnly />
      </div>
      <div>
        <Label>Accrued Interest</Label>
        <Input value={dummyBalance.accruedInterest} readOnly />
      </div>
      <div>
        <Label>Accrued Charges</Label>
        <Input value={dummyBalance.accruedCharges} readOnly />
      </div>
    </CardContent>
  </Card>
);


const CloseAccountByDraft: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Close Account by Draft
              </span>
            </div>
          </AppHeader>
          {/* Important Notice Heading */}
          <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center font-semibold text-base md:text-lg">
            Do not add commission to draft amount
          </div>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Funding Section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Funding Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Funding A/C No</Label>
                    <Input placeholder="Enter Funding Account Number" />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Input placeholder="Enter Currency" />
                  </div>
                  <div>
                    <Label>Branch</Label>
                    <Input placeholder="Enter Branch" />
                  </div>
                  <div>
                    <Label>Draft Amount</Label>
                    <Input placeholder="Enter Draft Amount" />
                  </div>
                  <div>
                    <Label>Cheque No</Label>
                    <Input placeholder="Enter Cheque Number" />
                  </div>
                  <div>
                    <Label>Select Branch</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="branch1">Branch 1</SelectItem>
                        <SelectItem value="branch2">Branch 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              {/* Purchaser/Beneficiary Section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Purchaser & Beneficiary Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Purchaser</Label>
                    <Input placeholder="Enter Purchaser Name" />
                  </div>
                  <div>
                    <Label>Purchaser Address</Label>
                    <Input placeholder="Enter Purchaser Address" />
                  </div>
                  <div>
                    <Label>Beneficiary</Label>
                    <Input placeholder="Enter Beneficiary Name" />
                  </div>
                  <div>
                    <Label>Beneficiary Address</Label>
                    <Input placeholder="Enter Beneficiary Address" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Transaction Details</Label>
                    <Textarea placeholder="Enter Transaction Details" />
                  </div>
                </CardContent>
              </Card>
              {/* Balance Section */}
              <BalanceSection />
              <div className="flex justify-end mb-8">
                <Button>Submit</Button>
              </div>

              {/* Table Section (copied from AmendAdditionalCMAccount) */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 overflow-x-auto">
                  <Table className="min-w-[800px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Change Code</TableHead>
                        <TableHead>Fee Amount</TableHead>
                        <TableHead>Fee Amount Description</TableHead>
                        <TableHead>Fee Description</TableHead>
                        <TableHead>Fee Amount Per Book</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.accountNumber}</TableCell>
                          <TableCell>{row.accountName}</TableCell>
                          <TableCell>{row.customerID}</TableCell>
                          <TableCell>{row.cmAccountType}</TableCell>
                          <TableCell>{row.currency}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.branch}</TableCell>
                          <TableCell>System</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CloseAccountByDraft;
