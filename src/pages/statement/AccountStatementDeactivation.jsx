import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";

const freqOptions = [
  { label: "Daily (01)", value: "01" },
  { label: "Weekly (02)", value: "02" },
  { label: "Monthly (03)", value: "03" },
  { label: "Quarterly (04)", value: "04" },
  { label: "Annual (05)", value: "05" },
];

const mockData = [
  {
    reqId: "REQ-1001",
    accountLink: "1234567890",
    freqOfDays: "Weekly (02)",
    lastStatDate: "2024-05-01",
    nextStatDate: "2024-05-08",
    postingDate: "2024-05-01",
  },
  {
    reqId: "REQ-1002",
    accountLink: "9876543210",
    freqOfDays: "Monthly (03)",
    lastStatDate: "2024-04-01",
    nextStatDate: "2024-05-01",
    postingDate: "2024-04-01",
  },
];

export default function StatementDeactivation() {
  const [accountNumber, setAccountNumber] = useState("");
  const [freq, setFreq] = useState("");
  const [data, setData] = useState(mockData);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Statement Deactivation</h1>
            </div>
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                />
                <Select value={freq} onValueChange={setFreq}>
                  <SelectTrigger>
                    <SelectValue placeholder="Frequency of Days" />
                  </SelectTrigger>
                  <SelectContent>
                    {freqOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Deactivate Statement Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Deactivate Statement Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto w-full">
                <table className="w-full border rounded-lg text-xs sm:text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-2 py-2 sm:px-3 text-left">Req ID</th>
                      <th className="px-2 py-2 sm:px-3 text-left">Account Link</th>
                      <th className="px-2 py-2 sm:px-3 text-left">Freq of Days</th>
                      <th className="px-2 py-2 sm:px-3 text-left">Last Stat Date</th>
                      <th className="px-2 py-2 sm:px-3 text-left">Next Stat Date</th>
                      <th className="px-2 py-2 sm:px-3 text-left">Posting Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-2 py-2 sm:px-3">{row.reqId}</td>
                        <td className="px-2 py-2 sm:px-3">{row.accountLink}</td>
                        <td className="px-2 py-2 sm:px-3">{row.freqOfDays}</td>
                        <td className="px-2 py-2 sm:px-3">{row.lastStatDate}</td>
                        <td className="px-2 py-2 sm:px-3">{row.nextStatDate}</td>
                        <td className="px-2 py-2 sm:px-3">{row.postingDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full mt-8">
            <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
            <Button className="w-full sm:w-auto">Deactivate</Button>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}