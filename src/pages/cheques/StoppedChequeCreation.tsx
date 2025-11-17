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
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface FeeRecord {
  chgCode: string;
  feeAmount: string;
  feeAmountDescription: string;
  feeAmountPerBook: string;
  currency: string;
}

export default function StoppedChequeCreation() {
  const [accountNumber, setAccountNumber] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeAmount, setChequeAmount] = useState("");
  const [chequeNumberEnd, setChequeNumberEnd] = useState("");
  const [dateOnCheque, setDateOnCheque] = useState("");
  const [payeeInformation, setPayeeInformation] = useState("");
  const [timeReported, setTimeReported] = useState("");
  const [stopDate, setStopDate] = useState("");
  const [stopReason, setStopReason] = useState("");
  const [modeOfCommunication, setModeOfCommunication] = useState("");
  const [branch, setBranch] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
    if (value.length >= 10) {
      loadFeeData(value);
    } else {
      setFeeRecords([]);
    }
  };

  const loadFeeData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setFeeRecords([
        {
          chgCode: "STP001",
          feeAmount: "50.00",
          feeAmountDescription: "Cheque Stop Request Fee",
          feeAmountPerBook: "50.00",
          currency: "GHS",
        },
        {
          chgCode: "STP002",
          feeAmount: "25.00",
          feeAmountDescription: "Processing Fee",
          feeAmountPerBook: "25.00",
          currency: "GHS",
        },
        {
          chgCode: "STP003",
          feeAmount: "11.25",
          feeAmountDescription: "VAT on Stop Services",
          feeAmountPerBook: "11.25",
          currency: "GHS",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const calculateTotalFee = () => {
    return feeRecords.reduce((total, record) => {
      return total + parseFloat(record.feeAmount || "0");
    }, 0).toFixed(2);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold">Stopped Cheque Creation</h1>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">Cheque Information</CardTitle>
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
                  <Label htmlFor="chequeNumber">Cheque Number</Label>
                  <Input
                    id="chequeNumber"
                    value={chequeNumber}
                    onChange={(e) => setChequeNumber(e.target.value)}
                    placeholder="Enter cheque number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chequeAmount">Cheque Amount</Label>
                  <Input
                    id="chequeAmount"
                    value={chequeAmount}
                    onChange={(e) => setChequeAmount(e.target.value)}
                    placeholder="Enter cheque amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chequeNumberEnd">Cheque Number End</Label>
                  <Input
                    id="chequeNumberEnd"
                    value={chequeNumberEnd}
                    onChange={(e) => setChequeNumberEnd(e.target.value)}
                    placeholder="Enter cheque number end"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOnCheque">Date on Cheque</Label>
                  <Input
                    id="dateOnCheque"
                    type="date"
                    value={dateOnCheque}
                    onChange={(e) => setDateOnCheque(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payeeInformation">Payee Information</Label>
                  <Input
                    id="payeeInformation"
                    value={payeeInformation}
                    onChange={(e) => setPayeeInformation(e.target.value)}
                    placeholder="Enter payee information"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeReported">Time Reported</Label>
                  <Input
                    id="timeReported"
                    type="time"
                    value={timeReported}
                    onChange={(e) => setTimeReported(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stopDate">Stop Date</Label>
                  <Input
                    id="stopDate"
                    type="date"
                    value={stopDate}
                    onChange={(e) => setStopDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stopReason">Stop Reason</Label>
                  <Select value={stopReason} onValueChange={setStopReason}>
                    <SelectTrigger id="stopReason">
                      <SelectValue placeholder="Select stop reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="stolen">Stolen</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="unauthorized">Unauthorized</SelectItem>
                      <SelectItem value="fraud">Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modeOfCommunication">Mode of Communication</Label>
                  <Input
                    id="modeOfCommunication"
                    value={modeOfCommunication}
                    onChange={(e) => setModeOfCommunication(e.target.value)}
                    placeholder="Enter mode of communication"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Enter branch"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chargeAmount">Charge Amount</Label>
                  <Input
                    id="chargeAmount"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    placeholder="Enter charge amount"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">Fee Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chg Code</TableHead>
                    <TableHead>Fee Amount</TableHead>
                    <TableHead>Fee Amount Description</TableHead>
                    <TableHead>Fee Amount per Book</TableHead>
                    <TableHead>Currency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading fee information...
                      </TableCell>
                    </TableRow>
                  ) : feeRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No fee information available. Enter an account number to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    feeRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.chgCode}</TableCell>
                        <TableCell className="text-right">{record.feeAmount}</TableCell>
                        <TableCell>{record.feeAmountDescription}</TableCell>
                        <TableCell className="text-right">{record.feeAmountPerBook}</TableCell>
                        <TableCell>{record.currency}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                {feeRecords.length > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-bold">Total Fee:</TableCell>
                      <TableCell className="font-bold">{calculateTotalFee()} GHS</TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </CardContent>
          </Card>
        {/* Bottom Action Button */}
        </div> {/* Close container div */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full mt-8">
          <Button
            type="button"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base font-semibold rounded-md shadow-md transition-all"
            onClick={() => {/* TODO: Add submit or next action here */}}
          >
            Submit Stop Cheque Request
          </Button>
        </div>
      </main>
    </SidebarProvider>
  );
}
