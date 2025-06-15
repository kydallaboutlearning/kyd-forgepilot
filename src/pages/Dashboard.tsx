
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import DashboardSiteSettings from "@/components/admin/DashboardSiteSettings";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black">
        <AppSidebar />
        <main className="flex-grow p-4 min-h-screen bg-background">
          {/* In the future, use routes for each section, for now show site settings */}
          <SidebarTrigger />
          <DashboardSiteSettings />
        </main>
      </div>
    </SidebarProvider>
  );
}
