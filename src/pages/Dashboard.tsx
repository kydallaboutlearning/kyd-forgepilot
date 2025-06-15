
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [tab, setTab] = useState("site");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-grow min-h-screen bg-gradient-to-br from-black to-[#18181c] transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-satoshi text-white">Dashboard</h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                  Manage your site settings, portfolio, and social links in one place.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-2 justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/auth";
                  }}
                >
                  Go to Login
                </Button>
                <SidebarTrigger />
              </div>
            </div>
            {/* Tabs inside glassy card */}
            <Card className="bg-[#15151b]/80 border-none shadow-2xl backdrop-blur-md">
              <CardContent className="py-8">
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="mb-6 flex justify-center w-full bg-[#23232a]/70">
                    <TabsTrigger value="site" className="font-medium text-base px-5 py-2">
                      Site Settings
                    </TabsTrigger>
                    <TabsTrigger value="portfolio" className="font-medium text-base px-5 py-2">
                      Portfolio Projects
                    </TabsTrigger>
                    <TabsTrigger value="social" className="font-medium text-base px-5 py-2">
                      Social Links
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="site" className="animate-fade-in">
                    <DashboardSiteSettings />
                  </TabsContent>
                  <TabsContent value="portfolio" className="animate-fade-in">
                    <DashboardPortfolio />
                  </TabsContent>
                  <TabsContent value="social" className="animate-fade-in">
                    <DashboardSocialLinks />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
