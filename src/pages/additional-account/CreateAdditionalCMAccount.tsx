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

const CreateAdditionalCMAccount = () => {
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
    console.log("Creating additional CM account...");
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
                <h1 className="text-3xl font-bold tracking-tight">Create Additional CM Account</h1>
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
              {accountData && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Additional Account Information */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Additional Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerID">Customer ID *</Label>
                          <Input
                            id="customerID"
                            placeholder="Enter customer ID"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Name *</Label>
                          <Input
                            id="accountName"
                            placeholder="Enter account name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productGroup">Product Group *</Label>
                          <Select>
                            <SelectTrigger id="productGroup">
                              <SelectValue placeholder="Select product group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="savings">Savings</SelectItem>
                              <SelectItem value="current">Current</SelectItem>
                              <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                              <SelectItem value="loan">Loan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subGroup">Sub Group *</Label>
                          <Select>
                            <SelectTrigger id="subGroup">
                              <SelectValue placeholder="Select sub group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="regular">Regular</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
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
                          <Label htmlFor="sector">Sector *</Label>
                          <Select>
                            <SelectTrigger id="sector">
                              <SelectValue placeholder="Select sector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="agriculture">Agriculture</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="services">Services</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subSector">Sub Sector *</Label>
                          <Select>
                            <SelectTrigger id="subSector">
                              <SelectValue placeholder="Select sub sector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crop-production">Crop Production</SelectItem>
                              <SelectItem value="livestock">Livestock</SelectItem>
                              <SelectItem value="food-processing">Food Processing</SelectItem>
                              <SelectItem value="textile">Textile</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="wholesale">Wholesale</SelectItem>
                              <SelectItem value="software">Software</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                                                <div className="space-y-2">
                          <Label htmlFor="fxCategory">FX Category</Label>
                          <Select>
                            <SelectTrigger id="fxCategory">
                              <SelectValue placeholder="NONE" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crop-production">Foreign</SelectItem>
                              <SelectItem value="livestock">Forex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="frequencyOfStatement">Frequency of Statement *</Label>
                          <Select>
                            <SelectTrigger id="frequencyOfStatement">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                              <SelectItem value="on-demand">On Demand</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date *</Label>
                          <Input
                            id="startDate"
                            type="date"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="statementRequired">Statement Required *</Label>
                          <Select>
                            <SelectTrigger id="statementRequired">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CM Account Details */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <CardTitle className="text-lg">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sourceBranch">Source Branch</Label>
                          <Input
                            id="sourceBranch"
                            value="Main Branch - Accra"
                            disabled
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="armOfficer">ARM Officer</Label>
                          <Input
                            id="armOfficer"
                            value="Jane Smith"
                            disabled
                            className="bg-muted cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerSegment">Customer Segment</Label>
                          <Input
                            id="customerSegment"
                            value="Corporate"
                            disabled
                            className="bg-muted cursor-not-allowed"
                          />
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
                      Create CM Account
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

export default CreateAdditionalCMAccount;
