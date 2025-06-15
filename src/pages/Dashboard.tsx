import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import DashboardAdminSettings from "@/components/admin/DashboardAdminSettings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const [tab, setTab] = useState("site");

  // Header height to match Header.tsx (80px)
  const HEADER_HEIGHT = 80;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#101013] w-full">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main Content */}
        <main className="flex-1 min-h-screen" style={{ paddingTop: HEADER_HEIGHT }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="text-primary" size={32} />
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
              </div>
              <p className="text-muted-foreground mt-2 text-base">
                Manage your site content and admin account here.
              </p>
            </header>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="site">Site Settings</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="social">Social Links</TabsTrigger>
              </TabsList>
              <TabsContent value="admin" className="w-full">
                <DashboardAdminSettings />
              </TabsContent>
              <TabsContent value="site" className="w-full">
                <DashboardSiteSettings />
              </TabsContent>
              <TabsContent value="portfolio" className="w-full">
                <DashboardPortfolio />
              </TabsContent>
              <TabsContent value="social" className="w-full">
                <DashboardSocialLinks />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
