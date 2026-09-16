'use server'
import { supabase } from '../lib/supabase.js'
import { upsertSubscriber } from '../lib/beehiiv.js'

/**
 * One signup. `scopes` is the list of section slugs chosen, or ['all'].
 * Supabase is the system of record; beehiiv handles delivery and growth.
 * A beehiiv failure is logged, not surfaced — the address is already saved.
 */
export async function subscribe({ email, scopes, frequency = 'instant' }) {
  const list = Array.isArray(scopes) ? scopes : [scopes]

  const { error } = await supabase
    .from('subscriptions')
    .insert(list.map((scope) => ({ email, scope, frequency, status: 'pending' })))
  if (error) throw new Error(error.message)

  const sync = await upsertSubscriber({ email, topics: list, frequency })
  if (sync?.ok === false) console.error('beehiiv sync failed:', sync.status, sync.detail)

  return { ok: true }
}
