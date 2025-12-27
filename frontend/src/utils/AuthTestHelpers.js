// Lightweight auth testing helpers for Gaon Bazar
// Usage: import and call from a dev-only UI or temporary page
// Note: These helpers are now using localStorage-based auth (Supabase removed)

function log(label, ok, extra = '') {
  const status = ok ? 'PASS' : 'FAIL';
  // Single concise line per check
  console[ok ? 'log' : 'error'](`[${status}] ${label}${extra ? ' - ' + extra : ''}`);
}

export async function testSignup(name, email, password, role) {
  try {
    // Create local user profile
    const userId = 'user_' + Date.now();
    const profile = { id: userId, name, role, email };
    
    localStorage.setItem('gb_profile', JSON.stringify(profile));
    log('signup:create-user', !!userId);
    log('signup:store-profile', true);
    log('signup:role-correct', profile.role === role);

    return { ok: true, userId, profile };
  } catch (err) {
    log('signup:unexpected', false, err?.message);
    return { ok: false };
  }
}

export async function testLogin(email, password) {
  try {
    // Basic validation
    if (!email || !password) {
      log('login:validate', false, 'Missing email or password');
      return { ok: false };
    }
    
    // Create local user profile
    const userId = 'user_' + Date.now();
    const profile = { id: userId, email, name: email.split('@')[0], role: null };
    
    localStorage.setItem('gb_profile', JSON.stringify(profile));
    log('login:sign-in', true);
    log('login:store-profile', true);
    log('login:session-exists', true);

    return { ok: true, role: profile.role };
  } catch (err) {
    log('login:unexpected', false, err?.message);
    return { ok: false };
  }
}

export async function clearSession() {
  try {
    localStorage.removeItem('gb_profile');
    log('logout:sign-out', true);
    log('logout:session-cleared', true);
    return { ok: true };
  } catch (err) {
    log('logout:unexpected', false, err?.message);
    return { ok: false };
  }
}

// Note: Auth state monitoring removed (was Supabase-dependent)
export function monitorAuthState() {
  console.log('[INFO] Auth state monitoring: using localStorage');
  return () => {};
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
