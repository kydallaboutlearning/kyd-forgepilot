
import { supabase } from "@/integrations/supabase/client";
import { Blog } from "@/types/cms";

export async function fetchBlogPost(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
  return data;
}

export async function fetchBlogList(): Promise<Blog[]> {
  const { data, error } = await supabase.from("blog").select("*").order("published_at", { ascending: false });
  if (error) {
    console.error("Error fetching blog list:", error);
    return [];
  }
  return data ?? [];
}
