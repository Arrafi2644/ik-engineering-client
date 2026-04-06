import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () =>
  createSupabaseClient(
    `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  )