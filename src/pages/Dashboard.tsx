import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import DashboardSocialLinks from "@/components/admin/DashboardSocialLinks";
import DashboardAdminSettings from "@/components/admin/DashboardAdminSettings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAdminCredentials } from "@/hooks/useAdminCredentials";

export default function Dashboard() {
  const [tab, setTab] = useState("site");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { adminEmail, loading: loadingAdminCreds } = useAdminCredentials();

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      // Wait for adminEmail to load
      if (loadingAdminCreds) return;

      const { data } = await supabase.auth.getSession();
      const session = data.session;
      const loggedInEmail = session?.user?.email?.toLowerCase();
      const expectedEmail = adminEmail?.toLowerCase();

      if (!session || !loggedInEmail || !expectedEmail || loggedInEmail !== expectedEmail) {
        navigate("/auth", { replace: true });
      } else {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    // Correct: Get subscription from { data: { subscription } }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const loggedInEmail = session?.user?.email?.toLowerCase();
      const expectedEmail = adminEmail?.toLowerCase();
      if (!session || !loggedInEmail || !expectedEmail || loggedInEmail !== expectedEmail) {
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate, adminEmail, loadingAdminCreds]);

  if (loading || loadingAdminCreds) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101013] text-white text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#101013] w-full">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
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
