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
      benefits: {
        Row: {
          description: string | null
          icon: string | null
          id: string
          order_index: number | null
          title: string | null
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: string
          order_index?: number | null
          title?: string | null
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: string
          order_index?: number | null
          title?: string | null
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
      faqs: {
        Row: {
          answer: string | null
          id: string
          order_index: number | null
          question: string | null
        }
        Insert: {
          answer?: string | null
          id?: string
          order_index?: number | null
          question?: string | null
        }
        Update: {
          answer?: string | null
          id?: string
          order_index?: number | null
          question?: string | null
        }
        Relationships: []
      }
      final_cta: {
        Row: {
          button_label: string | null
          button_link: string | null
          headline: string | null
          id: string
          show: boolean | null
          subtext: string | null
        }
        Insert: {
          button_label?: string | null
          button_link?: string | null
          headline?: string | null
          id?: string
          show?: boolean | null
          subtext?: string | null
        }
        Update: {
          button_label?: string | null
          button_link?: string | null
          headline?: string | null
          id?: string
          show?: boolean | null
          subtext?: string | null
        }
        Relationships: []
      }
      hero_media: {
        Row: {
          alt: string | null
          id: string
          type: string
          url: string | null
        }
        Insert: {
          alt?: string | null
          id?: string
          type: string
          url?: string | null
        }
        Update: {
          alt?: string | null
          id?: string
          type?: string
          url?: string | null
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
      metrics: {
        Row: {
          id: string
          label: string
          order_index: number | null
          value: string
        }
        Insert: {
          id?: string
          label: string
          order_index?: number | null
          value: string
        }
        Update: {
          id?: string
          label?: string
          order_index?: number | null
          value?: string
        }
        Relationships: []
      }
      navigation_links: {
        Row: {
          id: string
          is_active: boolean | null
          label: string
          order_index: number | null
          url: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          label: string
          order_index?: number | null
          url: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          label?: string
          order_index?: number | null
          url?: string
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
      partner_logos: {
        Row: {
          id: string
          link: string | null
          logo_url: string | null
          name: string | null
          order_index: number | null
        }
        Insert: {
          id?: string
          link?: string | null
          logo_url?: string | null
          name?: string | null
          order_index?: number | null
        }
        Update: {
          id?: string
          link?: string | null
          logo_url?: string | null
          name?: string | null
          order_index?: number | null
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string | null
          contact_calendly: string | null
          contact_email: string | null
          date: string | null
          description: string | null
          id: string
          images: Json | null
          order_index: number | null
          problem: string[] | null
          results: Json | null
          solution: string[] | null
          summary: string | null
          tags: string[] | null
          tech_stack: string[] | null
          testimonial: Json | null
          title: string | null
          video_url: string | null
        }
        Insert: {
          category?: string | null
          contact_calendly?: string | null
          contact_email?: string | null
          date?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          order_index?: number | null
          problem?: string[] | null
          results?: Json | null
          solution?: string[] | null
          summary?: string | null
          tags?: string[] | null
          tech_stack?: string[] | null
          testimonial?: Json | null
          title?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string | null
          contact_calendly?: string | null
          contact_email?: string | null
          date?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          order_index?: number | null
          problem?: string[] | null
          results?: Json | null
          solution?: string[] | null
          summary?: string | null
          tags?: string[] | null
          tech_stack?: string[] | null
          testimonial?: Json | null
          title?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          description: string | null
          features: string[] | null
          id: string
          name: string | null
          order_index: number | null
          price_monthly: number | null
          price_yearly: number | null
        }
        Insert: {
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string | null
          order_index?: number | null
          price_monthly?: number | null
          price_yearly?: number | null
        }
        Update: {
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string | null
          order_index?: number | null
          price_monthly?: number | null
          price_yearly?: number | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          admin_email: string | null
          admin_password_hash: string | null
          benefits_headline: string | null
          benefits_items: Json | null
          contact_cta_button_label: string | null
          contact_cta_button_url: string | null
          contact_cta_headline: string | null
          contact_cta_subtext: string | null
          favicon_url: string | null
          footer_text: string | null
          hero_cta_label: string | null
          hero_cta_link: string | null
          hero_headline: string | null
          hero_image_url: string | null
          hero_subtext: string | null
          id: string
          logo_url: string | null
          recent_works_headline: string | null
          show_footer: boolean | null
          show_hero: boolean | null
          site_subtitle: string | null
          site_title: string | null
          updated_at: string | null
        }
        Insert: {
          admin_email?: string | null
          admin_password_hash?: string | null
          benefits_headline?: string | null
          benefits_items?: Json | null
          contact_cta_button_label?: string | null
          contact_cta_button_url?: string | null
          contact_cta_headline?: string | null
          contact_cta_subtext?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          hero_cta_label?: string | null
          hero_cta_link?: string | null
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subtext?: string | null
          id?: string
          logo_url?: string | null
          recent_works_headline?: string | null
          show_footer?: boolean | null
          show_hero?: boolean | null
          site_subtitle?: string | null
          site_title?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_email?: string | null
          admin_password_hash?: string | null
          benefits_headline?: string | null
          benefits_items?: Json | null
          contact_cta_button_label?: string | null
          contact_cta_button_url?: string | null
          contact_cta_headline?: string | null
          contact_cta_subtext?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          hero_cta_label?: string | null
          hero_cta_link?: string | null
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subtext?: string | null
          id?: string
          logo_url?: string | null
          recent_works_headline?: string | null
          show_footer?: boolean | null
          show_hero?: boolean | null
          site_subtitle?: string | null
          site_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          icon: string
          id: string
          label: string
          url: string
        }
        Insert: {
          icon: string
          id?: string
          label: string
          url: string
        }
        Update: {
          icon?: string
          id?: string
          label?: string
          url?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          id: string
          name: string | null
          order_index: number | null
          photo_url: string | null
          role: string | null
        }
        Insert: {
          bio?: string | null
          id?: string
          name?: string | null
          order_index?: number | null
          photo_url?: string | null
          role?: string | null
        }
        Update: {
          bio?: string | null
          id?: string
          name?: string | null
          order_index?: number | null
          photo_url?: string | null
          role?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          id: string
          name: string | null
          order_index: number | null
          rating: number | null
          text: string | null
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          name?: string | null
          order_index?: number | null
          rating?: number | null
          text?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string | null
          order_index?: number | null
          rating?: number | null
          text?: string | null
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
