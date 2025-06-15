
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState("site");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
      } else {
        setAuthenticated(true);
      }
    };
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
      else setAuthenticated(true);
    });
    checkAuth();
    return () => listener?.subscription.unsubscribe();
  }, [navigate]);

  if (!authenticated) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />
        <main className="flex-grow p-4 min-h-screen bg-background">
          <div className="flex justify-end mb-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/auth";
              }}
            >
              Log out
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
