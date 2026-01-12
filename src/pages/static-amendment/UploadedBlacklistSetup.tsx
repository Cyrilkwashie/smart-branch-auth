import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, UserMinus } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AccountInfo {
  accountNumber: string;
  accountBalance: string;
  product: string;
}

interface BlacklistCustomer {
  surname: string;
  name: string;
  middleName: string;
  dob: string;
  placeOfBirth: string;
  passport: string;
  id: string;
}

const UploadedBlacklistSetup: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reason, setReason] = useState("");
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [blacklistCustomers, setBlacklistCustomers] = useState<BlacklistCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load account data when search query is entered
  const loadAccountData = (query: string) => {
    if (!query.trim()) {
      setAccounts([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock account data
      const mockAccounts: AccountInfo[] = [
        {
          accountNumber: "1234567890",
          accountBalance: "₦500,000.00",
          product: "Savings Account",
        },
        {
          accountNumber: "0987654321",
          accountBalance: "₦250,000.00",
          product: "Current Account",
        },
        {
          accountNumber: "1122334455",
          accountBalance: "₦1,200,000.00",
          product: "Fixed Deposit",
        },
      ];
      setAccounts(mockAccounts);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  // Load blacklist data
  const loadBlacklistData = () => {
    // Mock blacklist data
    const mockBlacklist: BlacklistCustomer[] = [
      {
        surname: "Doe",
        name: "John",
        middleName: "Michael",
        dob: "1990-05-15",
        placeOfBirth: "Lagos, Nigeria",
        passport: "A12345678",
        id: "NGN123456789",
      },
      {
        surname: "Smith",
        name: "Jane",
        middleName: "Elizabeth",
        dob: "1985-08-22",
        placeOfBirth: "Abuja, Nigeria",
        passport: "B87654321",
        id: "NGN987654321",
      },
      {
        surname: "Johnson",
        name: "Bob",
        middleName: "William",
        dob: "1992-12-03",
        placeOfBirth: "Port Harcourt, Nigeria",
        passport: "C11223344",
        id: "NGN112233445",
      },
    ];
    setBlacklistCustomers(mockBlacklist);
  };

  // Load blacklist data on component mount
  React.useEffect(() => {
    loadBlacklistData();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    loadAccountData(value);
  };

  const handleAddToBlacklist = () => {
    if (!reason.trim()) {
      alert("Please enter a reason for blacklisting");
      return;
    }
    alert(`Customer added to blacklist. Reason: ${reason}`);
    setReason("");
  };

  const handleRemoveFromBlacklist = () => {
    alert("Customer removed from blacklist");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden overflow-y-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Uploaded Blacklist/Setup
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Internal Blacklisting Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Internal Blacklisting</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Search Bar */}
                  <div className="max-w-md">
                    <Label htmlFor="search">Search Customer (Name or Number)</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Enter customer name or number"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Mini Account Table */}
                  <div className="space-y-2">
                    <Label>Account Information</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-medium">Account Number</TableHead>
                            <TableHead className="font-medium">A/C Balance</TableHead>
                            <TableHead className="font-medium">Product</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {isLoading ? (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                                Loading account data...
                              </TableCell>
                            </TableRow>
                          ) : accounts.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                                {searchQuery.trim() ? "No accounts found for this search." : "Enter a search query to view account information."}
                              </TableCell>
                            </TableRow>
                          ) : (
                            accounts.map((account, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{account.accountNumber}</TableCell>
                                <TableCell>{account.accountBalance}</TableCell>
                                <TableCell>{account.product}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Reason Field and Buttons */}
                  <div className="space-y-4">
                    <div className="max-w-md">
                      <Label htmlFor="reason">Reason/Account Memo</Label>
                      <Input
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for blacklisting"
                        className="mt-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
                      <Button
                        onClick={handleAddToBlacklist}
                        className="flex items-center gap-2 w-full sm:w-auto"
                        variant="default"
                      >
                        <UserPlus className="h-4 w-4" />
                        Add to Blacklist
                      </Button>
                      <Button
                        onClick={handleRemoveFromBlacklist}
                        className="flex items-center gap-2 w-full sm:w-auto"
                        variant="outline"
                      >
                        <UserMinus className="h-4 w-4" />
                        Remove from Blacklist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blacklist Customers Table */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Blacklisted Customers</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Surname</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Middle Name</TableHead>
                          <TableHead>DOB</TableHead>
                          <TableHead>Place of Birth</TableHead>
                          <TableHead>Passport</TableHead>
                          <TableHead>ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blacklistCustomers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              No blacklisted customers found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          blacklistCustomers.map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{customer.surname}</TableCell>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>{customer.middleName}</TableCell>
                              <TableCell>{customer.dob}</TableCell>
                              <TableCell>{customer.placeOfBirth}</TableCell>
                              <TableCell>{customer.passport}</TableCell>
                              <TableCell>{customer.id}</TableCell>
                            </TableRow>
                          ))
                        )}
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

export default UploadedBlacklistSetup;