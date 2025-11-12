import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StatementRelation {
  relationNumber: string;
  name: string;
  modeOfDelivery: string;
}

export default function AccountStatementRequest() {
  const [accountNumber, setAccountNumber] = useState("");
  const [product, setProduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [statementFrequency, setStatementFrequency] = useState("");
  const [statementStartDate, setStatementStartDate] = useState("");
  const [nextStatementDate, setNextStatementDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relations, setRelations] = useState<StatementRelation[]>([]);

  const loadAccountData = () => {
    if (!accountNumber) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProduct("Savings Account");
      setCurrency("GHS - Ghana Cedis");
      setNextStatementDate("2024-02-15");
      
      // Load relations table
      setRelations([
        {
          relationNumber: "REL-001",
          name: "John Doe",
          modeOfDelivery: "Email"
        },
        {
          relationNumber: "REL-002",
          name: "Jane Smith",
          modeOfDelivery: "Postal"
        },
        {
          relationNumber: "REL-003",
          name: "Robert Johnson",
          modeOfDelivery: "Email"
        }
      ]);
      
      setIsLoading(false);
    }, 500);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadAccountData();
    }
  };

  const handleSubmitRequest = () => {
    // Handle statement request submission
    console.log("Submitting statement request for account:", accountNumber);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-6">
        <SidebarTrigger className="mb-4" />
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold">Account Statement Request</h1>
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Enter account number to load details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Input
                    id="product"
                    value={product}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={currency}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statement Details */}
          <Card>
            <CardHeader>
              <CardTitle>Statement Details</CardTitle>
              <CardDescription>Configure statement frequency and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="statementFrequency">Statement Frequency</Label>
                  <Select value={statementFrequency} onValueChange={setStatementFrequency}>
                    <SelectTrigger id="statementFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">Daily (01)</SelectItem>
                      <SelectItem value="02">Weekly (02)</SelectItem>
                      <SelectItem value="03">Monthly (03)</SelectItem>
                      <SelectItem value="04">Quarterly (04)</SelectItem>
                      <SelectItem value="05">Annual (05)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statementStartDate">Statement Start Date</Label>
                  <Input
                    id="statementStartDate"
                    type="date"
                    value={statementStartDate}
                    onChange={(e) => setStatementStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextStatementDate">Next Statement Date</Label>
                  <Input
                    id="nextStatementDate"
                    type="date"
                    value={nextStatementDate}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Relations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Statement Recipients</CardTitle>
              <CardDescription>List of recipients for account statements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relation Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mode of Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : relations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No relations found. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    relations.map((relation, index) => (
                      <TableRow key={index}>
                        <TableCell>{relation.relationNumber}</TableCell>
                        <TableCell>{relation.name}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            relation.modeOfDelivery === "Email" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {relation.modeOfDelivery}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={handleSubmitRequest}
              disabled={!accountNumber || !statementFrequency || !statementStartDate}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
