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
 * If the logout fails it displays an error message in popup-container.
 * Redirect to the sign-in page.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();

  const popupContainer = document.getElementById("popup-container");
  popupContainer.style.zIndex = 9999;
  popupContainer.style.marginTop = "20px";
  popupContainer.style.position = "fixed";
  popupContainer.style.width = "100%";
  popupContainer.style.display = "flex";
  popupContainer.style.justifyContent = "center";

  if (error) {
    popupContainer.innerHTML = `
    <div class="z-9999 mt-20 w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    <div class="mb-2 mt-2">Error logging out: ${error.message}</div>
    </div>
    `;
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
