import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { User, LayoutDashboard, Award, Search, CheckSquare, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const studentNav = [
  { title: "Dashboard", url: "/student", icon: LayoutDashboard },
  { title: "My Skills", url: "/student/skills", icon: Award },
  { title: "Profile", url: "/student/profile", icon: User },
];

const facultyNav = [
  { title: "Dashboard", url: "/faculty", icon: LayoutDashboard },
  { title: "Verify Skills", url: "/faculty/verify", icon: CheckSquare },
];

const recruiterNav = [
  { title: "Dashboard", url: "/recruiter", icon: LayoutDashboard },
  { title: "Browse Talent", url: "/recruiter/browse", icon: Search },
];

function AppSidebar() {
  const { user, logout } = useApp();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const location = useLocation();

  const nav = user?.role === "student" ? studentNav : user?.role === "faculty" ? facultyNav : recruiterNav;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-sidebar-primary shrink-0" />
          {!collapsed && <span className="text-lg font-bold text-sidebar-foreground">Hidden Genius</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          {!collapsed && user && (
            <div className="mb-3 px-2">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            onClick={handleLogout}
            className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border/60 px-4 bg-card">
            <SidebarTrigger className="mr-4" />
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
