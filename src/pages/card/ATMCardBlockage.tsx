import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ATMCardBlockage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [reasonForBlockage, setReasonForBlockage] = useState("");
  const [userId, setUserId] = useState("");
  const [terminalId, setTerminalId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadAccountData = () => {
    if (!accountNumber) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserId("USER12345");
      setTerminalId("TERM-001-ATM-456");
      setBrandId("VISA-001");
      setIsLoading(false);
    }, 500);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadAccountData();
    }
  };

  const handleBlockCard = () => {
    // Handle card blockage logic
    console.log("Blocking card for account:", accountNumber);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-6">
        <SidebarTrigger className="mb-4" />
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">ATM Card Blockage</h1>
            <p className="text-muted-foreground">Block ATM cards for security purposes</p>
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Enter account number and reason for blockage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reasonForBlockage">Reason for Blockage</Label>
                  <Textarea
                    id="reasonForBlockage"
                    value={reasonForBlockage}
                    onChange={(e) => setReasonForBlockage(e.target.value)}
                    placeholder="Enter reason for blocking the ATM card"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Details (Auto-filled) */}
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
              <CardDescription>Automatically populated based on account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={userId}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terminalId">Terminal ID</Label>
                  <Input
                    id="terminalId"
                    value={terminalId}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandId">Brand ID</Label>
                  <Input
                    id="brandId"
                    value={brandId}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button 
              variant="destructive"
              onClick={handleBlockCard}
              disabled={!accountNumber || !reasonForBlockage}
            >
              Block Card
            </Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
