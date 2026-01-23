import { checkAuth, getCurrentUser } from "../auth.js";
import { supabase } from "../supabase.js";
import { displayMessage } from "../utils.js";
import { renderNavbar } from "../ui/navbar.js";
import { renderFooter } from "../ui/footer.js";
import { articleFormHTML } from "./article-form.js";

/**
 * Renders the edit article form on the page and inserts the current article data.
 * Ensures that the current user is the author before allowing edits. 

 * @param {string} articleId - The ID of the article.
 * @returns {Promise<void>} 
 */
async function renderEditArticle(articleId) {
  const user = await checkAuth();
  const editSection = document.getElementById("edit-section");

  const editArticleContainer = document.getElementById(
    "edit-article-container",
  );

  if (!editArticleContainer) {
    editSection.innerHTML = `<p class="text-red-500 text-center">Create article container not found.</p>`;
    return;
  }

  try {
    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", articleId)
      .single();

    if (error) throw error;

    if (article.author_id !== user.id) {
      editSection.innerHTML = `<p class="text-red-500 text-center">You can only edit your own articles.</p>`;
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return;
    }

    editArticleContainer.innerHTML = articleFormHTML();

    document.getElementById("form-title").textContent = "Edit Article";
    document.querySelector('input[name="title"]').value = article.title;
    document.querySelector('select[name="category"]').value = article.category;
    document.querySelector('textarea[name="body"]').value = article.body;
    document.querySelector('button[type="submit"]').textContent =
      "Update Article";
  } catch (error) {
    console.error("Error loading article:", error);
    displayMessage("#message-container", "error", "Failed to load article.");
  }
}

/**
 * Sets up the edit article page.
 * Loads the article data into the form.
 * Render navbar and footer.
 * Validates the input fileds and deletion button functionality.
 *
 * @returns {Promise<void>}
 */
async function setUpEditArticlePage() {
  await renderNavbar();
  renderFooter();

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  if (!articleId) {
    displayMessage("#message-container", "error", "No article ID provided.");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    return;
  }

  await renderEditArticle(articleId);

  const articleForm = document.getElementById("article-form");
  const cancelBtn = document.getElementById("cancel-form-btn");
  const deleteBtn = document.getElementById("delete-btn");

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
            "You must be signed in to edit articles.",
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

        const { error } = await supabase
          .from("articles")
          .update({
            title,
            category,
            body,
          })
          .eq("id", articleId)
          .eq("author_id", user.id);

        if (error) throw error;

        displayMessage(
          "#message-container",
          "success",
          "Article updated successfully!",
        );

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
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

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete this article?")) return;

      try {
        const user = await getCurrentUser();
        if (!user) {
          displayMessage(
            "#message-container",
            "error",
            "You must be signed in to delete articles.",
          );
          return;
        }

        const { error } = await supabase
          .from("articles")
          .delete()
          .eq("id", articleId)
          .eq("author_id", user.id);

        if (error) throw error;

        displayMessage(
          "#message-container",
          "success",
          "Article deleted successfully!",
        );

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (error) {
        displayMessage("#message-container", "error", error.message);
        console.error("Error deleting article:", error);
      }
    });
  }
}

setUpEditArticlePage();
