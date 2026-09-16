import { createClient } from '@supabase/supabase-js'

// Server-only. Every Supabase call in this app happens in a server component
// or a server action, so these names are deliberately NOT prefixed with
// NEXT_PUBLIC_ — the credentials never reach the browser.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)
