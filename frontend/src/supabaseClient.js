// Supabase client setup for Gaon Bazar
// Loads URL and public anon key from environment
// Define REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase;

// Check if Supabase credentials are available
if (supabaseUrl && supabaseAnonKey) {
  // Create real Supabase client if credentials are configured
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create mock Supabase client for development without credentials
  // This allows the app to render and function without crashing
  console.warn(
    'Supabase credentials not configured. Using mock client.\n' +
    'Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY environment variables to enable authentication.'
  );

  // Mock Supabase client that returns safe defaults
  supabase = {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: async () => ({ data: { session: null } }),
      signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
  };
}

export { supabase };
export default supabase;
