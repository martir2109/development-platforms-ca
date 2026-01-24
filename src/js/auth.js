import { supabase } from "./supabase.js";
import { displayMessage } from "./utils.js";
import { stylePopUpContainer } from "./utils.js";

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

  const popupContainer = document.getElementById("popup-container");
  stylePopUpContainer(popupContainer);

  if (error) {
    displayMessage(
      popupContainer,
      "error",
      `Error checking session: ${error.message}`,
    );
    setTimeout(() => {
      popupContainer.innerHTML = "";
      window.location.href = "/auth/sign-in/index.html";
    }, 2000);
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
 * If the logout fails it displays an error message in popup-container.
 * Redirect to the sign-in page.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();

  const popupContainer = document.getElementById("popup-container");
  stylePopUpContainer(popupContainer);

  if (error) {
    displayMessage(
      popupContainer,
      "error",
      `Error logging out: ${error.message}`,
    );
    setTimeout(() => {
      popupContainer.innerHTML = "";
    }, 3000);
    return;
  }
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
