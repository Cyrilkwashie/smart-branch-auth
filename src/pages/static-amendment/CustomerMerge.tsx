import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Plus } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface MergeAccount {
  accountNumber: string;
  accountName: string;
  balance: string;
}

interface AttachedDocument {
  id: number;
  documentType: string;
  scannedDocument: string;
}

const CustomerMerge: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [customerNumber, setCustomerNumber] = useState("---");
  const [customerCategory, setCustomerCategory] = useState("---");
  const [customerType, setCustomerType] = useState("---");
  const [mergeAccounts, setMergeAccounts] = useState<MergeAccount[]>([]);
  const [attachedDocuments, setAttachedDocuments] = useState<AttachedDocument[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [scannedDocument, setScannedDocument] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load customer data when account number is entered
  const loadCustomerData = (accNumber: string) => {
    if (!accNumber.trim()) {
      setCustomerNumber("---");
      setCustomerCategory("---");
      setCustomerType("---");
      setMergeAccounts([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock customer data
      setCustomerNumber(`CUST${accNumber.slice(-4)}`);
      setCustomerCategory("Individual");
      setCustomerType("Savings");

      // Mock merge accounts
      const mockAccounts: MergeAccount[] = [
        {
          accountNumber: accNumber,
          accountName: `Primary Account - ${accNumber}`,
          balance: "₦150,000.00",
        },
        {
          accountNumber: `ACC${accNumber.slice(-4)}001`,
          accountName: `Secondary Account - ${accNumber}`,
          balance: "₦75,000.00",
        },
      ];
      setMergeAccounts(mockAccounts);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    loadCustomerData(value);
  };

  const handleAddDocument = () => {
    if (!documentType || !scannedDocument) {
      alert("Please select document type and enter scanned document details");
      return;
    }

    const newDocument: AttachedDocument = {
      id: attachedDocuments.length + 1,
      documentType,
      scannedDocument,
    };

    setAttachedDocuments([...attachedDocuments, newDocument]);
    setDocumentType("");
    setScannedDocument("");
  };

  const handleRemoveDocument = (id: number) => {
    setAttachedDocuments(attachedDocuments.filter(doc => doc.id !== id));
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
                Customer Merge
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Account Information Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => handleAccountNumberChange(e.target.value)}
                        placeholder="Enter Account Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerNumber">Customer Number</Label>
                      <Input
                        id="customerNumber"
                        value={customerNumber}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerCategory">Customer Category</Label>
                      <Input
                        id="customerCategory"
                        value={customerCategory}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerType">Customer Type</Label>
                      <Input
                        id="customerType"
                        value={customerType}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Merge Accounts Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Merge Accounts</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                              Loading account data...
                            </TableCell>
                          </TableRow>
                        ) : mergeAccounts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                              {accountNumber.trim() ? "No accounts found for merging." : "Enter an Account Number to view mergeable accounts."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          mergeAccounts.map((account, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{account.accountNumber}</TableCell>
                              <TableCell>{account.accountName}</TableCell>
                              <TableCell>{account.balance}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Attached Documents Section */}
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Attached Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Add Document Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentType">Document Type</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Document Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id-card">ID Card</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                          <SelectItem value="marriage-certificate">Marriage Certificate</SelectItem>
                          <SelectItem value="bank-statement">Bank Statement</SelectItem>
                          <SelectItem value="proof-of-address">Proof of Address</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scannedDocument">Scanned Document</Label>
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <Input
                          id="scannedDocument"
                          value={scannedDocument}
                          onChange={(e) => setScannedDocument(e.target.value)}
                          placeholder="Enter document reference or upload path"
                        />
                        <Button variant="outline" size="icon" className="w-full sm:w-auto">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-start w-full gap-2">
                    <Button onClick={handleAddDocument} className="w-full sm:w-auto flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Document
                    </Button>
                  </div>

                  {/* Documents Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>S/No</TableHead>
                          <TableHead>Document Type</TableHead>
                          <TableHead>Scanned Document</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attachedDocuments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                              No documents attached yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          attachedDocuments.map((document) => (
                            <TableRow key={document.id}>
                              <TableCell className="font-medium">{document.id}</TableCell>
                              <TableCell>{document.documentType}</TableCell>
                              <TableCell>{document.scannedDocument}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveDocument(document.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </TableCell>
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

export default CustomerMerge;