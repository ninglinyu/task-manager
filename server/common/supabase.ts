import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zhdqyidijojadrwiklna.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XbZhUtx-duU9iJ9879074Q_UAW3wzZZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
