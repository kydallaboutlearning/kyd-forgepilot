
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  const [tab, setTab] = useState("site");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />
        <main className="flex-grow p-4 min-h-screen bg-background">
          <div className="flex justify-end mb-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                window.location.href = "/auth";
              }}
            >
              Go to Login
            </Button>
          </div>
          <SidebarTrigger />
          <Tabs value={tab} onValueChange={setTab} className="w-full max-w-4xl mx-auto">
            <TabsList className="mb-5 mx-auto flex justify-center w-fit">
              <TabsTrigger value="site">Site Settings</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio Projects</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
            </TabsList>
            <TabsContent value="site">
              <DashboardSiteSettings />
            </TabsContent>
            <TabsContent value="portfolio">
              <DashboardPortfolio />
            </TabsContent>
            <TabsContent value="social">
              <DashboardSocialLinks />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
}
