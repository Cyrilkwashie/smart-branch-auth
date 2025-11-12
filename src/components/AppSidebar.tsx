import {
  Home,
  Users,
  UserPlus,
  Building2,
  Settings,
  LogOut,
  BarChart3,
  FileCheck,
  Wallet,
  RefreshCw,
  CreditCard,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Customer Management", url: "/customers", icon: Users },
  {
    title: "Account Creation",
    icon: UserPlus,
    subItems: [
      { title: "Individual/Joint Account Creation", url: "/account-creation/individual" },
      { title: "Corporate Account Creation", url: "/account-creation/corporate" },
    ],
  },
  {
    title: "Account Management",
    icon: Building2,
    subItems: [
      {
        title: "Additional Account",
        subItems: [
          { title: "Create Additional CM Account", url: "/additional-account/create-cm" },
          { title: "Amend Additional CM Account", url: "/additional-account/amend-cm" },
        ]
      },
      { title: "Lien Creation", url: "/account-mgmt/lien-creation" },
      { title: "Lien Cancellation", url: "/account-mgmt/lien-cancellation" },
      {
        title: "Account Closure",
        icon: LogOut,
        subItems: [
          { title: "Close Account", url: "/close-account/close" },
          { title: "Close Account by Draft", url: "/close-account/by-draft" },
        ],
      },
      { title: "Dormant Account Reactivation", url: "/account-mgmt/reactivation" },
      { title: "Account Blockage/Unblockage", url: "/account-mgmt/blockage" },
      {
        title: "Safe Custody",
        subItems: [
          { title: "Safe Custody Register Enquiry", url: "/safe-custody/register-enquiry" },
          { title: "Safe Custody Creation", url: "/safe-custody/creation" },
          { title: "Safe Custody Liquidation", url: "/safe-custody/liquidation" },
        ],
      },
      {
        title: "Account Notes",
        subItems: [
          { title: "New Account Msg", url: "/account-notes/new-account-msg" },
          { title: "Enquiry Account Msg", url: "/account-notes/enquiry-account-msg" },
          { title: "Cancel Account Msg", url: "/account-notes/cancel-account-msg" },
          { title: "Account Mandate Amendment", url: "/account-notes/mandate-amendment" },
          { title: "Special Customer Reg", url: "/account-notes/special-customer-reg" },
          { title: "PC Bulk Upload", url: "/account-notes/pc-bulk-upload" },
          { title: "Relation Removal", url: "/account-notes/relation-removal" },
          { title: "Account Min Waiver", url: "/account-notes/account-min-waiver" },
        ],
      },
      {
        title: "Static Amendment",
        subItems: [
          { title: "Add Customer Relationship", url: "/static-amendment/add-customer-relationship" },
          { title: "Customer Care", url: "/static-amendment/customer-care" },
          { title: "Approve Customer Relationship", url: "/static-amendment/approve-customer-relationship" },
          { title: "Deceased Customer", url: "/static-amendment/deceased-customer" },
          { title: "Customer Mapping Enquiry", url: "/static-amendment/customer-mapping-enquiry" },
          { title: "Deceased Customer Enquiry", url: "/static-amendment/deceased-customer-enquiry" },
          { title: "Amend Customer Sector Segment", url: "/static-amendment/amend-customer-sector-segment" },
          { title: "Uploaded Blacklist/Setup", url: "/static-amendment/uploaded-blacklist-setup" },
          { title: "Customer Type Retagging", url: "/static-amendment/customer-type-retagging" },
          { title: "Customer Type Retagging App", url: "/static-amendment/customer-type-retagging-app" },
          { title: "Customer MDA Code Tagging", url: "/static-amendment/customer-mda-code-tagging" },
          { title: "Customer Merge", url: "/static-amendment/customer-merge" },
          { title: "Customer Merge Verification", url: "/static-amendment/customer-merge-verification" },
          { title: "Customer Merge Approval", url: "/static-amendment/customer-merge-approval" },
          { title: "Amend Customer Relationship", url: "/static-amendment/amend-customer-relationship" },
          { title: "Risk Review", url: "/static-amendment/risk-review" },
          { title: "Risk Review Approval", url: "/static-amendment/risk-review-approval" },
          { title: "Risk Review Compliance App", url: "/static-amendment/risk-review-compliance-app" }
        ]
      },
    ],
  },
  {
    title: "Requests",
    icon: FileCheck,
    subItems: [
      {
        title: "Cheques",
        subItems: [
          { 
            title: "Counter Cheques",
            subItems: [
              { title: "Counter Cheque Enquiry", url: "/cheques/counter-enquiry" },
              { title: "Counter Cheque Approval", url: "/cheques/counter-approval" },
            ]
          },
          { title: "Chequebook Request", url: "/cheques/request" },
          { title: "Chequebook Maintenance", url: "/cheques/maintenance" },
          { title: "Chequebook Maintenance Approval", url: "/cheques/maintenance-approval" },
          { title: "Chequebook Issuance", url: "/cheques/issuance" },
          { 
            title: "Stopped Cheques",
            subItems: [
              { title: "Stopped Cheque Creation", url: "/cheques/stopped-creation" },
              { title: "Untagged Stopped Cheques", url: "/cheques/untagged-stopped" },
            ]
          },
          { title: "Cheque Deposit", url: "/cheques/deposit" },
        ]
      },
      {
        title: "Statement",
        subItems: [
          { title: "Account Statement Request", url: "/account-mgmt/statement" },
          { title: "Statement Deactivation", url: "/account-mgmt/statement-deactivation" },
        ]
      },
      {
        title: "Card",
        subItems: [
          { title: "ATM Request", url: "/account-mgmt/atm" },
          { title: "ATM Card Issuance", url: "/card/atm-issuance" },
          { title: "ATM Card Blockage", url: "/card/atm-blockage" },
          { title: "ATM PIN Regenerating", url: "/card/atm-pin-regenerating" },
        ]
      }
    ],
  },
  {
    title: "Teller Transactions",
    icon: Wallet,
    subItems: [
      { title: "Cash Deposit", url: "/teller/cash-deposit" },
      { title: "Cash Withdrawal", url: "/teller/cash-withdrawal" },
      { title: "Cheque Withdrawal", url: "/teller/cheque-withdrawal" },
      { title: "Multi-Currency Deposit", url: "/teller/multi-deposit" },
      { title: "Multi-Currency Withdrawal", url: "/teller/multi-withdrawal" },
      { title: "Counter Cheque Withdrawal", url: "/teller/counter-withdrawal" },
      { title: "Email Withdrawal", url: "/teller/email-withdrawal" },
      { title: "Manager's Cheque Settlement", url: "/teller/cheque-settlement" },
      { title: "Manager's Cheque Cancellation", url: "/teller/cheque-cancellation" },
      { title: "International Money Transfer Payout", url: "/teller/imt-payout" },
    ],
  },
  {
    title: "Backoffice Trans",
    icon: Settings,
    subItems: [
      { title: "Branch Journal Posting", url: "/backoffice/journal" },
      { title: "Standing Order", url: "/backoffice/standing-order" },
    ],
  },
  {
    title: "Teller/Vault Cash Activities",
    icon: Building2,
    subItems: [
      { title: "Denomination Exchange", url: "/vault/denomination" },
      { title: "Cash Transfer to Vault", url: "/vault/transfer-to-vault" },
      { title: "Cash Request from Teller", url: "/vault/cash-request" },
      { title: "Cash Movement Outward", url: "/vault/movement-outward" },
    ],
  },
  {
    title: "Transaction Reversals",
    icon: RefreshCw,
    subItems: [
      { title: "Batch Reversal", url: "/reversals/batch" },
      { title: "Sameday Reversals", url: "/reversals/sameday" },
    ],
  },
  {
    title: "Credit",
    icon: CreditCard,
    subItems: [
      { title: "Loan Origination", url: "/credit/loan-origination" },
      { title: "Temporal Overdraft", url: "/credit/overdraft" },
    ],
  },
  {
    title: "Investment",
    icon: TrendingUp,
    subItems: [
      { title: "Treasury Bill", url: "/treasury/bill" },
      { title: "Fixed Deposit", url: "/treasury/fixed-deposit" },
      { title: "Call Accounts", url: "/treasury/call-accounts" },
    ],
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-sidebar-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg text-sidebar-foreground">
              Smart Branch
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-7">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon className="h-4 w-4 text-sidebar-foreground" />
                          <span className="group-data-[collapsible=icon]:hidden text-sidebar-foreground">
                            {item.title}
                          </span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              {subItem.subItems ? (
                                <Collapsible defaultOpen={subItem.title === "Cheques"} className="group/sub-collapsible">
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton tooltip={subItem.title}>
                                      <span className="text-sidebar-foreground">{subItem.title}</span>
                                      <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-180" />
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {subItem.subItems.map((nestedItem) => (
                                        <SidebarMenuSubItem key={nestedItem.title} className="mb-1">
                                          {nestedItem.subItems ? (
                                            <Collapsible className="group/nested-collapsible">
                                              <CollapsibleTrigger asChild>
                                                <SidebarMenuSubButton tooltip={nestedItem.title} className="h-9">
                                                  <span className="text-sidebar-foreground">{nestedItem.title}</span>
                                                  <ChevronDown className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/nested-collapsible:rotate-180" />
                                                </SidebarMenuSubButton>
                                              </CollapsibleTrigger>
                                              <CollapsibleContent className="mt-1">
                                                <SidebarMenuSub>
                                                  {nestedItem.subItems.map((deepItem) => (
                                                    <SidebarMenuSubItem key={deepItem.title} className="mb-1">
                                                      <SidebarMenuSubButton asChild tooltip={deepItem.title} className="h-9 pl-6">
                                                        <NavLink
                                                          to={deepItem.url}
                                                          className={({ isActive }) =>
                                                            isActive
                                                              ? "bg-blue-100 font-semibold text-sidebar-accent-foreground"
                                                              : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                                                          }
                                                        >
                                                          <span className="text-sidebar-foreground">{deepItem.title}</span>
                                                        </NavLink>
                                                      </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                  ))}
                                                </SidebarMenuSub>
                                              </CollapsibleContent>
                                            </Collapsible>
                                          ) : (
                                            <SidebarMenuSubButton asChild tooltip={nestedItem.title} className="h-9">
                                              <NavLink
                                                to={nestedItem.url}
                                                className={({ isActive }) =>
                                                  isActive
                                                    ? "bg-blue-100 font-semibold text-sidebar-accent-foreground"
                                                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                                                }
                                              >
                                                <span className="text-sidebar-foreground">{nestedItem.title}</span>
                                              </NavLink>
                                            </SidebarMenuSubButton>
                                          )}
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <SidebarMenuSubButton asChild tooltip={subItem.title}>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      isActive
                                        ? "bg-blue-100 font-semibold text-sidebar-accent-foreground"
                                        : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                                    }
                                  >
                                    <span className="text-sidebar-foreground">{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              )}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-blue-100 font-semibold text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                        }
                      >
                        <item.icon className="h-4 w-4 text-sidebar-foreground" />
                        <span className="group-data-[collapsible=icon]:hidden text-sidebar-foreground">
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button
                onClick={() => (window.location.href = "/")}
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4 text-sidebar-foreground" />
                <span className="text-sidebar-foreground">Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
