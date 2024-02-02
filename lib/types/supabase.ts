export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string
          display_name: string
          email: string
          id: string
          image_url: string
          stripe_customer_id: string | null
          stripe_subscriptoin_id: string | null
          subscription_status: boolean
        }
        Insert: {
          created_at?: string
          display_name: string
          email: string
          id: string
          image_url: string
          stripe_customer_id?: string | null
          stripe_subscriptoin_id?: string | null
          subscription_status?: boolean
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          image_url?: string
          stripe_customer_id?: string | null
          stripe_subscriptoin_id?: string | null
          subscription_status?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_sub: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
