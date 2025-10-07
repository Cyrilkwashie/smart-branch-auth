import { Home, Users, DollarSign, FileText, Settings, LogOut, BarChart3 } from "lucide-react";
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
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Portfolio", url: "/portfolio", icon: DollarSign },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="font-bold text-lg">Smart Branch</span>
              <span className="text-xs text-muted-foreground">RM Dashboard</span>
            </div>
          )}
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
                          : "hover:bg-accent hover:text-accent-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
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
                onClick={() => window.location.href = "/"}
                className="hover:bg-destructive/10 hover:text-destructive w-full"
              >
                <LogOut className="h-4 w-4" />
                {open && <span>Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
