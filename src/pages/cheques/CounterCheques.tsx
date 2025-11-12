import { useState } from "react";
import { useLocation } from "react-router-dom";
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

interface EnquiryRecord {
  requisitionDate: string;
  accountNumber: string;
  accountDescription: string;
  chequeNumber: string;
  amount: string;
}

export default function CounterCheques() {
  const location = useLocation();
  const isApproval = location.pathname.includes("approval");
  
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadEnquiryData(value);
    } else {
      setAccountName("");
      setRecords([]);
    }
  };

  const loadEnquiryData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setAccountName("KOFI APPIAH ENTERPRISE");
      setRecords([
        {
          requisitionDate: "2024-01-10",
          accountNumber: accNumber,
          accountDescription: "KOFI APPIAH ENTERPRISE - Current Account",
          chequeNumber: "CC001234",
          amount: "5,000.00",
        },
        {
          requisitionDate: "2024-01-15",
          accountNumber: accNumber,
          accountDescription: "KOFI APPIAH ENTERPRISE - Current Account",
          chequeNumber: "CC001235",
          amount: "12,500.00",
        },
        {
          requisitionDate: "2024-02-05",
          accountNumber: accNumber,
          accountDescription: "KOFI APPIAH ENTERPRISE - Current Account",
          chequeNumber: "CC001236",
          amount: "8,750.00",
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
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">
                {isApproval ? "Counter Cheque Approval" : "Counter Cheque Enquiry"}
              </h1>
              <p className="text-muted-foreground">
                {isApproval 
                  ? "Review and approve counter cheque requests"
                  : "Search and view counter cheque records"
                }
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
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
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{isApproval ? "Approval Records" : "Enquiry Results"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requisition Date</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Account Description</TableHead>
                    <TableHead>Cheque Number</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading records...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No records found. Enter an account number to search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.requisitionDate}</TableCell>
                        <TableCell className="font-medium">{record.accountNumber}</TableCell>
                        <TableCell>{record.accountDescription}</TableCell>
                        <TableCell>{record.chequeNumber}</TableCell>
                        <TableCell className="text-right">{record.amount}</TableCell>
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
