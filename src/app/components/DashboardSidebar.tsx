"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  Wallet,
  LogOut,
  Plus,
  PlusCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

type UserRole = "seeker" | "recruiter" | "admin";

type MenuItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/jobs", icon: BriefcaseBusiness },
    { name: "Saved Jobs", url: "/dashboard/saved-jobs", icon: Bookmark },
    { name: "Applications", url: "/dashboard/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],

  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    { name: "Applications", url: "/dashboard/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],

  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/users", icon: Users },
    { name: "Companies", url: "/dashboard/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/jobs", icon: BriefcaseBusiness },
    { name: "Payments", url: "/dashboard/payments", icon: Wallet },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
};

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user;
  const role = user?.role as UserRole | undefined;

  const menuItems = role ? menuItemsByRole[role] : [];

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  if (isPending) {
    return (
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Loading dashboard...</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!user || !role || !(role in menuItemsByRole)) {
    return null;
  }

  return (
    <Sidebar className="border-r border-white/10 **:data-[sidebar=sidebar]:bg-[#09090b] *:data-[sidebar=sidebar]:text-white">
      {/* Header */}
      <SidebarHeader className="gap-5 p-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <Image
            src={"/images/logo.png"}
            alt="HireLoop Logo"
            width={150}
            height={150}
          />
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
          <Avatar className="size-9">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "User"}
            />
            <AvatarFallback className="bg-[#635bff] text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>

            <p className="text-xs capitalize text-white/50">
              {role === "admin" ? "Admin Console" : `${role} Portal`}
            </p>

            {role === "recruiter" && (
              <span className="mt-1 inline-block rounded-full bg-[#635bff]/20 px-2 py-0.5 text-[10px] text-[#a99fff]">
                Premium account
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  className="text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <item.icon className="size-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-3 p-4">
        {role === "seeker" && (
          <Button
            onClick={() => router.push("/dashboard/resume")}
            className="w-full bg-white text-black hover:bg-white/90"
          >
            <Plus className="size-4" />
            Post Resume
          </Button>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="text-white/60 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
