import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Sun, Moon } from "lucide-react";

export default function Dashboard() {
  const [tab, setTab] = useState("site");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#101013] w-full">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main Content */}
        <main className="flex-1 min-h-screen relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="text-primary" size={32} />
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
              </div>
              <p className="text-muted-foreground mt-2 text-base">
                Welcome back! Here’s what’s happening today.
              </p>
            </header>
            {/* Stats Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-[#191921] border border-border shadow-none">
                <CardContent className="py-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Projects</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">12</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#191921] border border-border shadow-none">
                <CardContent className="py-6">
                  <p className="text-sm text-muted-foreground mb-2">Active Users</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">51</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#191921] border border-border shadow-none">
                <CardContent className="py-6">
                  <p className="text-sm text-muted-foreground mb-2">Uptime</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">99.98%</span>
                  </div>
                </CardContent>
              </Card>
            </section>
            {/* Main content placeholder */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="rounded-lg border border-border bg-[#16161a] p-6 flex flex-col gap-2">
                <button className="py-2 px-4 rounded bg-primary text-primary-foreground max-w-xs font-semibold hover:bg-primary/80 transition">
                  New Project
                </button>
                <button className="py-2 px-4 rounded bg-muted text-foreground max-w-xs font-semibold hover:bg-muted/80 transition">
                  View Portfolio
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
