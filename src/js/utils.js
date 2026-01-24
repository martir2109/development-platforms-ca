/**
 * Shows a message (error, success, warning, info) in a container element.
 *
 * @param {HTMLElement|string} container - The DOM element where the message will appear.
 * @param {'error'|'success'|'warning'|'info'} messageType - Type of message, determines styling.
 * @param {string} message - The text content of the message.
 */
// Code function retrieved from lecture repository (Module 3.4. Lesson - Supabase: Building The Frontend Application)
// Repository link: https://github.com/NoroffFEU/supabase-example
export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  const messageClasses = {
    error: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",
    success:
      "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
    warning:
      "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded",
    info: "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded",
  };

  const classes = messageClasses[messageType] || messageClasses.info;

  parent.innerHTML = `<div class="mb-2 mt-2 ${classes}">${message}</div>`;
}

/**
 *
 *
 * Styling for the popup container
 * @param {HTMLElement} popupContainer - The popup container element to style.
 */
export function stylePopUpContainer(popupContainer) {
  popupContainer.style.zIndex = 9999;
  popupContainer.style.marginTop = "100px";
  popupContainer.style.position = "fixed";
  popupContainer.style.width = "100%";
  popupContainer.style.display = "flex";
  popupContainer.style.justifyContent = "center";
}

/**
 * Formats a date string into e.g., "just now", "3 minutes ago" or a full date if older than a week.
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} A formatted date.
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffMinutes = Math.floor(diffInSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
}
