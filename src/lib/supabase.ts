import { createClient } from '@supabase/supabase-js'

// Environment variables (Vite-prefixed public keys)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ''
export const shopId = import.meta.env.VITE_SHOP_ID || null

// Flag indicating whether Supabase is configured with valid credentials
export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
)

// Safe supabase client: null if credentials not provided, avoiding unhandled crashes
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
