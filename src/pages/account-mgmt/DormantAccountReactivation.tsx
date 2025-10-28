import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Info, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const DormantAccountReactivation = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountData, setAccountData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Simulated account search
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      if (accountNumber) {
        setAccountData({
          accountNumber,
          accountName: "Ama Serwaa",
          customerID: "CUST-2021-332",
          // Uneditable fields
          productCode: "SAV-001",
          branchCode: "BR-APT-001",
          accountStatus: "Dormant",
          openDate: "2020-01-15",
          lastActivityDate: "2023-04-12",
          // Balance fields
          currentBalance: "5,230.00",
          availableBalance: "5,230.00",
          clearedBalance: "5,230.00",
          unclearedBalance: "0.00",
          minimumBalance: "100.00",
          overdraftLimit: "0.00",
          // Table data
          transactions: [
            { date: "2024-10-20", description: "Service Charge", debit: "10.00", credit: "", balance: "5,220.00" },
            { date: "2024-09-15", description: "ATM Withdrawal", debit: "200.00", credit: "", balance: "5,230.00" },
            { date: "2024-08-10", description: "Deposit", debit: "", credit: "1,000.00", balance: "5,430.00" },
            { date: "2024-07-05", description: "Transfer Out", debit: "500.00", credit: "", balance: "4,430.00" },
          ]
        });
      }
      setIsSearching(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reactivation submitted");
  };

  // Calculate total debit
  const calculateTotalDebit = () => {
    if (!accountData?.transactions) return "0.00";
    return accountData.transactions
      .reduce((sum: number, txn: any) => sum + (parseFloat(txn.debit) || 0), 0)
      .toFixed(2);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Dormant Account Reactivation</h1>
              <p className="text-sm text-muted-foreground">Search and reactivate dormant accounts</p>
            </div>
          </AppHeader>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
              {/* Search Account */}
              <Card className="border-0 shadow-md">
                <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSearch();
                        }}
                      />
                    </div>
                    <Button onClick={handleSearch} disabled={!accountNumber || isSearching}>
                      <Search className="mr-2 h-4 w-4" />
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Details */}
              {accountData && (
                <>

                  {/* Section 2: Uneditable Fields */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Account Details (System Fields)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productCode">A/C Name</Label>
                          <Input 
                            id="productCode" 
                            value={accountData.productCode} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branchCode">Currency</Label>
                          <Input 
                            id="branchCode" 
                            value={accountData.branchCode} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountStatus">Product</Label>
                          <Input 
                            id="accountStatus" 
                            value={accountData.accountStatus} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="openDate">Branch</Label>
                          <Input 
                            id="openDate" 
                            value={accountData.openDate} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastActivityDate">A/C Status</Label>
                          <Input 
                            id="lastActivityDate" 
                            value={accountData.lastActivityDate} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastActivityDate">Date Opened</Label>
                          <Input 
                            id="lastActivityDate" 
                            value={accountData.lastActivityDate} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                                                <div className="space-y-2">
                          <Label htmlFor="lastActivityDate">Date of Last Activity</Label>
                          <Input 
                            id="lastActivityDate" 
                            value={accountData.lastActivityDate} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                                                <div className="space-y-2">
                          <Label htmlFor="lastActivityDate">Level ID</Label>
                          <Input 
                            id="lastActivityDate" 
                            value={accountData.lastActivityDate} 
                            disabled 
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Remarks Section */}
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Reason</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter any additional remarks or notes"
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 3: Balance Section */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Balance Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentBalance">Current Balance</Label>
                          <Input id="currentBalance" defaultValue={accountData.currentBalance} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="availableBalance">Accrued Int</Label>
                          <Input id="availableBalance" defaultValue={accountData.availableBalance} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clearedBalance">COT Amount</Label>
                          <Input id="clearedBalance" defaultValue={accountData.clearedBalance} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="unclearedBalance">Current Balance</Label>
                          <Input id="unclearedBalance" defaultValue={accountData.unclearedBalance} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minimumBalance">Net Balance</Label>
                          <Input id="minimumBalance" defaultValue={accountData.minimumBalance} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Section 4: Transaction Table */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Change Code</TableHead>
                            <TableHead>Fee Amount</TableHead>
                            <TableHead className="text-right">Fee Amount Description</TableHead>
                            <TableHead className="text-right">Fee Description</TableHead>
                            <TableHead className="text-right">Fee Amount Per Book</TableHead>
                            <TableHead className="text-right">Currency</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {accountData.transactions.map((txn: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell>{txn.date}</TableCell>
                              <TableCell>{txn.description}</TableCell>
                              <TableCell className="text-right text-red-600">
                                {txn.debit || "-"}
                              </TableCell>
                              <TableCell className="text-right text-green-600">
                                {txn.credit || "-"}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {txn.balance}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/50 font-semibold">
                            <TableCell colSpan={2} className="text-right">Total:</TableCell>
                            <TableCell className="text-right text-red-600">
                              {calculateTotalDebit()}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-primary">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Reactivate Account
                    </Button>
                  </div>
                </>
              )}

              {/* Instructions Card */}
              {!accountData && (
                <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">How to Reactivate a Dormant Account</h3>
                        <ol className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">1.</span>
                            <span>Enter the account number and click Search</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">2.</span>
                            <span>Review account information and balance details</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">3.</span>
                            <span>Check recent transactions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">4.</span>
                            <span>Click Reactivate Account to submit</span>
                          </li>
                        </ol>
                      </div>
                    </div>
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

export default DormantAccountReactivation;
