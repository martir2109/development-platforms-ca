import { loadArticles } from "./load-articles.js";
import { displayMessage, stylePopUpContainer } from "../utils.js";

let currentCategory = "all";
let onlyMyArticles = false;

/**
 * Sets up the category filter dropdown on the homepage.
 *
 * Finds the category select element in the DOM.
 * Logs an error and stops if the element is not found.
 * Adds a "change" event listener to the dropdown.
 * When the selected category changes, calls `loadArticles` with the selected value.
 */
export function setupCategoryFilter() {
  const categorySelect = document.getElementById("category-filter");

  const popupContainer = document.getElementById("popup-container");
  stylePopUpContainer(popupContainer);

  if (!categorySelect) {
    displayMessage(
      popupContainer,
      "error",
      "Category select element not found",
    );
    return;
  }

  categorySelect.addEventListener("change", (e) => {
    currentCategory = e.target.value;
    loadArticles(currentCategory, onlyMyArticles);
  });
}

/**
 * Set up the "Show only my articles" checkbox filter for homepage.
 *
 * When the checkbox is toggled, it fetches and displays only the current user's articles.
 */
export function showOnlyMyArticles() {
  const checkbox = document.getElementById("checkbox-my-articles");

  if (!checkbox) return;

  checkbox.addEventListener("change", (e) => {
    onlyMyArticles = e.target.checked;
    loadArticles(currentCategory, onlyMyArticles);
  });
}
