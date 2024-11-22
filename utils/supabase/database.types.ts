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
      game: {
        Row: {
          code: string | null
          created_at: string
          id: number
          is_complete: boolean
          room_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          is_complete?: boolean
          room_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          is_complete?: boolean
          room_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
        ]
      }
      player: {
        Row: {
          created_at: string
          current_room_id: number | null
          id: string
          is_spymaster: boolean | null
          name: string
          team: string | null
        }
        Insert: {
          created_at?: string
          current_room_id?: number | null
          id?: string
          is_spymaster?: boolean | null
          name: string
          team?: string | null
        }
        Update: {
          created_at?: string
          current_room_id?: number | null
          id?: string
          is_spymaster?: boolean | null
          name?: string
          team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_current_room_id_fkey"
            columns: ["current_room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
        ]
      }
      room: {
        Row: {
          code: string
          created_at: string
          id: number
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      tile: {
        Row: {
          created_at: string
          game_id: number
          id: number
          is_selected: boolean | null
          position: number | null
          team: string
          word_id: number
        }
        Insert: {
          created_at?: string
          game_id: number
          id?: number
          is_selected?: boolean | null
          position?: number | null
          team: string
          word_id: number
        }
        Update: {
          created_at?: string
          game_id?: number
          id?: number
          is_selected?: boolean | null
          position?: number | null
          team?: string
          word_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tile_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tile_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "word"
            referencedColumns: ["id"]
          },
        ]
      }
      word: {
        Row: {
          created_at: string
          id: number
          word: string
        }
        Insert: {
          created_at?: string
          id?: number
          word: string
        }
        Update: {
          created_at?: string
          id?: number
          word?: string
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
