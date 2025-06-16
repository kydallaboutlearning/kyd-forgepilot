
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface WebsiteMetricsProps {
  timeRange: string;
}

const COLORS = ['#FFB74A', '#FF8A50', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

export default function WebsiteMetrics({ timeRange }: WebsiteMetricsProps) {
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

  // Page views by page
  const { data: pageViewsByPage } = useQuery({
    queryKey: ["page-views-by-page", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("page_views")
        .select("slug")
        .gte("viewed_at", startDate.toISOString());

      const counts = data?.reduce((acc, item) => {
        acc[item.slug] = (acc[item.slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return Object.entries(counts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views);
    }
  });

  // Device breakdown
  const { data: deviceBreakdown } = useQuery({
    queryKey: ["device-breakdown", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("page_views")
        .select("device_type")
        .gte("viewed_at", startDate.toISOString());

      const counts = data?.reduce((acc, item) => {
        const device = item.device_type || "Unknown";
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return Object.entries(counts).map(([device, count]) => ({ device, count }));
    }
  });

  // Traffic over time
  const { data: trafficOverTime } = useQuery({
    queryKey: ["traffic-over-time", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data } = await supabase
        .from("page_views")
        .select("viewed_at")
        .gte("viewed_at", startDate.toISOString())
        .order("viewed_at");

      if (!data || data.length === 0) return [];

      // Group by date
      const groupedByDate = data.reduce((acc, item) => {
        const date = new Date(item.viewed_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(groupedByDate)
        .map(([date, views]) => ({ date, views }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Page Views by Page */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Page Views by Page</CardTitle>
          <CardDescription>Most popular pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Views",
                color: "#FFB74A",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pageViewsByPage}>
                <XAxis dataKey="page" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="#FFB74A" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Traffic Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Over Time</CardTitle>
          <CardDescription>Daily page views trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Views",
                color: "#FFB74A",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="views" stroke="#FFB74A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Device Types</CardTitle>
          <CardDescription>Visitor device distribution</CardDescription>
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
              <PieChart>
                <Pie
                  data={deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {deviceBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
