import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const mockAccountInfo = {
  accountName: "John Doe",
  accountType: "Savings",
  branch: "Main Branch",
  status: "Active",
  currency: "GHS",
  currentBalance: "5,230.00",
  availableBalance: "5,230.00",
  clearedBalance: "5,230.00",
  unclearedBalance: "0.00",
  minimumBalance: "100.00",
  overdraftLimit: "0.00",
  dateOpened: "2022-01-15",
  lastActivityDate: "2023-04-12",
  level: "Gold",
};

const CloseAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [transferAccount, setTransferAccount] = useState("");
  const [reason, setReason] = useState("");
  const [sourceDoc, setSourceDoc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setAccountInfo(mockAccountInfo);
      setLoading(false);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Close Account
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-3xl mx-auto space-y-6">
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
                      <Label htmlFor="accountType">Transfer Type</Label>
                      <Select value={accountType} onValueChange={setAccountType}>
                        <SelectTrigger id="accountType">
                          <SelectValue placeholder="Select transfer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="draft">Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {accountInfo && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Balance Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Current Balance</Label>
                          <Input value={accountInfo.currentBalance} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Available Balance</Label>
                          <Input value={accountInfo.availableBalance} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Customer Status</Label>
                          <Input value={accountInfo.clearedBalance} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Accrued Interest</Label>
                          <Input value={accountInfo.accruedInterest} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>COT Amount</Label>
                          <Input value={accountInfo.minimumBalance} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label>Accrued Fees</Label>
                          <Input value={accountInfo.accruedFees} readOnly />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Close Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="transferAccount">Transfer Account Number</Label>
                        <Input
                          id="transferAccount"
                          placeholder="Enter transfer account number"
                          value={transferAccount}
                          onChange={(e) => setTransferAccount(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                          id="reason"
                          placeholder="Enter reason for account closure"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sourceDoc" className="flex items-center gap-1">
                          <Upload className="h-4 w-4 mr-1 text-primary" />
                          Upload Document
                        </Label>
                        <Input
                          id="sourceDoc"
                          type="file"
                          onChange={(e) => setSourceDoc(e.target.files?.[0]?.name || "")}
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          Selected: {sourceDoc || "dummy-document.pdf"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Close Button */}
                  <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
                    <Button variant="destructive" onClick={() => alert("Account closed!")} className="w-full sm:w-auto">Close Account</Button>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default CloseAccount;
