import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

// Mock data for the table (same as register enquiry)
const mockTableData = [
  {
    requisitionNo: "REQ001",
    accountNo: "1234567890",
    accountName: "John Doe",
    postedBy: "Admin",
    product: "Savings Account",
    currency: "GHS",
    scannedDocumentReference: "DOC-001",
    typeOfBox: "Medium Box",
    custodyDescription: "Important legal documents",
    comments: "Regular maintenance required",
    dateOpened: "2024-01-15",
    dateOfLastActivity: "2024-10-01",
    endDate: "2025-01-15",
  },
  {
    requisitionNo: "REQ002",
    accountNo: "0987654321",
    accountName: "Jane Smith",
    postedBy: "User1",
    product: "Current Account",
    currency: "GHS",
    scannedDocumentReference: "DOC-002",
    typeOfBox: "Small Box",
    custodyDescription: "Financial statements",
    comments: "Quarterly review needed",
    dateOpened: "2024-03-20",
    dateOfLastActivity: "2024-09-15",
    endDate: "2025-03-20",
  },
  {
    requisitionNo: "REQ003",
    accountNo: "1122334455",
    accountName: "Bob Johnson",
    postedBy: "Admin",
    product: "Fixed Deposit",
    currency: "GHS",
    scannedDocumentReference: "DOC-003",
    typeOfBox: "Large Box",
    custodyDescription: "Property deeds and certificates",
    comments: "High value documents",
    dateOpened: "2024-02-10",
    dateOfLastActivity: "2024-08-30",
    endDate: "2025-02-10",
  },
];

const SafeCustodyLiquidation: React.FC = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setTableData(mockTableData);
      setLoading(false);
    }, 1000);
  };

  const handleRowClick = (requisition: any) => {
    navigate(`/safe-custody/liquidation/${requisition.requisitionNo}`, {
      state: { requisitionData: requisition }
    });
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
                Safe Custody Liquidation
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {tableData.length > 0 && (
                <Card className="border shadow-md rounded-lg">
                  <CardHeader className="bg-muted/50 border-b">
                    <CardTitle className="text-lg">Safe Custody Requisitions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 overflow-x-auto">
                    <Table className="min-w-[800px] border">
                      <TableHeader>
                        <TableRow className="border-b">
                          <TableHead className="font-semibold">Requisition No</TableHead>
                          <TableHead className="font-semibold">Account No</TableHead>
                          <TableHead className="font-semibold">Account Name</TableHead>
                          <TableHead className="font-semibold">Posted By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tableData.map((row, idx) => (
                          <TableRow
                            key={idx}
                            className="border-b hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleRowClick(row)}
                          >
                            <TableCell className="py-3">{row.requisitionNo}</TableCell>
                            <TableCell className="py-3">{row.accountNo}</TableCell>
                            <TableCell className="py-3">{row.accountName}</TableCell>
                            <TableCell className="py-3">{row.postedBy}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SafeCustodyLiquidation;