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

const NewAccountMsg: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    stopCode: "",
    messageCode: "",
    otherMessage: "",
    expiryDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Account Message submitted:", formData);
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
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                New Account Message
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">New Account Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <Label htmlFor="stopCode">Stop Code *</Label>
                        <Select value={formData.stopCode} onValueChange={(value) => handleInputChange("stopCode", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stop code" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debit-stop">Debit Stop</SelectItem>
                            <SelectItem value="credit-stop">Credit Stop</SelectItem>
                            <SelectItem value="all-transactions">All Transactions Stop</SelectItem>
                            <SelectItem value="cheque-stop">Cheque Stop</SelectItem>
                            <SelectItem value="temporary-stop">Temporary Stop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="messageCode">Message Code *</Label>
                        <Select value={formData.messageCode} onValueChange={(value) => handleInputChange("messageCode", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select message code" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="account-frozen">Account Frozen</SelectItem>
                            <SelectItem value="insufficient-funds">Insufficient Funds</SelectItem>
                            <SelectItem value="account-closed">Account Closed</SelectItem>
                            <SelectItem value="dormant-account">Dormant Account</SelectItem>
                            <SelectItem value="legal-restraint">Legal Restraint</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otherMessage">Other Message</Label>
                        <Input
                          id="otherMessage"
                          value={formData.otherMessage}
                          onChange={(e) => handleInputChange("otherMessage", e.target.value)}
                          placeholder="Enter additional message if needed"
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

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                      <Button type="submit" className="w-full sm:w-auto px-8">
                        Create Message
                      </Button>
                      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setFormData({
                        accountNumber: "",
                        stopCode: "",
                        messageCode: "",
                        otherMessage: "",
                        expiryDate: "",
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

export default NewAccountMsg;