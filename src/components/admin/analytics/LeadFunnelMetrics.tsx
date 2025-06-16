
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";

interface LeadFunnelMetricsProps {
  timeRange: string;
}

export default function LeadFunnelMetrics({ timeRange }: LeadFunnelMetricsProps) {
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

  // Lead submissions over time
  const { data: leadsOverTime } = useQuery({
    queryKey: ["leads-over-time", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("lead_submissions")
        .select("submitted_at")
        .gte("submitted_at", startDate.toISOString())
        .order("submitted_at");

      if (!data || data.length === 0) return [];

      const groupedByDate = data.reduce((acc, item) => {
        const date = new Date(item.submitted_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(groupedByDate)
        .map(([date, leads]) => ({ date, leads }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  });

  // Lead status breakdown
  const { data: leadStatusBreakdown } = useQuery({
    queryKey: ["lead-status-breakdown", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("lead_submissions")
        .select("status")
        .gte("submitted_at", startDate.toISOString());

      const counts = data?.reduce((acc, item) => {
        const status = item.status || "new";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return Object.entries(counts).map(([status, count]) => ({ status, count }));
    }
  });

  // Recent leads
  const { data: recentLeads } = useQuery({
    queryKey: ["recent-leads", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("lead_submissions")
        .select("*")
        .gte("submitted_at", startDate.toISOString())
        .order("submitted_at", { ascending: false })
        .limit(10);

      return data || [];
    }
  });

  // Average response time
  const { data: avgResponseTime } = useQuery({
    queryKey: ["avg-response-time", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("lead_submissions")
        .select("response_time_ms")
        .gte("submitted_at", startDate.toISOString())
        .not("response_time_ms", "is", null);

      if (!data || data.length === 0) return 0;

      const total = data.reduce((sum, item) => sum + (item.response_time_ms || 0), 0);
      return Math.round(total / data.length / 1000 / 60); // Convert to minutes
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "responded": return "bg-green-500";
      case "closed": return "bg-gray-500";
      case "lost": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Leads Over Time */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Lead Submissions Over Time</CardTitle>
          <CardDescription>Daily lead generation trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              leads: {
                label: "Leads",
                color: "#FFB74A",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="leads" stroke="#FFB74A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Lead Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Status Distribution</CardTitle>
          <CardDescription>Current status of all leads</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
                color: "#FFB74A",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadStatusBreakdown}>
                <XAxis dataKey="status" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#FFB74A" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Funnel Metrics</CardTitle>
          <CardDescription>Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Avg. Response Time</span>
            <Badge variant="secondary">{avgResponseTime} minutes</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Leads</span>
            <Badge variant="secondary">{recentLeads?.length || 0}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Lead Submissions</CardTitle>
          <CardDescription>Latest inquiries from potential clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLeads?.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{lead.name || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  {lead.message && (
                    <p className="text-sm text-muted-foreground mt-1 truncate max-w-md">
                      {lead.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(lead.status || "new")}>
                    {lead.status || "new"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(lead.submitted_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {(!recentLeads || recentLeads.length === 0) && (
              <p className="text-center text-muted-foreground py-4">No recent leads found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
