
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    customerNumber: "CUST-001",
    customerDescription: "John Doe - Main Account",
    deathDate: "2024-05-01",
    deathClaimLodge: "2024-05-10",
    dateSettlement: "2024-06-01",
    postedBy: "Admin User",
  },
  {
    customerNumber: "CUST-002",
    customerDescription: "Jane Smith - Joint Account",
    deathDate: "2024-04-15",
    deathClaimLodge: "2024-04-20",
    dateSettlement: "2024-05-10",
    postedBy: "Branch Officer",
  },
];

const flagOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const DeceasedCustomerEnquiry: React.FC = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [flag, setFlag] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [data, setData] = useState(mockData);

  // You can add a search/filter function here if needed

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden overflow-y-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>
            <SidebarTrigger />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Deceased Customer Enquiry
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="border shadow-sm">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-base">Deceased Customer Enquiry</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label htmlFor="customerNumber">Customer Number</Label>
                      <Input
                        id="customerNumber"
                        placeholder="Enter customer number"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="flag">Flag</Label>
                      <Select value={flag} onValueChange={setFlag}>
                        <SelectTrigger id="flag">
                          <SelectValue placeholder="Select flag" />
                        </SelectTrigger>
                        <SelectContent>
                          {flagOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="deathDate">Death Date</Label>
                      <Input
                        id="deathDate"
                        type="date"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-3 py-2 text-left">Customer Number</th>
                          <th className="px-3 py-2 text-left">Customer Description</th>
                          <th className="px-3 py-2 text-left">Death Date</th>
                          <th className="px-3 py-2 text-left">Death Claim Lodge</th>
                          <th className="px-3 py-2 text-left">Date Settlement</th>
                          <th className="px-3 py-2 text-left">Posted By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-3 py-2">{row.customerNumber}</td>
                            <td className="px-3 py-2">{row.customerDescription}</td>
                            <td className="px-3 py-2">{row.deathDate}</td>
                            <td className="px-3 py-2">{row.deathClaimLodge}</td>
                            <td className="px-3 py-2">{row.dateSettlement}</td>
                            <td className="px-3 py-2">{row.postedBy}</td>
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
      </div>
    </SidebarProvider>
  );
};

export default DeceasedCustomerEnquiry;