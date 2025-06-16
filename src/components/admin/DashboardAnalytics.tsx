
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, Eye, TrendingUp, MousePointer, Globe, Smartphone } from "lucide-react";
import WebsiteMetrics from "./analytics/WebsiteMetrics";
import LeadFunnelMetrics from "./analytics/LeadFunnelMetrics";
import ContentInsights from "./analytics/ContentInsights";

export default function DashboardAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");

  // Get date range based on selection
  const getDateRange = () => {
    const now = new Date();
    const ranges = {
      "24h": new Date(now.getTime() - 24 * 60 * 60 * 1000),
      "7d": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      "30d": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      "90d": new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    };
    return ranges[timeRange as keyof typeof ranges];
  };

  // Fetch overview metrics
  const { data: overviewMetrics } = useQuery({
    queryKey: ["overview-metrics", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      
      // Page views
      const { data: pageViews } = await supabase
        .from("page_views")
        .select("*")
        .gte("viewed_at", startDate.toISOString());

      // Lead submissions
      const { data: leads } = await supabase
        .from("lead_submissions")
        .select("*")
        .gte("submitted_at", startDate.toISOString());

      // Conversion events
      const { data: conversions } = await supabase
        .from("conversion_events")
        .select("*")
        .gte("event_at", startDate.toISOString());

      return {
        totalPageViews: pageViews?.length || 0,
        totalLeads: leads?.length || 0,
        totalConversions: conversions?.length || 0,
        conversionRate: pageViews?.length ? ((conversions?.length || 0) / pageViews.length * 100).toFixed(2) : "0.00",
        uniqueVisitors: new Set(pageViews?.map(pv => pv.session_id)).size || 0,
      };
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your website performance and business metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics?.totalPageViews || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics?.uniqueVisitors || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics?.totalLeads || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics?.totalConversions || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics?.conversionRate || "0.00"}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="website" className="space-y-4">
        <TabsList>
          <TabsTrigger value="website">Website Performance</TabsTrigger>
          <TabsTrigger value="leads">Lead Funnel</TabsTrigger>
          <TabsTrigger value="content">Content Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="website" className="space-y-4">
          <WebsiteMetrics timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <LeadFunnelMetrics timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentInsights timeRange={timeRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
