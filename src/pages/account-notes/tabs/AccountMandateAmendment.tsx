import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AccountMandateAmendment: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    newMandate: "",
    sourceDocument: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // When account number is entered, populate account name
    if (field === "accountNumber" && value.trim()) {
      // Simulate fetching account details based on account number
      // In a real application, this would be an API call
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          accountName: "John Doe", // Sample account name
        }));
      }, 500); // Simulate API delay
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account Mandate Amendment submitted:", formData);
    // Handle form submission logic here
  };

  const handleClear = () => {
    setFormData({
      accountNumber: "",
      accountName: "",
      newMandate: "",
      sourceDocument: "",
    });
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
                Account Mandate Amendment
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Mandate Amendment</CardTitle>
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
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                          id="accountName"
                          value={formData.accountName}
                          readOnly
                          placeholder="Account name will appear here"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newMandate">New Mandate *</Label>
                        <Select value={formData.newMandate} onValueChange={(value) => handleInputChange("newMandate", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new mandate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Mandate</SelectItem>
                            <SelectItem value="joint">Joint Mandate</SelectItem>
                            <SelectItem value="corporate">Corporate Mandate</SelectItem>
                            <SelectItem value="power-of-attorney">Power of Attorney</SelectItem>
                            <SelectItem value="trust">Trust Mandate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sourceDocument">Source Document *</Label>
                        <Select value={formData.sourceDocument} onValueChange={(value) => handleInputChange("sourceDocument", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source document" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="id-card">ID Card</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="mandate-form">Mandate Form</SelectItem>
                            <SelectItem value="resolution-letter">Resolution Letter</SelectItem>
                            <SelectItem value="power-of-attorney">Power of Attorney</SelectItem>
                            <SelectItem value="court-order">Court Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                      <Button type="submit" className="w-full sm:w-auto px-8">
                        Submit Amendment
                      </Button>
                      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={handleClear}>
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

export default AccountMandateAmendment;