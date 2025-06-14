
import { supabase } from "@/integrations/supabase/client";

type ConversionEvent = {
  event_type: string;
  session_id?: string;
  page_slug?: string;
  extra?: any;
};

export async function logConversionEvent(event: ConversionEvent) {
  const { error } = await supabase.from("conversion_events").insert([event]);
  if (error) {
    console.error("Error logging conversion event:", error);
  }
}
