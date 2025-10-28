import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Save, 
  X, 
  Search, 
  Lock, 
  Unlock,
  AlertCircle,
  Info
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AccountBlockage = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountData, setAccountData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [actionType, setActionType] = useState<"block" | "unblock">("block");

  // Simulated account search
  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      if (accountNumber) {
        setAccountData({
          accountNumber: accountNumber,
          accountName: "John Doe",
          accountType: "Savings Account",
          currency: "GHS",
          availableBalance: "25,430.50",
          status: "Normal",  // or whatever status you want
          productGroup: "Retail Banking",
          productSubGroup: "Personal Savings",
          branch: "Downtown Branch",
          customerID: "CUST-2024-001",
        });
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Account Blockage/Unblockage</h1>
              <p className="text-sm text-muted-foreground">
                Block or unblock customer accounts
              </p>
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
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      onClick={handleSearch}
                      disabled={!accountNumber || isSearching}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Details */}
              {accountData && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Account Information
                      </span>
                      <Badge className={cn(
                        accountData.status === "N"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      )}>
                        {accountData.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Account Number</Label>
                          <p className="text-base font-semibold">{accountData.accountNumber}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Account Name</Label>
                          <p className="text-base font-semibold">{accountData.accountName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Account Type</Label>
                          <p className="text-base font-semibold">{accountData.accountType}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Currency</Label>
                          <p className="text-base font-semibold">{accountData.currency}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Available Balance</Label>
                          <p className="text-2xl font-bold text-green-600">
                            {accountData.currency} {accountData.availableBalance}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Customer ID</Label>
                          <p className="text-base font-semibold">{accountData.customerID}</p>
                        </div>
                      </div>
                    </div>

                    {/* Blockage Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 border-t pt-6">
                      {/* Action Type Selector */}


                      {/* System Fields Section */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          System Fields
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="productGroup">Product Group</Label>
                            <Input
                              id="productGroup"
                              value={accountData.productGroup}
                              disabled
                              className="bg-muted cursor-not-allowed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="productSubGroup">Product Sub Group</Label>
                            <Input
                              id="productSubGroup"
                              value={accountData.productSubGroup}
                              disabled
                              className="bg-muted cursor-not-allowed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Input
                              id="currency"
                              value={accountData.currency}
                              disabled
                              className="bg-muted cursor-not-allowed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accountStatus">Status</Label>
                            <Input
                              id="accountStatus"
                              value={accountData.status}
                              disabled
                              className="bg-muted cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Change Status Section */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          Status Change Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="changeStatus">Change Status *</Label>
                            <Select>
                              <SelectTrigger id="changeStatus">
                                <SelectValue placeholder="Select new status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="customer-request">Approval Required For Posting(AP)</SelectItem>
                                <SelectItem value="legal">A/C Is Stopped- No Posting and Enquiry(AS)</SelectItem>
                                <SelectItem value="kyc">A/C is Stopped- Approval Required for Postings(AA)</SelectItem>
                                <SelectItem value="dormant">Debit Block(DR)</SelectItem>
                                <SelectItem value="debt">No Debit Allowed Approval Needed(DA)</SelectItem>
                                <SelectItem value="investigation">Credit Block(CR)</SelectItem>
                                <SelectItem value="investigation">No Credit Allowed- Approval Needed(CA)</SelectItem>
                                <SelectItem value="investigation">Enquiry Restricted - Approval Needed(EN)</SelectItem>
                                <SelectItem value="other">Total Bloackage(BO)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="reason">Reason *</Label>
                            <Select>
                              <SelectTrigger id="reason">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Other Reason</SelectItem>
                                <SelectItem value="blocked">Wrong Information</SelectItem>
                                <SelectItem value="suspended">Duplication Error</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>


                      {/* Form Actions */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Button variant="outline" type="button">
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          className={cn(
                            actionType === "block"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          )}
                        >
                          {actionType === "block" ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Block Account
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4" />
                              Unblock Account
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
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

export default AccountBlockage;
