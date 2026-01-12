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

const RelationRemoval: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    customerName: "",
    relationType: "",
    relatedAccount: "",
    relatedCustomerName: "",
    removalReason: "",
    effectiveDate: "",
    supportingDocuments: "",
    remarks: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Relation Removal submitted:", formData);
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
                Relation Removal
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Relation Removal</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Primary Account Number *</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="Enter primary account number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerName">Primary Customer Name</Label>
                        <Input
                          id="customerName"
                          value={formData.customerName}
                          onChange={(e) => handleInputChange("customerName", e.target.value)}
                          placeholder="Enter primary customer name"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="relationType">Relation Type *</Label>
                        <Select value={formData.relationType} onValueChange={(value) => handleInputChange("relationType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="joint-account">Joint Account Holder</SelectItem>
                            <SelectItem value="guardian">Guardian</SelectItem>
                            <SelectItem value="nominee">Nominee</SelectItem>
                            <SelectItem value="power-of-attorney">Power of Attorney</SelectItem>
                            <SelectItem value="authorized-signatory">Authorized Signatory</SelectItem>
                            <SelectItem value="beneficial-owner">Beneficial Owner</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="relatedAccount">Related Account Number *</Label>
                        <Input
                          id="relatedAccount"
                          value={formData.relatedAccount}
                          onChange={(e) => handleInputChange("relatedAccount", e.target.value)}
                          placeholder="Enter related account number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="relatedCustomerName">Related Customer Name</Label>
                        <Input
                          id="relatedCustomerName"
                          value={formData.relatedCustomerName}
                          onChange={(e) => handleInputChange("relatedCustomerName", e.target.value)}
                          placeholder="Enter related customer name"
                          readOnly
                        />
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="removalReason">Reason for Removal *</Label>
                      <Select value={formData.removalReason} onValueChange={(value) => handleInputChange("removalReason", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select removal reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer-request">Customer Request</SelectItem>
                          <SelectItem value="legal-separation">Legal Separation/Divorce</SelectItem>
                          <SelectItem value="death">Death of Related Party</SelectItem>
                          <SelectItem value="court-order">Court Order</SelectItem>
                          <SelectItem value="account-closed">Account Closed</SelectItem>
                          <SelectItem value="mandate-change">Mandate Change</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supportingDocuments">Supporting Documents</Label>
                      <Select value={formData.supportingDocuments} onValueChange={(value) => handleInputChange("supportingDocuments", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supporting documents" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="court-order">Court Order</SelectItem>
                          <SelectItem value="death-certificate">Death Certificate</SelectItem>
                          <SelectItem value="divorce-decree">Divorce Decree</SelectItem>
                          <SelectItem value="consent-letter">Consent Letter</SelectItem>
                          <SelectItem value="power-of-attorney">Power of Attorney</SelectItem>
                          <SelectItem value="account-closure-letter">Account Closure Letter</SelectItem>
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
                        placeholder="Enter any additional remarks for the relation removal"
                        rows={3}
                      />
                    </div>



                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                      <Button type="submit" variant="destructive" className="w-full sm:w-auto px-8">
                        Remove Relation
                      </Button>
                      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setFormData({
                        accountNumber: "",
                        customerName: "",
                        relationType: "",
                        relatedAccount: "",
                        relatedCustomerName: "",
                        removalReason: "",
                        effectiveDate: "",
                        supportingDocuments: "",
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

export default RelationRemoval;