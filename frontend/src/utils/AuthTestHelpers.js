// Lightweight auth testing helpers for Gaon Bazar
// Usage: import and call from a dev-only UI or temporary page
// Focus: verify behavior, print PASS/FAIL in console

import supabase from '../supabaseClient';

function log(label, ok, extra = '') {
  const status = ok ? 'PASS' : 'FAIL';
  // Single concise line per check
  console[ok ? 'log' : 'error'](`[${status}] ${label}${extra ? ' - ' + extra : ''}`);
}

export async function testSignup(name, email, password, role) {
  try {
    // 1) create Supabase auth user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      log('signup:create-user', false, signUpError.message);
      return { ok: false };
    }
    const userId = signUpData?.user?.id;
    log('signup:create-user', !!userId);

    // 2) insert profile
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, name, role });
    log('signup:insert-profile', !insertError, insertError?.message);

    // 3) fetch profile row
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', userId)
      .single();
    log('signup:fetch-profile', !!profile && !profErr, profErr?.message);

    // 4) redirect decision (manual in app, here we just assert role)
    const okRole = profile?.role === role;
    log('signup:role-correct', okRole);

    return { ok: !!userId && !!profile && okRole, userId, profile };
  } catch (err) {
    log('signup:unexpected', false, err?.message);
    return { ok: false };
  }
}

export async function testLogin(email, password) {
  try {
    // 1) sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      log('login:sign-in', false, error.message);
      return { ok: false };
    }
    log('login:sign-in', !!data?.user);

    const userId = data.user.id;
    // 2) fetch profile
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', userId)
      .single();
    log('login:fetch-profile', !!profile && !profErr, profErr?.message);

    // 3) role-based redirect (manual in app; assert role exists)
    const validRole = profile?.role === 'farmer' || profile?.role === 'buyer';
    log('login:role-valid', validRole, `role=${profile?.role}`);

    // 4) session persistence
    const { data: s } = await supabase.auth.getSession();
    const hasSession = !!s?.session?.access_token;
    log('login:session-exists', hasSession);

    return { ok: !!profile && validRole && hasSession, role: profile?.role };
  } catch (err) {
    log('login:unexpected', false, err?.message);
    return { ok: false };
  }
}

export async function clearSession() {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem('gb_profile');
    log('logout:sign-out', true);
    // verify cleared
    const { data: s } = await supabase.auth.getSession();
    const cleared = !s?.session;
    log('logout:session-cleared', cleared);
    return { ok: cleared };
  } catch (err) {
    log('logout:unexpected', false, err?.message);
    return { ok: false };
  }
}

// Monitors and warns on common issues
export function monitorAuthState() {
  const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      if (!profile) {
        console.warn('[WARN] profile missing but user exists');
      } else if (!profile.role || !['farmer', 'buyer'].includes(profile.role)) {
        console.warn(`[WARN] invalid role detected: ${profile.role}`);
      }
    } else {
      console.warn('[WARN] Supabase session is null (expired or signed out)');
    }
  });
  return () => sub.subscription.unsubscribe();
}

// Detect simple redirect loops between known routes
export function enableRedirectLoopMonitor() {
  const recent = [];
  const MAX = 6;
  const THRESH_MS = 3000;
  function record(path) {
    const now = Date.now();
    recent.push({ path, now });
    while (recent.length > MAX) recent.shift();
    const lastFew = recent.filter(r => now - r.now < THRESH_MS).map(r => r.path);
    const patternA = lastFew.join('>').includes('/login>/farmer>/login') || lastFew.join('>').includes('/login>/buyer>/login');
    const patternB = lastFew.join('>').includes('/farmer>/login>/farmer') || lastFew.join('>').includes('/buyer>/login>/buyer');
    if (patternA || patternB) {
      console.warn('[WARN] Potential redirect loop detected:', lastFew);
    }
  }
  // Patch pushState/replaceState to observe navigations
  const origPush = window.history.pushState;
  const origReplace = window.history.replaceState;
  window.history.pushState = function (...args) {
    origPush.apply(this, args);
    record(window.location.pathname);
  };
  window.history.replaceState = function (...args) {
    origReplace.apply(this, args);
    record(window.location.pathname);
  };
  window.addEventListener('popstate', () => record(window.location.pathname));
  // initial
  record(window.location.pathname);
  console.log('[INFO] Redirect loop monitor enabled');
}

export async function runAuthTests({ farmerEmail, buyerEmail, password }) {
  const results = {
    signupFarmer: false,
    signupBuyer: false,
    login: false,
    protectedRoutes: 'manual',
    logout: false,
  };

  // Farmer signup
  const farmerName = 'Test Farmer';
  const s1 = await testSignup(farmerName, farmerEmail, password, 'farmer');
  results.signupFarmer = !!s1.ok;

  // Buyer signup
  const buyerName = 'Test Buyer';
  const s2 = await testSignup(buyerName, buyerEmail, password, 'buyer');
  results.signupBuyer = !!s2.ok;

  // Login (use farmer)
  const l1 = await testLogin(farmerEmail, password);
  results.login = !!l1.ok;

  // Logout
  const lo = await clearSession();
  results.logout = !!lo.ok;

  // Final report
  console.log('AUTH TEST RESULTS:\n', {
    'signup farmer': results.signupFarmer ? 'pass' : 'fail',
    'signup buyer': results.signupBuyer ? 'pass' : 'fail',
    'login': results.login ? 'pass' : 'fail',
    'protected routes': results.protectedRoutes, // manual
    'logout': results.logout ? 'pass' : 'fail',
  });

  return results;
}
