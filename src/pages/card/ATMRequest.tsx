import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ATMRequest() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountLink1, setAccountLink1] = useState("");
  const [accountLink2, setAccountLink2] = useState("");
  const [accountLink3, setAccountLink3] = useState("");
  
  const [channelId, setChannelId] = useState("");
  const [cardDisplayName, setCardDisplayName] = useState("");
  const [atmCardType, setAtmCardType] = useState("");
  const [deliveryChannel, setDeliveryChannel] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">ATM Request</h1>
              <p className="text-muted-foreground">
                Request ATM card for customer accounts
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Link Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountLink1">Account Link 1</Label>
                  <Select value={accountLink1} onValueChange={setAccountLink1}>
                    <SelectTrigger id="accountLink1">
                      <SelectValue placeholder="Select account link 1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="fixed">Fixed Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountLink2">Account Link 2</Label>
                  <Select value={accountLink2} onValueChange={setAccountLink2}>
                    <SelectTrigger id="accountLink2">
                      <SelectValue placeholder="Select account link 2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="fixed">Fixed Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountLink3">Account Link 3</Label>
                  <Select value={accountLink3} onValueChange={setAccountLink3}>
                    <SelectTrigger id="accountLink3">
                      <SelectValue placeholder="Select account link 3" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="fixed">Fixed Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channelId">Channel ID</Label>
                  <Input
                    id="channelId"
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                    placeholder="Enter channel ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardDisplayName">Card Display Name</Label>
                  <Input
                    id="cardDisplayName"
                    value={cardDisplayName}
                    onChange={(e) => setCardDisplayName(e.target.value)}
                    placeholder="Enter card display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="atmCardType">ATM Card Type</Label>
                  <Select value={atmCardType} onValueChange={setAtmCardType}>
                    <SelectTrigger id="atmCardType">
                      <SelectValue placeholder="Select ATM card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="verve">Verve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryChannel">Delivery Channel</Label>
                  <Select value={deliveryChannel} onValueChange={setDeliveryChannel}>
                    <SelectTrigger id="deliveryChannel">
                      <SelectValue placeholder="Select delivery channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branch">Branch</SelectItem>
                      <SelectItem value="courier">Courier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {deliveryChannel === "branch" && (
                  <div className="space-y-2">
                    <Label htmlFor="selectedBranch">Select Branch</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger id="selectedBranch">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="001">001</SelectItem>
                        <SelectItem value="002">002</SelectItem>
                        <SelectItem value="003">003</SelectItem>
                        <SelectItem value="004">004</SelectItem>
                        <SelectItem value="005">005</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {deliveryChannel === "courier" && (
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number"
                    />
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full mt-8">
          <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
          <Button className="w-full sm:w-auto">Request Card</Button>
        </div>
      </div>
    </main>
  </SidebarProvider>
  );
}
