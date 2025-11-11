import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface MaintenanceRecord {
  requisitionNumber: string;
  accountNumber: string;
  accountName: string;
  leavesNumber: string;
  requisitionDate: string;
  postedBy: string;
  startNo: string;
  endPage: string;
}

export default function ChequeMaintenance() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [channel, setChannel] = useState("");
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadMaintenanceData(value);
    } else {
      setAccountName("");
      setBranchNumber("");
      setRecords([]);
    }
  };

  const loadMaintenanceData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setAccountName("KWAME MENSAH ENTERPRISE");
      setBranchNumber("001");
      setRecords([
        {
          requisitionNumber: "REQ001234",
          accountNumber: accNumber,
          accountName: "KWAME MENSAH ENTERPRISE",
          leavesNumber: "50",
          requisitionDate: "2024-01-15",
          postedBy: "John Doe",
          startNo: "1001",
          endPage: "1050",
        },
        {
          requisitionNumber: "REQ001235",
          accountNumber: accNumber,
          accountName: "KWAME MENSAH ENTERPRISE",
          leavesNumber: "25",
          requisitionDate: "2024-02-20",
          postedBy: "Jane Smith",
          startNo: "1051",
          endPage: "1075",
        },
        {
          requisitionNumber: "REQ001236",
          accountNumber: accNumber,
          accountName: "KWAME MENSAH ENTERPRISE",
          leavesNumber: "100",
          requisitionDate: "2024-03-10",
          postedBy: "Mike Johnson",
          startNo: "1076",
          endPage: "1175",
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
              <h1 className="text-3xl font-bold">Chequebook Maintenance</h1>
              <p className="text-muted-foreground">
                Maintain and track chequebook records
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
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
                  <Label htmlFor="branchNumber">Branch Number</Label>
                  <Input
                    id="branchNumber"
                    value={branchNumber}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select value={channel} onValueChange={setChannel}>
                    <SelectTrigger id="channel">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branch">Branch</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="atm">ATM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
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
                    <TableHead>Start No</TableHead>
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
                        No maintenance records found. Enter an account number to load data.
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
                        <TableCell>{record.startNo}</TableCell>
                        <TableCell>{record.endPage}</TableCell>
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
