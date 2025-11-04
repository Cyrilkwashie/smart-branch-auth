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

const SpecialCustomerReg: React.FC = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    accountNumber: "",
    registrationType: "",
    specialCategory: "",
    registrationDate: "",
    expiryDate: "",
    reason: "",
    documentsRequired: [] as string[],
    remarks: "",
    approvalRequired: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (document: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      documentsRequired: checked
        ? [...prev.documentsRequired, document]
        : prev.documentsRequired.filter(doc => doc !== document)
    }));
  };

  const handleBooleanChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Special Customer Registration submitted:", formData);
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
                Special Customer Registration
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Special Customer Registration</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerId">Customer ID *</Label>
                        <Input
                          id="customerId"
                          value={formData.customerId}
                          onChange={(e) => handleInputChange("customerId", e.target.value)}
                          placeholder="Enter customer ID"
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
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registrationType">Registration Type *</Label>
                        <Select value={formData.registrationType} onValueChange={(value) => handleInputChange("registrationType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select registration type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vip">VIP Customer</SelectItem>
                            <SelectItem value="corporate">Corporate Client</SelectItem>
                            <SelectItem value="foreign">Foreign National</SelectItem>
                            <SelectItem value="senior">Senior Citizen</SelectItem>
                            <SelectItem value="minority">Minority Community</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialCategory">Special Category</Label>
                        <Select value={formData.specialCategory} onValueChange={(value) => handleInputChange("specialCategory", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select special category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="priority-service">Priority Service</SelectItem>
                            <SelectItem value="special-rates">Special Rates</SelectItem>
                            <SelectItem value="exempted-charges">Exempted Charges</SelectItem>
                            <SelectItem value="enhanced-limits">Enhanced Limits</SelectItem>
                            <SelectItem value="custom-services">Custom Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registrationDate">Registration Date *</Label>
                        <Input
                          id="registrationDate"
                          type="date"
                          value={formData.registrationDate}
                          onChange={(e) => handleInputChange("registrationDate", e.target.value)}
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
                      <Label htmlFor="reason">Reason for Special Registration *</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        placeholder="Provide detailed reason for special customer registration"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Documents Required</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "ID Proof",
                          "Address Proof",
                          "Income Certificate",
                          "Special Category Certificate",
                          "Authorization Letter",
                          "Other Supporting Documents"
                        ].map((document) => (
                          <div key={document} className="flex items-center space-x-2">
                            <Checkbox
                              id={document}
                              checked={formData.documentsRequired.includes(document)}
                              onCheckedChange={(checked) => handleCheckboxChange(document, checked as boolean)}
                            />
                            <Label htmlFor={document} className="text-sm font-normal">
                              {document}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="approvalRequired"
                        checked={formData.approvalRequired}
                        onCheckedChange={(checked) => handleBooleanChange("approvalRequired", checked as boolean)}
                      />
                      <Label htmlFor="approvalRequired" className="text-sm font-normal">
                        Approval from higher authority required
                      </Label>
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
                        Register Customer
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setFormData({
                        customerId: "",
                        customerName: "",
                        accountNumber: "",
                        registrationType: "",
                        specialCategory: "",
                        registrationDate: "",
                        expiryDate: "",
                        reason: "",
                        documentsRequired: [],
                        remarks: "",
                        approvalRequired: false,
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

export default SpecialCustomerReg;