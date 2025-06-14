export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_conversations: {
        Row: {
          agent_message_count: number | null
          conversion: string | null
          details: Json | null
          ended_at: string | null
          escalated: boolean | null
          id: string
          intent_accuracy: number | null
          rating: number | null
          session_id: string | null
          started_at: string
          user_message_count: number | null
        }
        Insert: {
          agent_message_count?: number | null
          conversion?: string | null
          details?: Json | null
          ended_at?: string | null
          escalated?: boolean | null
          id?: string
          intent_accuracy?: number | null
          rating?: number | null
          session_id?: string | null
          started_at?: string
          user_message_count?: number | null
        }
        Update: {
          agent_message_count?: number | null
          conversion?: string | null
          details?: Json | null
          ended_at?: string | null
          escalated?: boolean | null
          id?: string
          intent_accuracy?: number | null
          rating?: number | null
          session_id?: string | null
          started_at?: string
          user_message_count?: number | null
        }
        Relationships: []
      }
      blog: {
        Row: {
          author: string | null
          body: string | null
          featured_image: string | null
          id: string
          last_updated: string
          published_at: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: string[] | null
          title: string
        }
        Insert: {
          author?: string | null
          body?: string | null
          featured_image?: string | null
          id?: string
          last_updated?: string
          published_at?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: string[] | null
          title: string
        }
        Update: {
          author?: string | null
          body?: string | null
          featured_image?: string | null
          id?: string
          last_updated?: string
          published_at?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          event_at: string
          event_type: string
          extra: Json | null
          id: string
          page_slug: string | null
          session_id: string | null
        }
        Insert: {
          event_at?: string
          event_type: string
          extra?: Json | null
          id?: string
          page_slug?: string | null
          session_id?: string | null
        }
        Update: {
          event_at?: string
          event_type?: string
          extra?: Json | null
          id?: string
          page_slug?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      lead_submissions: {
        Row: {
          email: string | null
          extra: Json | null
          id: string
          message: string | null
          name: string | null
          page_slug: string | null
          phone: string | null
          response_time_ms: number | null
          session_id: string | null
          source: string | null
          status: string | null
          submitted_at: string
        }
        Insert: {
          email?: string | null
          extra?: Json | null
          id?: string
          message?: string | null
          name?: string | null
          page_slug?: string | null
          phone?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          submitted_at?: string
        }
        Update: {
          email?: string | null
          extra?: Json | null
          id?: string
          message?: string | null
          name?: string | null
          page_slug?: string | null
          phone?: string | null
          response_time_ms?: number | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          device_type: string | null
          extra: Json | null
          id: string
          location: string | null
          referrer: string | null
          session_id: string
          slug: string
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          device_type?: string | null
          extra?: Json | null
          id?: string
          location?: string | null
          referrer?: string | null
          session_id: string
          slug: string
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          device_type?: string | null
          extra?: Json | null
          id?: string
          location?: string | null
          referrer?: string | null
          session_id?: string
          slug?: string
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          body: string | null
          featured_image: string | null
          id: string
          last_updated: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
        }
        Insert: {
          body?: string | null
          featured_image?: string | null
          id?: string
          last_updated?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
        }
        Update: {
          body?: string | null
          featured_image?: string | null
          id?: string
          last_updated?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
