
import { supabase } from "@/integrations/supabase/client";
import { Page } from "@/types/cms";

export async function fetchPage(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Error fetching page:", error);
    return null;
  }
  return data;
}
