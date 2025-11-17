import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ApprovalRecord {
  requisitionNumber: string;
  accountNumber: string;
  accountName: string;
  leavesNumber: string;
  requisitionDate: string;
  postedBy: string;
  noOfBooks: string;
  endPage: string;
}

export default function ChequebookMaintenanceApproval() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [records, setRecords] = useState<ApprovalRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadApprovalData(value);
    } else {
      setAccountName("");
      setRecords([]);
    }
  };

  const loadApprovalData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setAccountName("AMA SERWAA TRADING LIMITED");
      setRecords([
        {
          requisitionNumber: "REQ001240",
          accountNumber: accNumber,
          accountName: "AMA SERWAA TRADING LIMITED",
          leavesNumber: "50",
          requisitionDate: "2024-01-18",
          postedBy: "Sarah Williams",
          noOfBooks: "2",
          endPage: "1100",
        },
        {
          requisitionNumber: "REQ001241",
          accountNumber: accNumber,
          accountName: "AMA SERWAA TRADING LIMITED",
          leavesNumber: "75",
          requisitionDate: "2024-02-25",
          postedBy: "David Brown",
          noOfBooks: "3",
          endPage: "1175",
        },
        {
          requisitionNumber: "REQ001242",
          accountNumber: accNumber,
          accountName: "AMA SERWAA TRADING LIMITED",
          leavesNumber: "25",
          requisitionDate: "2024-03-15",
          postedBy: "Emily Davis",
          noOfBooks: "1",
          endPage: "1200",
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
            <div className="w-full">
              <h1 className="text-xl sm:text-3xl font-bold w-full">Chequebook Maintenance Approval</h1>
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
                  <Label htmlFor="branchNumber">Branch Number</Label>
                  <Select value={branchNumber} onValueChange={setBranchNumber}>
                    <SelectTrigger id="branchNumber">
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
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Approval Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requisition Number</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Leaves Number</TableHead>
                    <TableHead>Requisition Date</TableHead>
                    <TableHead>Posted By</TableHead>
                    <TableHead>No of Books</TableHead>
                    <TableHead>End Page</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading records...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No approval records found. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.requisitionNumber}</TableCell>
                        <TableCell>{record.accountNumber}</TableCell>
                        <TableCell>{record.accountName}</TableCell>
                        <TableCell>{record.leavesNumber}</TableCell>
                        <TableCell>{record.requisitionDate}</TableCell>
                        <TableCell>{record.postedBy}</TableCell>
                        <TableCell>{record.noOfBooks}</TableCell>
                        <TableCell>{record.endPage}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Bottom Action Button */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-8">
            <Button
              type="button"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base font-semibold rounded-md shadow-md transition-all"
              onClick={() => {/* TODO: Add submit or next action here */}}
            >
              Approve Maintenance
            </Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
