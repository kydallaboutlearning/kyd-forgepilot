
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, TrendingUp } from "lucide-react";

interface ContentInsightsProps {
  timeRange: string;
}

export default function ContentInsights({ timeRange }: ContentInsightsProps) {
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

  // Portfolio views
  const { data: portfolioViews } = useQuery({
    queryKey: ["portfolio-views", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data: pageViews } = await supabase
        .from("page_views")
        .select("slug")
        .like("slug", "/portfolio%")
        .gte("viewed_at", startDate.toISOString());

      const { data: portfolioItems } = await supabase
        .from("portfolio_items")
        .select("id, title, order_index");

      const viewCounts = pageViews?.reduce((acc, pv) => {
        acc[pv.slug] = (acc[pv.slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return portfolioItems?.map(item => ({
        title: item.title || `Portfolio Item ${item.id}`,
        views: viewCounts[`/portfolio/${item.id}`] || 0,
        id: item.id
      })).sort((a, b) => b.views - a.views) || [];
    }
  });

  // Blog performance
  const { data: blogViews } = useQuery({
    queryKey: ["blog-views", timeRange],
    queryFn: async () => {
      const startDate = getDateRange();
      const { data: pageViews } = await supabase
        .from("page_views")
        .select("slug")
        .like("slug", "/blog%")
        .gte("viewed_at", startDate.toISOString());

      const { data: blogPosts } = await supabase
        .from("blog")
        .select("slug, title, published_at");

      const viewCounts = pageViews?.reduce((acc, pv) => {
        acc[pv.slug] = (acc[pv.slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return blogPosts?.map(post => ({
        title: post.title,
        slug: post.slug,
        views: viewCounts[`/blog/${post.slug}`] || 0,
        published_at: post.published_at
      })).sort((a, b) => b.views - a.views) || [];
    }
  });

  // Content last updated
  const { data: contentUpdates } = useQuery({
    queryKey: ["content-updates"],
    queryFn: async () => {
      const updates = [];

      // Portfolio items
      const { data: portfolioItems } = await supabase
        .from("portfolio_items")
        .select("title, id")
        .order("order_index");

      // Blog posts
      const { data: blogPosts } = await supabase
        .from("blog")
        .select("title, slug, last_updated")
        .order("last_updated", { ascending: false })
        .limit(5);

      // Pages
      const { data: pages } = await supabase
        .from("pages")
        .select("title, slug, last_updated")
        .order("last_updated", { ascending: false })
        .limit(5);

      if (blogPosts) {
        updates.push(...blogPosts.map(post => ({
          title: post.title,
          type: "Blog Post",
          slug: `/blog/${post.slug}`,
          last_updated: post.last_updated
        })));
      }

      if (pages) {
        updates.push(...pages.map(page => ({
          title: page.title,
          type: "Page",
          slug: `/${page.slug}`,
          last_updated: page.last_updated
        })));
      }

      return updates.sort((a, b) => 
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
      ).slice(0, 10);
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Most Viewed Portfolio Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Portfolio Performance
          </CardTitle>
          <CardDescription>Most viewed portfolio items</CardDescription>
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
              <BarChart data={portfolioViews?.slice(0, 5)}>
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="#FFB74A" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Blog Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Blog Performance
          </CardTitle>
          <CardDescription>Most viewed blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {blogViews?.slice(0, 5).map((post, index) => (
              <div key={post.slug} className="flex items-center justify-between p-2 border rounded">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                </div>
                <Badge variant="secondary">{post.views} views</Badge>
              </div>
            )) || (
              <p className="text-center text-muted-foreground py-4">No blog posts found</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recently Updated Content */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recently Updated Content
          </CardTitle>
          <CardDescription>Content that was recently modified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contentUpdates?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.type}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.last_updated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )) || (
              <p className="text-center text-muted-foreground py-4">No recent updates found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
