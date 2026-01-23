import { checkAuth, getCurrentUser } from "../auth.js";
import { supabase } from "../supabase.js";
import { displayMessage } from "../utils.js";
import { renderNavbar } from "../ui/navbar.js";
import { renderFooter } from "../ui/footer.js";
import { articleFormHTML } from "./article-form.js";

/**
 * Sets up the create article page and handles article creation and input validation.
 * Render navbar and footer.
 * Ensures that the user it authenticated before allowing to create an article.
 *
 * @returns {Promise<void>}
 */
async function setUpCreateArticlePage() {
  await renderNavbar();
  renderFooter();

  const user = await checkAuth();
  const createSection = document.getElementById("create-section");

  if (!user) {
    createSection.innerHTML = `<p class="text-red-500 text-center">You must be logged in to create articles.</p>`;
    return;
  }

  const createArticleContainer = document.getElementById(
    "create-article-container",
  );

  if (!createArticleContainer) {
    createSection.innerHTML = `<p class="text-red-500 text-center">Create article container not found.</p>`;
    return;
  }

  createArticleContainer.innerHTML = articleFormHTML();

  const articleForm = document.getElementById("article-form");
  const cancelBtn = document.getElementById("cancel-form-btn");
  const deleteBtn = document.getElementById("delete-container");

  deleteBtn.style.display = "none";

  if (articleForm) {
    articleForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      const title = form.title.value.trim();
      const category = form.category.value;
      const body = form.body.value.trim();

      try {
        const user = await getCurrentUser();

        if (!user) {
          displayMessage(
            "#message-container",
            "error",
            "You must be logged in to submit articles.",
          );
          return;
        }

        if (!title || !category || !body) {
          displayMessage(
            "#message-container",
            "error",
            "All fields are required.",
          );
          return;
        }

        if (title.length < 2) {
          displayMessage(
            "#message-container",
            "error",
            "Title must be at least 2 characters",
          );
          return;
        }
        if (body.length < 5) {
          displayMessage(
            "#message-container",
            "error",
            "Article body must be at least 5 characters",
          );
          return;
        }

        const { error } = await supabase.from("articles").insert({
          title,
          category,
          body,
          author_id: user.id,
          author_name: user.user_metadata.display_name,
        });

        if (error) throw error;

        displayMessage(
          "#message-container",
          "success",
          "Article published successfully!",
        );
        form.reset();

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        displayMessage("#message-container", "error", error.message);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      window.location.href = "/";
    });
  }
}
setUpCreateArticlePage();
