import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { Search, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Simple data model for demo purposes
interface LienRecord {
  id: string;
  accountNumber: string;
  accountName: string;
  amount: number; // lien amount
  currency: string;
  lienType: string;
  lienDate: string; // ISO string for simplicity
  expiryDate?: string; // ISO string
  status: "Active" | "Cancelled";
}

const seedData: LienRecord[] = [
  {
    id: "1",
    accountNumber: "0012345678",
    accountName: "ABC Manufacturing Ltd",
    amount: 50000,
    currency: "GHS",
    lienType: "2025-12-20",
    lienDate: "2025-09-15",
    expiryDate: "2026-09-15",
    status: "Active",
  },
  {
    id: "2",
    accountNumber: "0098765432",
    accountName: "John Doe",
    amount: 1200,
    currency: "USD",
    lienType: "2025-12-20",
    lienDate: "2025-08-02",
    expiryDate: undefined,
    status: "Active",
  },
  {
    id: "3",
    accountNumber: "0077778888",
    accountName: "XYZ Logistics",
    amount: 25000,
    currency: "GHS",
    lienType: "2025-12-20",
    lienDate: "2025-06-30",
    expiryDate: "2025-12-31",
    status: "Cancelled",
  },
];

function parseAmountQuery(query: string): { type: "range" | "exact"; min?: number; max?: number; value?: number } | undefined {
  const q = query.trim();
  if (!q) return undefined;
  if (q.includes("-")) {
    const [minStr, maxStr] = q.split("-", 2).map((s) => s.trim());
    const min = minStr ? Number(minStr) : undefined;
    const max = maxStr ? Number(maxStr) : undefined;
    if ((minStr && isNaN(min!)) || (maxStr && isNaN(max!))) return undefined;
    return { type: "range", min, max };
  }
  const val = Number(q);
  if (isNaN(val)) return undefined;
  return { type: "exact", value: val };
}

const LienCancellation = () => {
  const { toast } = useToast();
  const [data, setData] = useState<LienRecord[]>(seedData);
  const [accountQuery, setAccountQuery] = useState("");
  const [amountQuery, setAmountQuery] = useState("");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const filtered = useMemo(() => {
    const amountFilter = parseAmountQuery(amountQuery);
    return data.filter((r) => {
      const acctOk = accountQuery
        ? r.accountNumber.toLowerCase().includes(accountQuery.toLowerCase())
        : true;
      let amountOk = true;
      if (amountFilter) {
        if (amountFilter.type === "exact") {
          amountOk = r.amount === amountFilter.value;
        } else {
          const min = amountFilter.min ?? -Infinity;
          const max = amountFilter.max ?? Infinity;
          amountOk = r.amount >= min && r.amount <= max;
        }
      }
      return acctOk && amountOk;
    });
  }, [data, accountQuery, amountQuery]);

  const pendingCancel = cancelId ? data.find((d) => d.id === cancelId) : undefined;

  const onClear = () => {
    setAccountQuery("");
    setAmountQuery("");
  };

  const onConfirmCancel = () => {
    if (!cancelId) return;
    setData((prev) =>
      prev.map((r) => (r.id === cancelId ? { ...r, status: "Cancelled" } : r))
    );
    toast({
      title: "Lien cancelled",
      description: `Lien on account ${pendingCancel?.accountNumber} has been cancelled`,
    });
    setCancelId(null);
    setCancelReason("");
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Lien Cancellation</h1>
              <p className="text-sm text-muted-foreground">Search liens and cancel when appropriate</p>
            </div>
          </AppHeader>

          <main className="flex-1 p-3 overflow-x-hidden">
            <div className="w-full max-w-none space-y-4 animate-fade-in">
              {/* Search Bar */}
              <Card className="border-0 shadow-md w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Search</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-3 w-full">
                    {/* Account Search Field */}
                    <div className="w-full">
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={accountQuery}
                          onChange={(e) => setAccountQuery(e.target.value)}
                          placeholder="Account number"
                          className="pl-9 w-full min-w-0"
                          aria-label="Search by account number"
                        />
                      </div>
                    </div>
                    
                    {/* Amount Field */}
                    <div className="w-full">
                      <Input
                        value={amountQuery}
                        onChange={(e) => setAmountQuery(e.target.value)}
                        placeholder="Amount range"
                        className="w-full min-w-0"
                        aria-label="Search by amount"
                      />
                    </div>
                    
                    {/* Clear Button */}
                    <div className="w-full">
                      <Button 
                        variant="secondary" 
                        type="button" 
                        onClick={onClear} 
                        className="w-full"
                      >
                        <X className="mr-2 h-4 w-4" /> Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Accounts with Liens</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {filtered.length} result{filtered.length === 1 ? "" : "s"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Account Name</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Currency</TableHead>
                          <TableHead>Effective Date</TableHead>
                          <TableHead>Expiry</TableHead>
                          <TableHead>Renewal Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[120px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((row) => (
                          <TableRow key={row.id} className="hover:bg-muted/40">
                            <TableCell className="font-medium">{row.accountNumber}</TableCell>
                            <TableCell>{row.accountName}</TableCell>
                            <TableCell className="text-right">{row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell>{row.currency}</TableCell>
                            <TableCell>{row.lienType}</TableCell>
                            <TableCell>{format(new Date(row.lienDate), "PPP")}</TableCell>
                            <TableCell>{row.expiryDate ? format(new Date(row.expiryDate), "PPP") : "—"}</TableCell>
                            <TableCell>
                              <Badge className={row.status === "Active" ? "bg-green-500" : "bg-gray-400"}>{row.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={row.status !== "Active"}
                                    onClick={() => setCancelId(row.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" /> Cancel
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirm lien cancellation</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                      You are cancelling the lien on account <span className="font-medium">{row.accountNumber}</span> ({row.accountName}).
                                    </p>
                                    <div className="space-y-2">
                                      <Label htmlFor="reason">Reason (optional)</Label>
                                      <Textarea
                                        id="reason"
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        placeholder="Provide a reason for audit trail"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setCancelId(null)}>Close</Button>
                                    <Button variant="destructive" onClick={onConfirmCancel} disabled={!cancelId}>Confirm Cancel</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filtered.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                              No results. Adjust your search.
                            </TableCell>
                          </TableRow>
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

export default LienCancellation;
