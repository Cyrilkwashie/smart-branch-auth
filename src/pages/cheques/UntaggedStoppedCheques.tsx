import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UntaggedRecord {
  requisitionId: string;
  accountNumber: string;
  accountDescription: string;
  amount: string;
  chequeStop: string;
  range: string;
  dateStopped: string;
}

export default function UntaggedStoppedCheques() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");
  const [records, setRecords] = useState<UntaggedRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadUntaggedData(value);
    } else {
      setAccountName("");
      setBranch("");
      setRecords([]);
    }
  };

  const loadUntaggedData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setAccountName("AKUA BOATENG VENTURES");
      setBranch("003");
      setRecords([
        {
          requisitionId: "REQ001450",
          accountNumber: accNumber,
          accountDescription: "AKUA BOATENG VENTURES - Savings Account",
          amount: "15,000.00",
          chequeStop: "CS001234",
          range: "100001-100050",
          dateStopped: "2024-01-20",
        },
        {
          requisitionId: "REQ001451",
          accountNumber: accNumber,
          accountDescription: "AKUA BOATENG VENTURES - Savings Account",
          amount: "8,500.00",
          chequeStop: "CS001235",
          range: "100051-100075",
          dateStopped: "2024-02-10",
        },
        {
          requisitionId: "REQ001452",
          accountNumber: accNumber,
          accountDescription: "AKUA BOATENG VENTURES - Savings Account",
          amount: "22,300.00",
          chequeStop: "CS001236",
          range: "100076-100100",
          dateStopped: "2024-03-05",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6 sticky top-0 z-30 bg-background/90 backdrop-blur shadow-sm">
            <SidebarTrigger />
            <div>
              <h1 className="text-base sm:text-xl md:text-3xl font-bold">Untagged Stopped Cheques</h1>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={accountName}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={branch}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Untagged Stopped Cheque Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requisition ID</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Account Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cheque Stop</TableHead>
                    <TableHead>Range</TableHead>
                    <TableHead>Date Stopped</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading records...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No untagged stopped cheque records found. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.requisitionId}</TableCell>
                        <TableCell>{record.accountNumber}</TableCell>
                        <TableCell>{record.accountDescription}</TableCell>
                        <TableCell className="text-right">{record.amount}</TableCell>
                        <TableCell>{record.chequeStop}</TableCell>
                        <TableCell>{record.range}</TableCell>
                        <TableCell>{record.dateStopped}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}
