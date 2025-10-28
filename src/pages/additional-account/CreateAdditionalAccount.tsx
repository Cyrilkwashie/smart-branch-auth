import { useState } from "react";
import { Plus, Search } from "lucide-react";
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

const CreateAdditionalAccount = () => {
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
        productGroup: "Savings",
        branch: "Main Branch",
      });
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating additional account...");
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
                <h1 className="text-3xl font-bold tracking-tight">Create Additional Account</h1>
              </div>

              {/* Search Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="accountNumber">Primary Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter primary account number"
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

                  {/* Additional Account Details */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Additional Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountType">Product Group</Label>
                          <Select>
                            <SelectTrigger id="accountType">
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="savings">Savings Account</SelectItem>
                              <SelectItem value="current">Current Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency *</Label>
                          <Select>
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select currency" />
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
                          <Label htmlFor="currency">Account Mandate</Label>
                          <Select>
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select mandate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GHS">G</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch *</Label>
                          <Select>
                            <SelectTrigger id="branch">
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main">Main Branch</SelectItem>
                              <SelectItem value="east">East Branch</SelectItem>
                              <SelectItem value="west">West Branch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                {accountData && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Primary Account Information */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Customer ID</Label>
                          <Input value={accountData.accountNumber} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Arm Officer</Label>
                          <Input value={accountData.accountName} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Customer Segment</Label>
                          <Input value={accountData.customerID} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label>Customer Sub Segment</Label>
                          <Input value={accountData.productGroup} disabled className="bg-muted" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Remarks */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks/Notes</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter any additional remarks or notes"
                          rows={4}
                          className="resize-none"
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
                      <Plus className="mr-2 h-4 w-4" />
                      Create Additional Account
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

export default CreateAdditionalAccount;
