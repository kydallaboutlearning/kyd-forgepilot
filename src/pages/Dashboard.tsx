
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";
import DashboardPortfolio from "@/components/admin/DashboardPortfolio";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
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
    // subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
      else setAuthenticated(true);
    });
    checkAuth();
    return () => listener?.subscription.unsubscribe();
  }, [navigate]);

  if (!authenticated) return null;

  // For future: use routing/tabs for multiple dashboard sections
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />
        <main className="flex-grow p-4 min-h-screen bg-background">
          <div className="flex justify-end mb-2">
            <Button variant="secondary" size="sm" onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}>
              Log out
            </Button>
          </div>
          <SidebarTrigger />
          <DashboardSiteSettings />
          <DashboardPortfolio />
        </main>
      </div>
    </SidebarProvider>
  );
}
