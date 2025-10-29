import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const AmendAdditionalCMAccount = () => {
  // Example mock data
  const tableData = [
    {
      accountNumber: "1234567890",
      accountName: "John Doe",
      customerID: "CUST001",
      cmAccountType: "CM Savings Account",
      currency: "GHS",
      status: "Active",
      branch: "Main Branch",
    },
    {
      accountNumber: "9876543210",
      accountName: "Jane Smith",
      customerID: "CUST002",
      cmAccountType: "CM Current Account",
      currency: "USD",
      status: "Inactive",
      branch: "East Branch",
    },
    // ...more rows
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <a href="/individual-joint-account-creation" className="text-base sm:text-lg md:text-xl font-semibold truncate text-primary hover:underline">
                Addtional Account
              </a>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                Amend Additional CM Account
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 overflow-x-auto">
                  <Table className="min-w-[800px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Account Description</TableHead>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Product Description</TableHead>
                        <TableHead>ARM Officer</TableHead>
                        <TableHead>Date Opened</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.accountNumber}</TableCell>
                          <TableCell>{row.accountName}</TableCell>
                          <TableCell>{row.customerID}</TableCell>
                          <TableCell>{row.cmAccountType}</TableCell>
                          <TableCell>{row.currency}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>{row.branch}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AmendAdditionalCMAccount;
