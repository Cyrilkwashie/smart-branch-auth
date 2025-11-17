import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
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
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
          </AppHeader>
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number *</Label>
                          <Input
                            id="accountNumber"
                            value={accountNumber}
                            onChange={(e) => handleAccountNumberChange(e.target.value)}
                            placeholder="Enter account number"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch</Label>
                          <Input
                            id="branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="Enter branch"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
                        Card Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardType">Card Type</Label>
                          <Input
                            id="cardType"
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                            placeholder="Enter card type"
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
                        <div className="space-y-2">
                          <Label htmlFor="requestId">Request ID</Label>
                          <Input
                            id="requestId"
                            value={requestId}
                            onChange={(e) => setRequestId(e.target.value)}
                            placeholder="Auto-generated"
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="panAccount">PAN Account</Label>
                          <Input
                            id="panAccount"
                            value={panAccount}
                            onChange={(e) => setPanAccount(e.target.value)}
                            placeholder="Auto-generated"
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="raReason">RA Reason</Label>
                          <Input
                            id="raReason"
                            value={raReason}
                            onChange={(e) => setRaReason(e.target.value)}
                            placeholder="Enter RA reason"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="daReason">DA Reason</Label>
                          <Input
                            id="daReason"
                            value={daReason}
                            onChange={(e) => setDaReason(e.target.value)}
                            placeholder="Enter DA reason"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-4 sm:flex-row sm:justify-end sm:gap-4">
                      <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                      <Button className="w-full sm:w-auto">Process Issuance</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Issuance Records</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">History of ATM card issuances</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="w-full">
                    <Table className="w-full text-xs sm:text-sm">
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
                            <TableCell className="break-words max-w-[120px]">{record.reqId}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.accountNumber}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.accountDescription}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.requisitionDate}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.postedBy}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.branch}</TableCell>
                            <TableCell className="break-words max-w-[120px]">{record.cardType}</TableCell>
                            <TableCell className="break-words max-w-[120px]">
                              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                {record.status}
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
}
