import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";

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
    <SidebarTrigger>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader title="Statement Deactivation" />
        <main className="p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deactivate Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Account Number"
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
                <div className="overflow-x-auto">
                  <table className="min-w-full border rounded-lg">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-3 py-2 text-left">Req ID</th>
                        <th className="px-3 py-2 text-left">Account Link</th>
                        <th className="px-3 py-2 text-left">Freq of Days</th>
                        <th className="px-3 py-2 text-left">Last Stat Date</th>
                        <th className="px-3 py-2 text-left">Next Stat Date</th>
                        <th className="px-3 py-2 text-left">Posting Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-3 py-2">{row.reqId}</td>
                          <td className="px-3 py-2">{row.accountLink}</td>
                          <td className="px-3 py-2">{row.freqOfDays}</td>
                          <td className="px-3 py-2">{row.lastStatDate}</td>
                          <td className="px-3 py-2">{row.nextStatDate}</td>
                          <td className="px-3 py-2">{row.postingDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarTrigger>
  );
}