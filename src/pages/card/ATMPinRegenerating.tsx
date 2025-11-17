import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
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
                    {/* Card and Account Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Card & Account Information
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
                          <Label htmlFor="branchId">Branch ID</Label>
                          <Input
                            id="branchId"
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                            placeholder="Enter branch ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="atmCardNumber">ATM Card Number *</Label>
                          <Input
                            id="atmCardNumber"
                            value={atmCardNumber}
                            onChange={(e) => setAtmCardNumber(e.target.value)}
                            placeholder="Enter ATM card number"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Number *</Label>
                          <Input
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter mobile number"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* Reason Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Reason for PIN Regeneration
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason *</Label>
                        <Textarea
                          id="reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Enter reason for PIN regeneration"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                    {/* Form Actions */}
                    <div className="flex flex-col gap-3 pt-4 border-t sm:flex-row sm:items-center sm:justify-end">
                      <Button variant="outline" type="button" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-primary w-full sm:w-auto" disabled={!accountNumber || !atmCardNumber || !mobileNumber || !reason}>
                        Regenerate PIN
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              {/* PIN Regeneration Records Table */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">PIN Regeneration History</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Previous PIN regeneration requests</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="w-full">
                    <Table className="w-full text-xs sm:text-sm">
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
                              <TableCell className="break-words max-w-[120px]">{record.id}</TableCell>
                              <TableCell className="break-words max-w-[120px]">{record.accountNumber}</TableCell>
                              <TableCell className="break-words max-w-[120px]">{record.cardNumber}</TableCell>
                              <TableCell className="break-words max-w-[120px]">{record.mobileNumber}</TableCell>
                              <TableCell className="break-words max-w-[120px]">{record.reason}</TableCell>
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
