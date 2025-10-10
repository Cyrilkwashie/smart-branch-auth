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
  { title: "Customer Relationship", url: "/customers", icon: Users },
  {
    title: "Customer and Account Creation",
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
      { title: "Static Data Amendment", url: "/account-mgmt/static-data" },
      { title: "Account Statement Request", url: "/account-mgmt/statement" },
      { title: "Additional Account", url: "/account-mgmt/additional" },
      { title: "Lien Creation", url: "/account-mgmt/lien-creation" },
      { title: "Lien Cancellation", url: "/account-mgmt/lien-cancellation" },
      { title: "Account Closure", url: "/account-mgmt/closure" },
      { title: "Dormant Account Reactivation", url: "/account-mgmt/reactivation" },
      { title: "Account Blockage/Unblockage", url: "/account-mgmt/blockage" },
      { title: "ATM Request", url: "/account-mgmt/atm" },
      { title: "Account Notes", url: "/account-mgmt/notes" },
      { title: "Safe Custody", url: "/account-mgmt/safe-custody" },
    ],
  },
  {
    title: "Cheques",
    icon: FileCheck,
    subItems: [
      { title: "Counter Cheques", url: "/cheques/counter" },
      { title: "Chequebook Request", url: "/cheques/request" },
      { title: "Chequebook Maintenance", url: "/cheques/maintenance" },
      { title: "Chequebook Issuance", url: "/cheques/issuance" },
      { title: "Stopped Cheques", url: "/cheques/stopped" },
      { title: "Untagged Stopped Cheques", url: "/cheques/untagged" },
      { title: "Cheque Deposit", url: "/cheques/deposit" },
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
    title: "Treasury",
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
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible defaultOpen={false}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon className="h-4 w-4" />
                          <span className="group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-primary text-primary-foreground"
                                      : ""
                                  }
                                >
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
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
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                            : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
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
