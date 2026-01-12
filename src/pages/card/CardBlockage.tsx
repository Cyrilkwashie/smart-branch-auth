import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function CardBlockage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [reason, setReason] = useState("");
  const [cardData, setCardData] = useState([
    {
      pan: "4532********1234",
      cardType: "VISA",
      cardStatus: "Active",
      expiryDate: "12/27"
    },
    {
      pan: "4532********5678",
      cardType: "MasterCard",
      cardStatus: "Blocked",
      expiryDate: "08/26"
    }
  ]);

  const handleBlockAccount = () => {
    // Implement blockage logic here
    alert(`Account ${accountNumber} blocked for reason: ${reason}`);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden overflow-y-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden pt-16 sm:pt-20">
        <AppHeader>
          <SidebarTrigger />
        </AppHeader>
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">ATM Card Blockage</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Block ATM cards by account number and reason</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-2 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Blockage</Label>
                    <Input
                      id="reason"
                      value={reason}
                      onChange={e => setReason(e.target.value)}
                      placeholder="Enter reason for blockage"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    className="w-full sm:w-auto"
                    variant="destructive"
                    onClick={handleBlockAccount}
                    disabled={!accountNumber || !reason}
                  >
                    Block Account
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Card Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">List of cards for this account</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm border rounded-lg">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">PAN</th>
                        <th className="px-4 py-2 text-left">Card Type</th>
                        <th className="px-4 py-2 text-left">Card Status</th>
                        <th className="px-4 py-2 text-left">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cardData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center text-muted-foreground py-4">No card data found.</td>
                        </tr>
                      ) : (
                        cardData.map((card, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-4 py-2 break-words max-w-[120px]">{card.pan}</td>
                            <td className="px-4 py-2">{card.cardType}</td>
                            <td className="px-4 py-2">{card.cardStatus}</td>
                            <td className="px-4 py-2">{card.expiryDate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
