import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PinRegenerationRecord {
  id: string;
  accountNumber: string;
  cardNumber: string;
  mobileNumber: string;
  reason: string;
}

export default function ATMPinRegenerating() {
  const [accountNumber, setAccountNumber] = useState("");
  const [branchId, setBranchId] = useState("");
  const [atmCardNumber, setAtmCardNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState<PinRegenerationRecord[]>([]);

  const loadRecords = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecords([
        {
          id: "PIN-001",
          accountNumber: "1234567890",
          cardNumber: "4532********1234",
          mobileNumber: "+233241234567",
          reason: "Forgotten PIN"
        },
        {
          id: "PIN-002",
          accountNumber: "1234567890",
          cardNumber: "4532********1234",
          mobileNumber: "+233241234567",
          reason: "Card Compromised"
        },
        {
          id: "PIN-003",
          accountNumber: "1234567890",
          cardNumber: "4532********1234",
          mobileNumber: "+233241234567",
          reason: "Security Update"
        }
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadRecords();
    }
  };

  const handleRegeneratePin = () => {
    // Handle PIN regeneration logic
    console.log("Regenerating PIN for account:", accountNumber);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-6">
        <SidebarTrigger className="mb-4" />
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">ATM PIN Regenerating</h1>
            <p className="text-muted-foreground">Generate new PIN for ATM cards</p>
          </div>

          {/* PIN Regeneration Form */}
          <Card>
            <CardHeader>
              <CardTitle>PIN Regeneration Details</CardTitle>
              <CardDescription>Enter card and account information to regenerate PIN</CardDescription>
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
                  <Label htmlFor="branchId">Branch ID</Label>
                  <Input
                    id="branchId"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    placeholder="Enter branch ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="atmCardNumber">ATM Card Number</Label>
                  <Input
                    id="atmCardNumber"
                    value={atmCardNumber}
                    onChange={(e) => setAtmCardNumber(e.target.value)}
                    placeholder="Enter ATM card number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for PIN regeneration"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PIN Regeneration Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>PIN Regeneration History</CardTitle>
              <CardDescription>Previous PIN regeneration requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Mobile Number</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No records found. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.accountNumber}</TableCell>
                        <TableCell>{record.cardNumber}</TableCell>
                        <TableCell>{record.mobileNumber}</TableCell>
                        <TableCell>{record.reason}</TableCell>
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
            <Button 
              onClick={handleRegeneratePin}
              disabled={!accountNumber || !atmCardNumber || !mobileNumber || !reason}
            >
              Regenerate PIN
            </Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
