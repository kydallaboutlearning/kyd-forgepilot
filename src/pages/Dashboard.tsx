
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [tab, setTab] = useState("site");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-black via-[#15151b] to-[#1d1d23] relative overflow-hidden">
        {/* Glassy Glowing Overlay */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
          <div className="absolute top-[-10%] left-[-5%] w-[80vw] h-[30vw] bg-indigo-700/30 blur-3xl rounded-full" />
          <div className="absolute bottom-[-10%] right-[-15%] w-[70vw] h-[35vw] bg-[#ffb74a]/10 blur-3xl rounded-full" />
        </div>
        {/* Sidebar */}
        <AppSidebar />
        {/* Main Content */}
        <main className="flex-grow min-h-screen relative z-10">
          {/* Floating Header */}
          <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-4 flex flex-col gap-3">
            <div className="relative bg-[#1c1e25]/80 rounded-2xl shadow-xl px-7 sm:px-14 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between ring-1 ring-accent/10 backdrop-blur-md border border-accent/10 mb-7 overflow-hidden">
              <div>
                <h1 className="text-4xl font-bold tracking-tight font-satoshi bg-clip-text text-transparent bg-gradient-to-r from-[#ffb74a] via-white/90 to-[#ffb74a]/90 drop-shadow-lg animate-fade-in">
                  Admin Dashboard
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mt-1 max-w-xl">
                  Effortlessly manage your site’s content, projects, and links in one stylish place.
                </p>
              </div>
              <div className="mt-6 sm:mt-0 flex gap-3 justify-end">
                <SidebarTrigger />
                {/* Add-on for user avatar or notifications here */}
              </div>
              {/* Decorative Glow */}
              <span className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffb74a]/30 via-transparent to-transparent rounded-full blur-2xl opacity-40 pointer-events-none" />
            </div>
          </div>
          {/* Content Tabs in Floating Card */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-8">
            <Card className="bg-[#191921]/80 shadow-2xl border-none backdrop-blur-xl rounded-2xl">
              <CardContent className="py-10 px-0 sm:px-7">
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="mb-8 mx-auto flex justify-center gap-2 w-full bg-[#23232a]/70 shadow border-0 rounded-xl backdrop-blur-md">
                    <TabsTrigger
                      value="site"
                      className="font-semibold text-base px-7 py-3 rounded-lg data-[state=active]:bg-[#ffb74a]/20 data-[state=active]:text-[#ffb74a] data-[state=active]:shadow-xl transition-all"
                    >
                      Site Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="portfolio"
                      className="font-semibold text-base px-7 py-3 rounded-lg data-[state=active]:bg-[#ffb74a]/20 data-[state=active]:text-[#ffb74a] data-[state=active]:shadow-xl transition-all"
                    >
                      Portfolio
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className="font-semibold text-base px-7 py-3 rounded-lg data-[state=active]:bg-[#ffb74a]/20 data-[state=active]:text-[#ffb74a] data-[state=active]:shadow-xl transition-all"
                    >
                      Social Links
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="site" className="animate-fade-in">
                    <section className="bg-[#1d1e23]/90 rounded-xl shadow-lg p-7 sm:p-10 mb-2 border border-accent/10">
                      <DashboardSiteSettings />
                    </section>
                  </TabsContent>
                  <TabsContent value="portfolio" className="animate-fade-in">
                    <section className="bg-[#1d1e23]/90 rounded-xl shadow-lg p-7 sm:p-10 mb-2 border border-accent/10">
                      <DashboardPortfolio />
                    </section>
                  </TabsContent>
                  <TabsContent value="social" className="animate-fade-in">
                    <section className="bg-[#1d1e23]/90 rounded-xl shadow-lg p-7 sm:p-10 mb-2 border border-accent/10">
                      <DashboardSocialLinks />
                    </section>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
