export interface Database {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string;
          name: string;
          domain: string;
          plan: 'Free' | 'Starter' | 'Pro';
          total_leads: number;
          leads_this_month: number;
          remaining_leads: number;
          max_leads: number;
          created_at: string;
          updated_at: string;
          user_id?: string;
        };
        Insert: {
          id?: string;
          name: string;
          domain: string;
          plan?: 'Free' | 'Starter' | 'Pro';
          total_leads?: number;
          leads_this_month?: number;
          remaining_leads?: number;
          max_leads?: number;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          name?: string;
          domain?: string;
          plan?: 'Free' | 'Starter' | 'Pro';
          total_leads?: number;
          leads_this_month?: number;
          remaining_leads?: number;
          max_leads?: number;
          updated_at?: string;
          user_id?: string;
        };
      };
      widget_settings: {
        Row: {
          id: string;
          store_id: string;
          heading: string;
          description: string;
          button_text: string;
          background_color: string;
          text_color: string;
          button_color: string;
          overlay_opacity: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          heading?: string;
          description?: string;
          button_text?: string;
          background_color?: string;
          text_color?: string;
          button_color?: string;
          overlay_opacity?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          heading?: string;
          description?: string;
          button_text?: string;
          background_color?: string;
          text_color?: string;
          button_color?: string;
          overlay_opacity?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          store_id: string;
          name: string;
          phone: string;
          product: string;
          quantity: number;
          variant_id: string;
          source_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          name: string;
          phone: string;
          product: string;
          quantity?: number;
          variant_id: string;
          source_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          name?: string;
          phone?: string;
          product?: string;
          quantity?: number;
          variant_id?: string;
          source_url?: string;
        };
      };
    };
  };
}
