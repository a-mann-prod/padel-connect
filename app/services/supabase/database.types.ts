export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      complexes: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      favorite_users: {
        Row: {
          created_at: string
          favorite_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          favorite_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          favorite_user_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_favorite_users_favorite_user_id_fkey"
            columns: ["favorite_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_favorite_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      match_filters: {
        Row: {
          complex_id: number | null
          created_at: string
          is_my_level_range: boolean
          user_id: string
        }
        Insert: {
          complex_id?: number | null
          created_at?: string
          is_my_level_range?: boolean
          user_id?: string
        }
        Update: {
          complex_id?: number | null
          created_at?: string
          is_my_level_range?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_match_filters_complex_id_fkey"
            columns: ["complex_id"]
            isOneToOne: false
            referencedRelation: "complexes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_match_filters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      match_requests: {
        Row: {
          created_at: string
          match_id: number
          status: Database["public"]["Enums"]["match_request_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          match_id: number
          status?: Database["public"]["Enums"]["match_request_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          match_id?: number
          status?: Database["public"]["Enums"]["match_request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_match_requests_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_match_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          complex_id: number
          created_at: string
          datetime: string
          duration: number
          id: number
          is_private: boolean
          level: number
          owner_id: string | null
          slot_status: Database["public"]["Enums"]["match_slot_status"] | null
          updated_at: string
        }
        Insert: {
          complex_id: number
          created_at?: string
          datetime: string
          duration: number
          id?: number
          is_private?: boolean
          level: number
          owner_id?: string | null
          slot_status?: Database["public"]["Enums"]["match_slot_status"] | null
          updated_at?: string
        }
        Update: {
          complex_id?: number
          created_at?: string
          datetime?: string
          duration?: number
          id?: number
          is_private?: boolean
          level?: number
          owner_id?: string | null
          slot_status?: Database["public"]["Enums"]["match_slot_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_matches_complex_id_fkey"
            columns: ["complex_id"]
            isOneToOne: false
            referencedRelation: "complexes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_matches_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: number
          match_id: number | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          match_id?: number | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          match_id?: number | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          is_read: boolean
          subtitle: string | null
          title: string
          type: Database["public"]["Enums"]["notification"]
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_read?: boolean
          subtitle?: string | null
          title: string
          type: Database["public"]["Enums"]["notification"]
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_read?: boolean
          subtitle?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification"]
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          defense_level: number | null
          first_name: string | null
          id: string
          is_new_match_notification_enabled: boolean | null
          is_new_message_notification_enabled: boolean | null
          is_onboarding_completed: boolean
          language: string | null
          last_name: string | null
          manual_preference:
            | Database["public"]["Enums"]["manual_preference"]
            | null
          offense_level: number | null
          push_token: string | null
          service_level: number | null
          side_preference: Database["public"]["Enums"]["side_preference"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          defense_level?: number | null
          first_name?: string | null
          id: string
          is_new_match_notification_enabled?: boolean | null
          is_new_message_notification_enabled?: boolean | null
          is_onboarding_completed?: boolean
          language?: string | null
          last_name?: string | null
          manual_preference?:
            | Database["public"]["Enums"]["manual_preference"]
            | null
          offense_level?: number | null
          push_token?: string | null
          service_level?: number | null
          side_preference?:
            | Database["public"]["Enums"]["side_preference"]
            | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          defense_level?: number | null
          first_name?: string | null
          id?: string
          is_new_match_notification_enabled?: boolean | null
          is_new_message_notification_enabled?: boolean | null
          is_onboarding_completed?: boolean
          language?: string | null
          last_name?: string | null
          manual_preference?:
            | Database["public"]["Enums"]["manual_preference"]
            | null
          offense_level?: number | null
          push_token?: string | null
          service_level?: number | null
          side_preference?:
            | Database["public"]["Enums"]["side_preference"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          complex_id: number
          created_at: string
          datetime: string
          description: string
          id: number
          title: string
          type: Database["public"]["Enums"]["tournament_type"]
        }
        Insert: {
          complex_id: number
          created_at?: string
          datetime: string
          description: string
          id?: number
          title: string
          type: Database["public"]["Enums"]["tournament_type"]
        }
        Update: {
          complex_id?: number
          created_at?: string
          datetime?: string
          description?: string
          id?: number
          title?: string
          type?: Database["public"]["Enums"]["tournament_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_tournaments_complex_id_fkey"
            columns: ["complex_id"]
            isOneToOne: false
            referencedRelation: "complexes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_new_match_notified_users: {
        Args: {
          match_level: number
          match_owner_id: string
          match_complex_id: number
        }
        Returns: {
          id: string
          language: string
        }[]
      }
      mark_all_notifications_as_read: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      mark_notifications_as_read: {
        Args: {
          ids: number[]
        }
        Returns: undefined
      }
      verify_user_password: {
        Args: {
          password: string
        }
        Returns: boolean
      }
    }
    Enums: {
      manual_preference: "LEFT_HANDED" | "RIGHT_HANDED"
      match_request_status: "ACCEPTED" | "REFUSED" | "PENDING"
      match_slot_status: "AVAILABLE" | "BOOKED" | "UNAVAILABLE"
      notification:
        | "NEW_MESSAGE"
        | "NEW_MATCH"
        | "NEW_MATCH_REQUEST"
        | "MATCH_REQUEST_RESPONSE_ACCEPTED"
        | "MATCH_REQUEST_RESPONSE_REFUSED"
      side_preference: "LEFT" | "RIGHT" | "BOTH"
      tournament_type: "LEISURE" | "COMPETITION"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

