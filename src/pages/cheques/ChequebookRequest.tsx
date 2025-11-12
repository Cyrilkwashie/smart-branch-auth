import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FeeRecord {
  chgCode: string;
  feeAccount: string;
  feeAccountDescription: string;
  currency: string;
  feeDescription: string;
  feeAmountForBook: string;
}

export default function ChequebookRequest() {
  const [accountNumber, setAccountNumber] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [comments, setComments] = useState("");
  
  const [product, setProduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [dateOfLastActivity, setDateOfLastActivity] = useState("");
  
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadAccountData(value);
    } else {
      setProduct("");
      setCurrency("");
      setDateOpened("");
      setDateOfLastActivity("");
      setFeeRecords([]);
    }
  };

  const loadAccountData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setProduct("Current Account");
      setCurrency("GHS");
      setDateOpened("2020-05-15");
      setDateOfLastActivity("2024-03-10");
      setFeeRecords([
        {
          chgCode: "CHQ001",
          feeAccount: "1001234567",
          feeAccountDescription: "Cheque Book Fee Account",
          currency: "GHS",
          feeDescription: "Chequebook Issuance Fee",
          feeAmountForBook: "50.00",
        },
        {
          chgCode: "CHQ002",
          feeAccount: "1001234568",
          feeAccountDescription: "Service Charge Account",
          currency: "GHS",
          feeDescription: "Processing Fee",
          feeAmountForBook: "25.00",
        },
        {
          chgCode: "CHQ003",
          feeAccount: "1001234569",
          feeAccountDescription: "VAT Account",
          currency: "GHS",
          feeDescription: "VAT on Cheque Services",
          feeAmountForBook: "11.25",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Chequebook Request</h1>
              <p className="text-muted-foreground">
                Request new chequebooks for customer accounts
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="chequeNumber">Cheque Number</Label>
                  <Input
                    id="chequeNumber"
                    value={chequeNumber}
                    onChange={(e) => setChequeNumber(e.target.value)}
                    placeholder="Enter cheque number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Input
                    id="requestedBy"
                    value={requestedBy}
                    onChange={(e) => setRequestedBy(e.target.value)}
                    placeholder="Enter requester name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Document Number</Label>
                  <Input
                    id="documentNumber"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Enter document number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter any comments"
                    rows={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Input
                    id="product"
                    value={product}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={currency}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOpened">Date Opened</Label>
                  <Input
                    id="dateOpened"
                    value={dateOpened}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfLastActivity">Date of Last Activity</Label>
                  <Input
                    id="dateOfLastActivity"
                    value={dateOfLastActivity}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Fee Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chg Code</TableHead>
                    <TableHead>Fee Account</TableHead>
                    <TableHead>Fee Account Description</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Fee Description</TableHead>
                    <TableHead>Fee Amount for Book</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading fee information...
                      </TableCell>
                    </TableRow>
                  ) : feeRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No fee information available. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    feeRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.chgCode}</TableCell>
                        <TableCell>{record.feeAccount}</TableCell>
                        <TableCell>{record.feeAccountDescription}</TableCell>
                        <TableCell>{record.currency}</TableCell>
                        <TableCell>{record.feeDescription}</TableCell>
                        <TableCell className="text-right">{record.feeAmountForBook}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}
