
/**
 * Thoroughly cleans up all Supabase auth-related state in localStorage and sessionStorage.
 */
export function cleanupAuthState() {
  // Remove all Supabase/local auth tokens for a fresh login
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
      localStorage.removeItem(key);
    }
  });
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
      sessionStorage.removeItem(key);
    }
  });
}
