import { renderNavbar } from "../ui/navbar.js";
import { renderFooter } from "../ui/footer.js";
import { getCurrentUser } from "../auth.js";
import { loadArticles } from "./load-articles.js";
import { setupCategoryFilter, showOnlyMyArticles } from "./filter-category.js";

/**
 * Sets up the homepage.
 *
 * Renders the navbar.
 * Renders the footer.
 * Call setupCategoryFilter and showOnlyMyArticles functions.
 * Loads articles based on the selected category (defaults to "all").
 * Checks the current user's login status.
 * Shows or hides the "Create article" button depending on login status.
 */
async function setUpHomepage() {
  await renderNavbar();
  renderFooter();
  setupCategoryFilter();
  showOnlyMyArticles();

  const categorySelect = document.getElementById("category-filter");
  await loadArticles(
    categorySelect ? categorySelect.value.toLowerCase() : "all",
  );

  const user = await getCurrentUser();
  const createBtnContainer = document.getElementById("create-btn-container");
  const checkBoxMyArticles = document.getElementById(
    "checkbox-my-articles-container",
  );

  if (!user) {
    createBtnContainer.classList.add("hidden");
    checkBoxMyArticles.classList.add("hidden");
  } else {
    createBtnContainer.classList.remove("hidden");
    checkBoxMyArticles.classList.remove("hidden");
    createBtnContainer.classList.add("flex");
    checkBoxMyArticles.classList.add("flex");
  }
}

setUpHomepage();
