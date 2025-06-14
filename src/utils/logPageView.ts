
import { supabase } from "@/integrations/supabase/client";

type PageView = {
  slug: string;
  session_id: string;
  device_type?: string;
  location?: string;
  referrer?: string;
  user_agent?: string;
  extra?: any;
};

export async function logPageView(view: PageView) {
  const { error } = await supabase.from("page_views").insert([view]);
  if (error) {
    console.error("Error logging page view:", error);
  }
}
