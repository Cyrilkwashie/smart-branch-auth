import {
  Home,
  Users,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  TrendingUp,
  Building,
  CreditCard,
  UserPlus,
  BookCheck,
  MessageSquare,
  Shield,
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
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard Summary", url: "/dashboard", icon: Home },
  { title: "Customer Relationship", url: "/customers", icon: Users },
  {
    title: "Transaction & Account Management",
    url: "/transactions",
    icon: Building,
  },
  { title: "Analytics & Reporting", url: "/analytics", icon: TrendingUp },
  { title: "Operations & Compliance", url: "/operations", icon: Shield },
  {
    title: "Communication & Engagement",
    url: "/communication",
    icon: MessageSquare,
  },
  { title: "Cheque Book Request", url: "/cheque-request", icon: BookCheck },
  { title: "Card Request", url: "/card-request", icon: CreditCard },
  { title: "Account Opening", url: "/account-opening", icon: UserPlus },
  { title: "Settings", url: "/settings", icon: Settings },
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4 text-sidebar-foreground" />
                      <span className="text-sidebar-foreground">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
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
