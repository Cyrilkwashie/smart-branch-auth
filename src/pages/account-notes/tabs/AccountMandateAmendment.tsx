import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const AccountMandateAmendment: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    customerName: "",
    currentMandate: "",
    newMandate: "",
    amendmentType: "",
    effectiveDate: "",
    reason: "",
    supportingDocuments: [] as string[],
    remarks: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (document: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      supportingDocuments: checked
        ? [...prev.supportingDocuments, document]
        : prev.supportingDocuments.filter(doc => doc !== document)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account Mandate Amendment submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
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
                        <Label htmlFor="amendmentType">Amendment Type *</Label>
                        <Select value={formData.amendmentType} onValueChange={(value) => handleInputChange("amendmentType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select amendment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="add-signatory">Add Signatory</SelectItem>
                            <SelectItem value="remove-signatory">Remove Signatory</SelectItem>
                            <SelectItem value="change-authority">Change Authority Level</SelectItem>
                            <SelectItem value="update-details">Update Signatory Details</SelectItem>
                            <SelectItem value="transfer-mandate">Transfer Mandate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentMandate">Current Mandate</Label>
                      <Textarea
                        id="currentMandate"
                        value={formData.currentMandate}
                        onChange={(e) => handleInputChange("currentMandate", e.target.value)}
                        placeholder="Describe the current mandate"
                        rows={3}
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newMandate">New Mandate *</Label>
                      <Textarea
                        id="newMandate"
                        value={formData.newMandate}
                        onChange={(e) => handleInputChange("newMandate", e.target.value)}
                        placeholder="Describe the new mandate after amendment"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="reason">Reason for Amendment *</Label>
                        <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer-request">Customer Request</SelectItem>
                            <SelectItem value="legal-requirement">Legal Requirement</SelectItem>
                            <SelectItem value="business-change">Business Change</SelectItem>
                            <SelectItem value="error-correction">Error Correction</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Supporting Documents</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "ID Document",
                          "Mandate Form",
                          "Resolution Letter",
                          "Power of Attorney",
                          "Court Order",
                          "Other"
                        ].map((document) => (
                          <div key={document} className="flex items-center space-x-2">
                            <Checkbox
                              id={document}
                              checked={formData.supportingDocuments.includes(document)}
                              onCheckedChange={(checked) => handleCheckboxChange(document, checked as boolean)}
                            />
                            <Label htmlFor={document} className="text-sm font-normal">
                              {document}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remarks">Additional Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={formData.remarks}
                        onChange={(e) => handleInputChange("remarks", e.target.value)}
                        placeholder="Enter any additional remarks"
                        rows={2}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="px-8">
                        Submit Amendment
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setFormData({
                        accountNumber: "",
                        customerName: "",
                        currentMandate: "",
                        newMandate: "",
                        amendmentType: "",
                        effectiveDate: "",
                        reason: "",
                        supportingDocuments: [],
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

export default AccountMandateAmendment;