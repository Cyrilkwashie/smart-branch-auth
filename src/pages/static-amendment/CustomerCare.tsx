import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CareItem {
  title: string;
  url: string;
}

interface CareSection {
  title: string;
  items: CareItem[];
}

const CustomerCare: React.FC = () => {
  const careSections: CareSection[] = [
    {
      title: "General Enquiry",
      items: [
        { title: "Customer Engagement", url: "/customer-care/customer-engagement/item1" },
        { title: "Account Balance", url: "/customer-care/account-balance/item2" },
        { title: "Loan Proc Stage", url: "/customer-care/loan-proc-stage/item3" },
        { title: "Fixed Deposit", url: "/customer-care/fixed-deposit/item4" },
      ],
    },
    {
      title: "ATM Request",
      items: [
        { title: "ATM Request", url: "/customer-care/atm-request" },
        { title: "ATM Issuance", url: "/customer-care/atm-issuance" },
        { title: "Account Blockage", url: "/customer-care/account-blockage" },
        { title: "Card Status", url: "/customer-care/card-status" },
      ],
    },
    {
      title: "General Request",
      items: [
        { title: "A/C Statement", url: "/customer-care/general-request/item1" },
        { title: "Loan Statement", url: "/customer-care/general-request/item2" },
        { title: "Loan Quotation", url: "/customer-care/general-request/item3" },
        { title: "Invest Quotation", url: "/customer-care/general-request/item4" },
        { title: "SMS Alert", url: "/customer-care/general-request/item5" },
        { title: "Internet Banking", url: "/customer-care/general-request/item6" },
      ],
    },
    {
      title: "Cheque Maintenance",
      items: [
        { title: "Cheque Book Request", url: "/customer-care/cheque-book-request/item1" },
        { title: "Cheque Book Issuance", url: "/customer-care/cheque-book-issuance/item2" },
        { title: "Cheque Book Stoppage", url: "/customer-care/cheque-book-stoppage/item3" },
        { title: "Reactivate Stopped Cheque", url: "/customer-care/reactivate-stopped-cheque/item4" },
      ],
    },
    {
      title: "Account Opening",
      items: [
        { title: "Open Customer A/C", url: "/customer-care/account-opening/item1" },
        { title: "Open Additional A/C", url: "/customer-care/account-opening/item2" },
        { title: "Signature/Photo Capture", url: "/customer-care/account-opening/item3" },
        { title: "Fixed Deposit Creation", url: "/customer-care/account-opening/item4" },
      ],
    },
    {
      title: "A/C Risk/Maintenance",
      items: [
        { title: "Account Message/Note", url: "/customer-care/account-risk/item1" },
        { title: "A/C Mandate Change", url: "/customer-care/account-risk/item2" },
        { title: "A/C Risk Classify", url: "/customer-care/account-risk/item3" },
        { title: "A/C Blockage", url: "/customer-care/account-risk/item4" },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden overflow-y-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden pt-16 sm:pt-20">
          <AppHeader>

            <SidebarTrigger />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <span className="text-base sm:text-lg md:text-xl font-semibold truncate">
                Customer Care
              </span>
            </div>
          </AppHeader>
          <main className="p-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careSections.map((section, sectionIndex) => (
                  <Card key={sectionIndex} className="border shadow-sm">
                    <CardHeader className="bg-muted/30">
                      <CardTitle className="text-base">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <Button
                            key={itemIndex}
                            variant="ghost"
                            className="w-full justify-between h-auto p-3 hover:bg-muted/50"
                            onClick={() => {
                              // Navigate to the item's URL
                              window.location.href = item.url;
                            }}
                          >
                            <span className="text-left">{item.title}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerCare;