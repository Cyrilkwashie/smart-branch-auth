import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IssuanceRecord {
  reqId: string;
  accountNumber: string;
  accountDescription: string;
  requisitionDate: string;
  postedBy: string;
  branch: string;
  cardType: string;
  status: string;
}

export default function ATMCardIssuance() {
  const [accountNumber, setAccountNumber] = useState("");
  const [regDate, setRegDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [branch, setBranch] = useState("");
  const [cardType, setCardType] = useState("");
  const [requestId, setRequestId] = useState("");
  const [panAccount, setPanAccount] = useState("");
  const [raReason, setRaReason] = useState("");
  const [daReason, setDaReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState<IssuanceRecord[]>([]);

  const loadAccountData = () => {
    if (!accountNumber) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBranch("001 - Main Branch");
      setCardType("Visa Debit");
      setRequestId("REQ-2024-001234");
      setPanAccount("4532********1234");
      setRaReason("New Card Request");
      setDaReason("Account Activation");
      
      // Load table data
      setRecords([
        {
          reqId: "REQ-2024-001234",
          accountNumber: accountNumber,
          accountDescription: "John Doe - Savings Account",
          requisitionDate: "2024-01-15",
          postedBy: "Admin User",
          branch: "001 - Main Branch",
          cardType: "Visa Debit",
          status: "Processed"
        },
        {
          reqId: "REQ-2024-001233",
          accountNumber: accountNumber,
          accountDescription: "John Doe - Savings Account",
          requisitionDate: "2024-01-10",
          postedBy: "Branch Officer",
          branch: "001 - Main Branch",
          cardType: "Mastercard Debit",
          status: "Processed"
        }
      ]);
      
      setIsLoading(false);
    }, 500);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadAccountData();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-6">
        <SidebarTrigger className="mb-4" />
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">ATM Card Issuance</h1>
            <p className="text-muted-foreground">Issue ATM cards to customer accounts</p>
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Enter account details for card issuance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regDate">Reg Date</Label>
                  <Input
                    id="regDate"
                    type="date"
                    value={regDate}
                    onChange={(e) => setRegDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Details (Auto-filled) */}
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
              <CardDescription>Automatically populated based on account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={branch}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardType">Card Type</Label>
                  <Input
                    id="cardType"
                    value={cardType}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestId">Request ID</Label>
                  <Input
                    id="requestId"
                    value={requestId}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panAccount">PAN Account</Label>
                  <Input
                    id="panAccount"
                    value={panAccount}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reason Codes */}
          <Card>
            <CardHeader>
              <CardTitle>Reason Information</CardTitle>
              <CardDescription>Request and deactivation reasons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="raReason">R/A Reason</Label>
                  <Input
                    id="raReason"
                    value={raReason}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daReason">D/A Reason</Label>
                  <Input
                    id="daReason"
                    value={daReason}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issuance Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Issuance Records</CardTitle>
              <CardDescription>History of ATM card issuances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Req ID</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Account Description</TableHead>
                    <TableHead>Requisition Date</TableHead>
                    <TableHead>Posted By</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Card Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        No records found. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.reqId}</TableCell>
                        <TableCell>{record.accountNumber}</TableCell>
                        <TableCell>{record.accountDescription}</TableCell>
                        <TableCell>{record.requisitionDate}</TableCell>
                        <TableCell>{record.postedBy}</TableCell>
                        <TableCell>{record.branch}</TableCell>
                        <TableCell>{record.cardType}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            {record.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Process Issuance</Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
