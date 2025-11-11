import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AccountMessage {
  accountNo: string;
  accountDescription: string;
  stopCodeDescription: string;
  messageCodeDescription: string;
  otherMessage: string;
  postedBy: string;
}

const CancelAccountMsg: React.FC = () => {
  const [searchData, setSearchData] = useState({
    accountNumber: "",
  });

  const [accountMessages, setAccountMessages] = useState<AccountMessage[]>([
    {
      accountNo: "1234567890",
      accountDescription: "Savings Account - John Doe",
      stopCodeDescription: "Debit Stop",
      messageCodeDescription: "Account Frozen",
      otherMessage: "Account temporarily frozen due to suspicious activity",
      postedBy: "Branch Manager - 001",
    },
    {
      accountNo: "1234567890",
      accountDescription: "Current Account - John Doe",
      stopCodeDescription: "All Transactions Stop",
      messageCodeDescription: "Legal Restraint",
      otherMessage: "Court order restraining all transactions",
      postedBy: "Compliance Officer - 002",
    },
    {
      accountNo: "0987654321",
      accountDescription: "Fixed Deposit - Jane Smith",
      stopCodeDescription: "Credit Stop",
      messageCodeDescription: "Insufficient Funds",
      otherMessage: "Account has insufficient funds for transactions",
      postedBy: "Operations Manager - 003",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<AccountMessage | null>(null);
  const [cancellationData, setCancellationData] = useState({
    accountNumber: "",
    accountName: "",
    stopCode: "",
    messageCode: "",
    otherMessage: "",
    cancellationReason: "",
  });

  const handleSearchInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (!searchData.accountNumber.trim()) {
      // If no account number entered, show all messages
      setAccountMessages([
        {
          accountNo: "1234567890",
          accountDescription: "Savings Account - John Doe",
          stopCodeDescription: "Debit Stop",
          messageCodeDescription: "Account Frozen",
          otherMessage: "Account temporarily frozen due to suspicious activity",
          postedBy: "Branch Manager - 001",
        },
        {
          accountNo: "1234567890",
          accountDescription: "Current Account - John Doe",
          stopCodeDescription: "All Transactions Stop",
          messageCodeDescription: "Legal Restraint",
          otherMessage: "Court order restraining all transactions",
          postedBy: "Compliance Officer - 002",
        },
        {
          accountNo: "0987654321",
          accountDescription: "Fixed Deposit - Jane Smith",
          stopCodeDescription: "Credit Stop",
          messageCodeDescription: "Insufficient Funds",
          otherMessage: "Account has insufficient funds for transactions",
          postedBy: "Operations Manager - 003",
        },
      ]);
      return;
    }

    // Filter messages by account number
    const allMessages = [
      {
        accountNo: "1234567890",
        accountDescription: "Savings Account - John Doe",
        stopCodeDescription: "Debit Stop",
        messageCodeDescription: "Account Frozen",
        otherMessage: "Account temporarily frozen due to suspicious activity",
        postedBy: "Branch Manager - 001",
      },
      {
        accountNo: "1234567890",
        accountDescription: "Current Account - John Doe",
        stopCodeDescription: "All Transactions Stop",
        messageCodeDescription: "Legal Restraint",
        otherMessage: "Court order restraining all transactions",
        postedBy: "Compliance Officer - 002",
      },
      {
        accountNo: "0987654321",
        accountDescription: "Fixed Deposit - Jane Smith",
        stopCodeDescription: "Credit Stop",
        messageCodeDescription: "Insufficient Funds",
        otherMessage: "Account has insufficient funds for transactions",
        postedBy: "Operations Manager - 003",
      },
    ];

    const filteredMessages = allMessages.filter(message =>
      message.accountNo.includes(searchData.accountNumber)
    );
    setAccountMessages(filteredMessages);
  };

  const handleClear = () => {
    setSearchData({
      accountNumber: "",
    });
    setAccountMessages([
      {
        accountNo: "1234567890",
        accountDescription: "Savings Account - John Doe",
        stopCodeDescription: "Debit Stop",
        messageCodeDescription: "Account Frozen",
        otherMessage: "Account temporarily frozen due to suspicious activity",
        postedBy: "Branch Manager - 001",
      },
      {
        accountNo: "1234567890",
        accountDescription: "Current Account - John Doe",
        stopCodeDescription: "All Transactions Stop",
        messageCodeDescription: "Legal Restraint",
        otherMessage: "Court order restraining all transactions",
        postedBy: "Compliance Officer - 002",
      },
      {
        accountNo: "0987654321",
        accountDescription: "Fixed Deposit - Jane Smith",
        stopCodeDescription: "Credit Stop",
        messageCodeDescription: "Insufficient Funds",
        otherMessage: "Account has insufficient funds for transactions",
        postedBy: "Operations Manager - 003",
      },
    ]);
    setSelectedMessage(null);
    setCancellationData({
      accountNumber: "",
      accountName: "",
      stopCode: "",
      messageCode: "",
      otherMessage: "",
      cancellationReason: "",
    });
  };

  const handleRowClick = (message: AccountMessage) => {
    setSelectedMessage(message);
    setCancellationData({
      accountNumber: message.accountNo,
      accountName: message.accountDescription.split(" - ")[1] || "",
      stopCode: message.stopCodeDescription,
      messageCode: message.messageCodeDescription,
      otherMessage: message.otherMessage,
      cancellationReason: "",
    });
  };

  const handleCancellationInputChange = (field: string, value: string) => {
    setCancellationData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancelMessage = () => {
    console.log("Cancel Account Message:", cancellationData);
    // Handle cancellation logic here
    alert("Message cancelled successfully!");
    setSelectedMessage(null);
    setCancellationData({
      accountNumber: "",
      accountName: "",
      stopCode: "",
      messageCode: "",
      otherMessage: "",
      cancellationReason: "",
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
                Cancel Account Message
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Cancel Account Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-end">
                      <div className="flex-1 max-w-md">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={searchData.accountNumber}
                          onChange={(e) => handleSearchInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>
                      <Button onClick={handleSearch} className="px-8">
                        Search
                      </Button>
                      <Button type="button" variant="outline" onClick={handleClear}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Messages</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account No</TableHead>
                          <TableHead>Account Description</TableHead>
                          <TableHead>Stop Code Description</TableHead>
                          <TableHead>Message Code Description</TableHead>
                          <TableHead>Other Message</TableHead>
                          <TableHead>Posted By</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accountMessages.map((message, index) => (
                          <TableRow
                            key={index}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleRowClick(message)}
                          >
                            <TableCell className="font-medium">{message.accountNo}</TableCell>
                            <TableCell>{message.accountDescription}</TableCell>
                            <TableCell>{message.stopCodeDescription}</TableCell>
                            <TableCell>{message.messageCodeDescription}</TableCell>
                            <TableCell>{message.otherMessage}</TableCell>
                            <TableCell>{message.postedBy}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(message);
                              }}>
                                Select
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {selectedMessage && (
                <Card className="border shadow-sm">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-base">Cancel Selected Message</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cancelAccountNumber">Account Number</Label>
                          <Input
                            id="cancelAccountNumber"
                            value={cancellationData.accountNumber}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Name</Label>
                          <Input
                            id="accountName"
                            value={cancellationData.accountName}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stopCode">Stop Code</Label>
                          <Input
                            id="stopCode"
                            value={cancellationData.stopCode}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="messageCode">Message Code</Label>
                          <Input
                            id="messageCode"
                            value={cancellationData.messageCode}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otherMessage">Other Message</Label>
                        <Input
                          id="otherMessage"
                          value={cancellationData.otherMessage}
                          readOnly
                          className="bg-muted"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cancellationReason">Cancellation Reason *</Label>
                        <Select value={cancellationData.cancellationReason} onValueChange={(value) => handleCancellationInputChange("cancellationReason", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cancellation reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="resolved">Issue Resolved</SelectItem>
                            <SelectItem value="duplicate">Duplicate Message</SelectItem>
                            <SelectItem value="incorrect">Incorrect Information</SelectItem>
                            <SelectItem value="expired">Message Expired</SelectItem>
                            <SelectItem value="customer-request">Customer Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Warning: This action cannot be undone
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>Cancelling this message will permanently remove it from the account. This action cannot be reversed.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button onClick={handleCancelMessage} variant="destructive" className="px-8">
                          Cancel Message
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setSelectedMessage(null);
                          setCancellationData({
                            accountNumber: "",
                            accountName: "",
                            stopCode: "",
                            messageCode: "",
                            otherMessage: "",
                            cancellationReason: "",
                          });
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CancelAccountMsg;