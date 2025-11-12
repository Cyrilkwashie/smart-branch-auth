import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AccountMinWaiver: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    customerName: "",
    accountType: "",
    currentBalance: "",
    minimumBalance: "",
    waiverType: "",
    waiverPeriod: "",
    waiverReason: "",
    approvalLevel: "",
    effectiveDate: "",
    expiryDate: "",
    remarks: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account Minimum Waiver submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary">
                Account Minimum Balance Waiver
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Minimum Balance Waiver</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                          id="customerName"
                          value={formData.customerName}
                          onChange={(e) => handleInputChange("customerName", e.target.value)}
                          placeholder="Enter customer name"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Input
                          id="accountType"
                          value={formData.accountType}
                          onChange={(e) => handleInputChange("accountType", e.target.value)}
                          placeholder="Account type"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentBalance">Current Balance</Label>
                        <Input
                          id="currentBalance"
                          value={formData.currentBalance}
                          onChange={(e) => handleInputChange("currentBalance", e.target.value)}
                          placeholder="Current account balance"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="minimumBalance">Minimum Balance Required</Label>
                        <Input
                          id="minimumBalance"
                          value={formData.minimumBalance}
                          onChange={(e) => handleInputChange("minimumBalance", e.target.value)}
                          placeholder="Minimum balance requirement"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="waiverType">Waiver Type *</Label>
                        <Select value={formData.waiverType} onValueChange={(value) => handleInputChange("waiverType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select waiver type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="temporary">Temporary Waiver</SelectItem>
                            <SelectItem value="permanent">Permanent Waiver</SelectItem>
                            <SelectItem value="conditional">Conditional Waiver</SelectItem>
                            <SelectItem value="partial">Partial Waiver</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="waiverPeriod">Waiver Period</Label>
                        <Select value={formData.waiverPeriod} onValueChange={(value) => handleInputChange("waiverPeriod", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select waiver period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-month">1 Month</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                            <SelectItem value="6-months">6 Months</SelectItem>
                            <SelectItem value="1-year">1 Year</SelectItem>
                            <SelectItem value="indefinite">Indefinite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="approvalLevel">Approval Level Required</Label>
                        <Select value={formData.approvalLevel} onValueChange={(value) => handleInputChange("approvalLevel", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select approval level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="branch-manager">Branch Manager</SelectItem>
                            <SelectItem value="regional-head">Regional Head</SelectItem>
                            <SelectItem value="zonal-head">Zonal Head</SelectItem>
                            <SelectItem value="head-office">Head Office</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Effective Date *</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={formData.effectiveDate}
                          onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="waiverReason">Reason for Waiver *</Label>
                      <Select value={formData.waiverReason} onValueChange={(value) => handleInputChange("waiverReason", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select waiver reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financial-hardship">Financial Hardship</SelectItem>
                          <SelectItem value="senior-citizen">Senior Citizen</SelectItem>
                          <SelectItem value="vip-customer">VIP Customer</SelectItem>
                          <SelectItem value="staff-account">Staff Account</SelectItem>
                          <SelectItem value="charity-organization">Charity Organization</SelectItem>
                          <SelectItem value="government-account">Government Account</SelectItem>
                          <SelectItem value="special-circumstances">Special Circumstances</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remarks">Additional Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={formData.remarks}
                        onChange={(e) => handleInputChange("remarks", e.target.value)}
                        placeholder="Enter any additional remarks for the waiver request"
                        rows={3}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                      <Button type="submit" className="w-full sm:w-auto px-8">
                        Request Waiver
                      </Button>
                      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setFormData({
                        accountNumber: "",
                        customerName: "",
                        accountType: "",
                        currentBalance: "",
                        minimumBalance: "",
                        waiverType: "",
                        waiverPeriod: "",
                        waiverReason: "",
                        approvalLevel: "",
                        effectiveDate: "",
                        expiryDate: "",
                        remarks: "",
                      })}>
                        Clear
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AccountMinWaiver;