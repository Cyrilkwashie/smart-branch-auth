import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

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

const SafeCustodyCreation: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    product: "",
    currency: "",
    scannedDocumentReference: "",
    typeOfBox: "",
    custodyDescription: "",
    comments: "",
    dateOpened: "",
    dateOfLastActivity: "",
    endDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Safe Custody Creation
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
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">REQ-{Date.now()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md rounded-lg">
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle className="text-lg">Requisition Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="Enter account number"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product">Product</Label>
                        <Input
                          id="product"
                          placeholder="Enter product"
                          value={formData.product}
                          onChange={(e) => handleInputChange("product", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input
                          id="currency"
                          placeholder="Enter currency"
                          value={formData.currency}
                          onChange={(e) => handleInputChange("currency", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scannedDocumentReference">Scanned Document Reference</Label>
                        <Input
                          id="scannedDocumentReference"
                          placeholder="Enter scanned document reference"
                          value={formData.scannedDocumentReference}
                          onChange={(e) => handleInputChange("scannedDocumentReference", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="typeOfBox">Type of Box</Label>
                        <Select value={formData.typeOfBox} onValueChange={(value) => handleInputChange("typeOfBox", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type of box" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small Box</SelectItem>
                            <SelectItem value="medium">Medium Box</SelectItem>
                            <SelectItem value="large">Large Box</SelectItem>
                            <SelectItem value="extra-large">Extra Large Box</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOpened">Date Opened</Label>
                        <Input
                          id="dateOpened"
                          type="date"
                          value={formData.dateOpened}
                          onChange={(e) => handleInputChange("dateOpened", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfLastActivity">Date of Last Activity</Label>
                        <Input
                          id="dateOfLastActivity"
                          type="date"
                          value={formData.dateOfLastActivity}
                          onChange={(e) => handleInputChange("dateOfLastActivity", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custodyDescription">Custody Description</Label>
                      <Textarea
                        id="custodyDescription"
                        placeholder="Enter custody description"
                        value={formData.custodyDescription}
                        onChange={(e) => handleInputChange("custodyDescription", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments">Comments</Label>
                      <Textarea
                        id="comments"
                        placeholder="Enter any additional comments"
                        value={formData.comments}
                        onChange={(e) => handleInputChange("comments", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="px-8">
                        Create Safe Custody
                      </Button>
                    </div>
                  </form>
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

export default SafeCustodyCreation;