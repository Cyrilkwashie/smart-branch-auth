import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const EnquiryAccountMsg: React.FC = () => {
  const [searchData, setSearchData] = useState({
    accountNumber: "",
    serialNumber: "",
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

  const handleSearchInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (!searchData.accountNumber.trim() && !searchData.serialNumber.trim()) {
      // If no search criteria entered, show all messages
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

    // Filter messages by account number or serial number
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
      (searchData.accountNumber && message.accountNo.includes(searchData.accountNumber)) ||
      (searchData.serialNumber && message.accountNo.includes(searchData.serialNumber))
    );
    setAccountMessages(filteredMessages);
  };

  const handleClear = () => {
    setSearchData({
      accountNumber: "",
      serialNumber: "",
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
                Enquiry Account Message
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Enquiry Account Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-end">
                      <div className="flex-1 max-w-md">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={searchData.accountNumber}
                          onChange={(e) => handleSearchInputChange("accountNumber", e.target.value)}
                          placeholder="Enter account number"
                        />
                      </div>
                      <div className="flex-1 max-w-md">
                        <Label htmlFor="serialNumber">Serial Number</Label>
                        <Input
                          id="serialNumber"
                          value={searchData.serialNumber}
                          onChange={(e) => handleSearchInputChange("serialNumber", e.target.value)}
                          placeholder="Enter serial number"
                        />
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button onClick={handleSearch} className="w-full sm:w-auto">
                          Search
                        </Button>
                        <Button type="button" variant="outline" onClick={handleClear} className="w-full sm:w-auto">
                          Clear
                        </Button>
                      </div>
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
                          <TableRow key={index}>
                            <TableCell className="font-medium">{message.accountNo}</TableCell>
                            <TableCell>{message.accountDescription}</TableCell>
                            <TableCell>{message.stopCodeDescription}</TableCell>
                            <TableCell>{message.messageCodeDescription}</TableCell>
                            <TableCell>{message.otherMessage}</TableCell>
                            <TableCell>{message.postedBy}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  Print
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EnquiryAccountMsg;