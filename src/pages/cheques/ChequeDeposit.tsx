import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface ChequeRecord {
  seqNo: string;
  valueDate: string;
  chequeNo: string;
  cheqCategory: string;
  issuingBank: string;
  chequeAmount: string;
  narration: string;
}

export default function ChequeDeposit() {
  const [creditAccount, setCreditAccount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [noOfCheque, setNoOfCheque] = useState("");
  const [productType, setProductType] = useState("");
  const [sourceBranch, setSourceBranch] = useState("");
  
  const [chequeCategory, setChequeCategory] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [issuingBankCode, setIssuingBankCode] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [clearingAmount, setClearingAmount] = useState("");
  const [payerAccount, setPayerAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [voucherDate, setVoucherDate] = useState("");
  
  const [creditNarration, setCreditNarration] = useState("");
  const [debitNarration, setDebitNarration] = useState("");
  
  const [customerStatus, setCustomerStatus] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [ledgerBalance, setLedgerBalance] = useState("");
  const [availableLimit, setAvailableLimit] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  
  const [summaryAvailableBalance, setSummaryAvailableBalance] = useState("");
  const [summaryLedgerBalance, setSummaryLedgerBalance] = useState("");
  const [summaryAvailableLimit, setSummaryAvailableLimit] = useState("");
  const [summaryTotalCheque, setSummaryTotalCheque] = useState("");
  const [summaryTotalAmount, setSummaryTotalAmount] = useState("");
  
  const [records, setRecords] = useState<ChequeRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreditAccountChange = (value: string) => {
    setCreditAccount(value);
    if (value.length >= 10) {
      loadAccountData(value);
    } else {
      setProductType("");
      setSourceBranch("");
      setCustomerStatus("");
      setAvailableBalance("");
      setLedgerBalance("");
      setAvailableLimit("");
      setAccountStatus("");
      setRecords([]);
    }
  };

  const loadAccountData = (accNumber: string) => {
    setLoading(true);
    setTimeout(() => {
      setProductType("Savings Account");
      setSourceBranch("001");
      setCustomerStatus("Active");
      setAvailableBalance("25,000.00");
      setLedgerBalance("25,000.00");
      setAvailableLimit("50,000.00");
      setAccountStatus("Normal");
      
      setSummaryAvailableBalance("25,000.00");
      setSummaryLedgerBalance("25,000.00");
      setSummaryAvailableLimit("50,000.00");
      setSummaryTotalCheque("3");
      setSummaryTotalAmount("15,750.00");
      
      setRecords([
        {
          seqNo: "1",
          valueDate: "2024-03-10",
          chequeNo: "CHQ001234",
          cheqCategory: "Local",
          issuingBank: "GCB Bank",
          chequeAmount: "5,000.00",
          narration: "Cheque deposit for invoice payment",
        },
        {
          seqNo: "2",
          valueDate: "2024-03-11",
          chequeNo: "CHQ001235",
          cheqCategory: "Local",
          issuingBank: "Ecobank",
          chequeAmount: "7,500.00",
          narration: "Cheque deposit for goods supply",
        },
        {
          seqNo: "3",
          valueDate: "2024-03-12",
          chequeNo: "CHQ001236",
          cheqCategory: "Clearing",
          issuingBank: "Stanbic Bank",
          chequeAmount: "3,250.00",
          narration: "Cheque deposit for services rendered",
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
              <h1 className="text-3xl font-bold">Cheque Deposit</h1>
              <p className="text-muted-foreground">
                Process cheque deposits for customer accounts
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditAccount">Credit Account</Label>
                  <Input
                    id="creditAccount"
                    value={creditAccount}
                    onChange={(e) => handleCreditAccountChange(e.target.value)}
                    placeholder="Enter credit account"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="Enter total amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="noOfCheque">No of Cheque</Label>
                  <Input
                    id="noOfCheque"
                    value={noOfCheque}
                    onChange={(e) => setNoOfCheque(e.target.value)}
                    placeholder="Enter number of cheques"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Input
                    id="productType"
                    value={productType}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceBranch">Source Branch</Label>
                  <Input
                    id="sourceBranch"
                    value={sourceBranch}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Cheque Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chequeCategory">Cheque Category</Label>
                  <Select value={chequeCategory} onValueChange={setChequeCategory}>
                    <SelectTrigger id="chequeCategory">
                      <SelectValue placeholder="Select cheque category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="clearing">Clearing</SelectItem>
                      <SelectItem value="foreign">Foreign</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valueDate">Value Date</Label>
                  <Input
                    id="valueDate"
                    type="date"
                    value={valueDate}
                    onChange={(e) => setValueDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuingBankCode">Issuing Bank Code</Label>
                  <Select value={issuingBankCode} onValueChange={setIssuingBankCode}>
                    <SelectTrigger id="issuingBankCode">
                      <SelectValue placeholder="Select issuing bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gcb">GCB Bank</SelectItem>
                      <SelectItem value="ecobank">Ecobank</SelectItem>
                      <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                      <SelectItem value="absa">Absa Bank</SelectItem>
                      <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="clearingAmount">Clearing Amount</Label>
                  <Input
                    id="clearingAmount"
                    value={clearingAmount}
                    onChange={(e) => setClearingAmount(e.target.value)}
                    placeholder="Enter clearing amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payerAccount">Payer A/C</Label>
                  <Input
                    id="payerAccount"
                    value={payerAccount}
                    onChange={(e) => setPayerAccount(e.target.value)}
                    placeholder="Enter payer account"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voucherDate">Voucher Date</Label>
                  <Input
                    id="voucherDate"
                    type="date"
                    value={voucherDate}
                    onChange={(e) => setVoucherDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Narration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditNarration">Credit Narration</Label>
                  <Textarea
                    id="creditNarration"
                    value={creditNarration}
                    onChange={(e) => setCreditNarration(e.target.value)}
                    placeholder="Enter credit narration"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debitNarration">Debit Narration</Label>
                  <Textarea
                    id="debitNarration"
                    value={debitNarration}
                    onChange={(e) => setDebitNarration(e.target.value)}
                    placeholder="Enter debit narration"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Credit Account Balance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerStatus">Customer Status</Label>
                  <Input
                    id="customerStatus"
                    value={customerStatus}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableBalance">Available Balance</Label>
                  <Input
                    id="availableBalance"
                    value={availableBalance}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ledgerBalance">Ledger Balance</Label>
                  <Input
                    id="ledgerBalance"
                    value={ledgerBalance}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableLimit">Available Limit</Label>
                  <Input
                    id="availableLimit"
                    value={availableLimit}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountStatus">Account Status</Label>
                  <Input
                    id="accountStatus"
                    value={accountStatus}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="summaryAvailableBalance">Available Balance</Label>
                  <Input
                    id="summaryAvailableBalance"
                    value={summaryAvailableBalance}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summaryLedgerBalance">Ledger Balance</Label>
                  <Input
                    id="summaryLedgerBalance"
                    value={summaryLedgerBalance}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summaryAvailableLimit">Available Limit</Label>
                  <Input
                    id="summaryAvailableLimit"
                    value={summaryAvailableLimit}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summaryTotalCheque">Total Cheque</Label>
                  <Input
                    id="summaryTotalCheque"
                    value={summaryTotalCheque}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summaryTotalAmount">Total Amount</Label>
                  <Input
                    id="summaryTotalAmount"
                    value={summaryTotalAmount}
                    readOnly
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Cheque Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seq No</TableHead>
                    <TableHead>Value Date</TableHead>
                    <TableHead>Cheque No</TableHead>
                    <TableHead>Cheq Category</TableHead>
                    <TableHead>Issuing Bank</TableHead>
                    <TableHead>Cheque Amount</TableHead>
                    <TableHead>Narration</TableHead>
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
                        No cheque records found. Enter a credit account to load data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.seqNo}</TableCell>
                        <TableCell>{record.valueDate}</TableCell>
                        <TableCell>{record.chequeNo}</TableCell>
                        <TableCell>{record.cheqCategory}</TableCell>
                        <TableCell>{record.issuingBank}</TableCell>
                        <TableCell className="text-right">{record.chequeAmount}</TableCell>
                        <TableCell>{record.narration}</TableCell>
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
