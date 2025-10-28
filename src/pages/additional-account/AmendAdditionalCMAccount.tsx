import { useState } from "react";
import { Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AmendAdditionalCMAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAccountData({
        accountNumber: accountNumber,
        accountName: "John Doe",
        customerID: "CUST001",
        cmAccountType: "cm-savings",
        currency: "GHS",
        branch: "main",
        status: "Active",
        purpose: "business",
        minimumBalance: "500.00",
        currentBalance: "15,000.00",
      });
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Amending CM account...");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Amend Additional CM Account</h1>
              </div>

              {/* Search Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="accountNumber">CM Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter CM account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSearch} disabled={loading} className="mt-6">
                      <Search className="mr-2 h-4 w-4" />
                      {loading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Details Form */}
              {accountData && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Information */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">CM Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Account Number</Label>
                          <Input value={accountData.accountNumber} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Name</Label>
                          <Input value={accountData.accountName} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Customer ID</Label>
                          <Input value={accountData.customerID} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Current Balance</Label>
                          <Input value={accountData.currentBalance} disabled className="bg-muted" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Editable CM Account Details */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Update CM Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cmAccountType">CM Account Type *</Label>
                          <Select defaultValue={accountData.cmAccountType}>
                            <SelectTrigger id="cmAccountType">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm-savings">CM Savings Account</SelectItem>
                              <SelectItem value="cm-current">CM Current Account</SelectItem>
                              <SelectItem value="cm-special">CM Special Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency *</Label>
                          <Select defaultValue={accountData.currency}>
                            <SelectTrigger id="currency">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GHS">GHS</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Account Status *</Label>
                          <Select defaultValue={accountData.status.toLowerCase()}>
                            <SelectTrigger id="status">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="purpose">Account Purpose *</Label>
                          <Select defaultValue={accountData.purpose}>
                            <SelectTrigger id="purpose">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="business">Business Operations</SelectItem>
                              <SelectItem value="investment">Investment</SelectItem>
                              <SelectItem value="reserve">Reserve Fund</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minimumBalance">Minimum Balance *</Label>
                          <Input
                            id="minimumBalance"
                            type="number"
                            step="0.01"
                            defaultValue={accountData.minimumBalance}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Remarks */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Amendment Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Reason for Amendment *</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter reason for amendment"
                          rows={4}
                          className="resize-none"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AmendAdditionalCMAccount;
