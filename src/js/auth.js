import { supabase } from "./supabase.js";

/**
 * Check if user is authenticated.
 * Redirect to the sign-in page if no valid session exist.
 *
 * @returns {Promise<Object|null>} The authenticated user object or null if not authenticated.
 */
export async function checkAuth() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error checking session:", error.message);
    window.location.href = "/auth/sign-in/index.html";
    return null;
  }

  const user = session?.user;

  if (!user) {
    window.location.href = "/auth/sign-in/index.html";
    return null;
  }

  return user;
}

/**
 * Logs out the current authenticated user.
 * Redirect to the sign-in page.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Logout error:", error.message);
  window.location.href = "/auth/sign-in/index.html";
}

/**
 * Fetches the current authenticated user.
 *
 * @returns {Promise<Object|null>} The current authenticated user object or null if not authenticated.
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
