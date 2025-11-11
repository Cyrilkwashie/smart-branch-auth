import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, useParams } from "react-router-dom";

// Mock data for the fees table
const feesTableData = [
  {
    changeCode: "SC001",
    feeAmount: "₵50.00",
    feeAmountDescription: "Safe Custody Setup Fee",
    feesDescription: "Initial setup charge for safe custody service",
    feeAmountPerBook: "₵25.00",
    currency: "GHS",
  },
  {
    changeCode: "SC002",
    feeAmount: "₵30.00",
    feeAmountDescription: "Monthly Storage Fee",
    feesDescription: "Monthly fee for document storage",
    feeAmountPerBook: "₵15.00",
    currency: "GHS",
  },
  {
    changeCode: "SC003",
    feeAmount: "₵20.00",
    feeAmountDescription: "Retrieval Fee",
    feesDescription: "Fee for document retrieval requests",
    feeAmountPerBook: "₵10.00",
    currency: "GHS",
  },
];

const SafeCustodyLiquidationDetail: React.FC = () => {
  const location = useLocation();
  const { requisitionNo } = useParams<{ requisitionNo: string }>();
  const requisitionData = location.state?.requisitionData;

  if (!requisitionData) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AppHeader>

              <SidebarTrigger />

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                  Safe Custody Liquidation Details
                </span>
              </div>
            </AppHeader>
            <main className="p-6">
              <div className="max-w-4xl mx-auto">
                <Card className="border shadow-md rounded-lg">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No requisition data found. Please go back and select a requisition.</p>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const handleLiquidate = () => {
    console.log("Liquidating requisition:", requisitionData.requisitionNo);
    // Handle liquidation logic here
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
                Safe Custody Liquidation - {requisitionData.requisitionNo}
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* System Generated Request ID */}
              <Card className="border shadow-md rounded-lg mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm font-medium text-muted-foreground">Request ID:</Label>
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">LIQ-{Date.now()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md rounded-lg">
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle className="text-lg">Requisition Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={requisitionData.accountNo}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product">Product</Label>
                        <Input
                          id="product"
                          value={requisitionData.product}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                          id="currency"
                          value={requisitionData.currency}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scannedDocumentReference">Scanned Document Reference</Label>
                        <Input
                          id="scannedDocumentReference"
                          value={requisitionData.scannedDocumentReference}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="typeOfBox">Type of Box</Label>
                        <Input
                          id="typeOfBox"
                          value={requisitionData.typeOfBox}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOpened">Date Opened</Label>
                        <Input
                          id="dateOpened"
                          type="date"
                          value={requisitionData.dateOpened}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfLastActivity">Date of Last Activity</Label>
                        <Input
                          id="dateOfLastActivity"
                          type="date"
                          value={requisitionData.dateOfLastActivity}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={requisitionData.endDate}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custodyDescription">Custody Description</Label>
                      <Textarea
                        id="custodyDescription"
                        value={requisitionData.custodyDescription}
                        readOnly
                        className="bg-muted"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments">Comments</Label>
                      <Textarea
                        id="comments"
                        value={requisitionData.comments}
                        readOnly
                        className="bg-muted"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={handleLiquidate} className="px-8 bg-red-600 hover:bg-red-700">
                        Liquidate Safe Custody
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fees Table */}
              <Card className="border shadow-md rounded-lg mt-6">
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle className="text-lg">Associated Fees</CardTitle>
                </CardHeader>
                <CardContent className="p-6 overflow-x-auto">
                  <Table className="min-w-[800px] border">
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="font-semibold">Change Code</TableHead>
                        <TableHead className="font-semibold">Fee Amount</TableHead>
                        <TableHead className="font-semibold">Fee Amount Description</TableHead>
                        <TableHead className="font-semibold">Fees Description</TableHead>
                        <TableHead className="font-semibold">Fee Amount Per Book</TableHead>
                        <TableHead className="font-semibold">Currency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feesTableData.map((row, idx) => (
                        <TableRow key={idx} className="border-b hover:bg-muted/50">
                          <TableCell className="py-3">{row.changeCode}</TableCell>
                          <TableCell className="py-3">{row.feeAmount}</TableCell>
                          <TableCell className="py-3">{row.feeAmountDescription}</TableCell>
                          <TableCell className="py-3">{row.feesDescription}</TableCell>
                          <TableCell className="py-3">{row.feeAmountPerBook}</TableCell>
                          <TableCell className="py-3">{row.currency}</TableCell>
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

export default SafeCustodyLiquidationDetail;