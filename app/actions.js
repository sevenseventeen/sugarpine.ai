'use server'
import { supabase } from '../lib/supabase.js'

export async function subscribe({ email, scope, frequency }) {
  const { error } = await supabase
    .from('subscriptions')
    .insert({ email, scope, frequency, status: 'pending' })

  if (error) throw new Error(error.message)
  return { ok: true }
}
