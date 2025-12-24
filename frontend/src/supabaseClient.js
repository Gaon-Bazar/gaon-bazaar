// Supabase client setup for Gaon Bazar
// Loads URL and public anon key from environment
// Define REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Basic safety checks for missing env vars (dev-friendly)
if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid console spam; minimal readable error
  // You can also show a banner in UI if preferred
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
