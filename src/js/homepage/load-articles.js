import { supabase } from "/src/js/supabase.js";
import { getCurrentUser } from "/src/js/auth.js";
import { formatDate } from "../utils";

/**
 * Loads articles from Supabase database and renders them in the articles-container.
 *
 * Filtering by cateory and show only currentUser's articles.
 *
 * @returns {Promise<void>} .
 */
export async function loadArticles(category = "all", onlyMyPosts = false) {
  const container = document.getElementById("articles-container");

  if (!container) {
    console.error("Articles container not found");
    return;
  }

  let currentUser = null;

  try {
    currentUser = await getCurrentUser();

    let query = supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (onlyMyPosts && currentUser) {
      query = query.eq("author_id", currentUser.id);
    }
    const { data: articles, error } = await query;

    if (error) throw error;

    container.innerHTML = "";

    if (!articles || articles.length === 0) {
      container.innerHTML = `
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500 text-lg mb-4">No articles found.</p>
          </div>
        `;
      return;
    }

    articles.forEach((article) => {
      const card = createArticleCard(article, currentUser);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading articles:", error);
    if (container) {
      container.innerHTML =
        '<div class="col-span-full text-center py-12 text-red-500">Failed to load articles.</div>';
    }
  }
}

/**
 * Creates and returns the a DOM for a single article.
 *
 * Displays article details (Category, created at, title, body and author)
 *
 * @returns {HTMLElement} The article div element.
 */
function createArticleCard(article, currentUser) {
  const div = document.createElement("div");
  div.className =
    "bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow";

  const categoryColors = {
    Technology: "bg-blue-100 text-blue-700",
    Business: "bg-green-100 text-green-700",
    Sports: "bg-orange-100 text-orange-700",
    Entertainment: "bg-purple-100 text-purple-700",
    Politics: "bg-red-100 text-red-700",
    Health: "bg-pink-100 text-pink-700",
  };

  const categoryClass =
    categoryColors[article.category] || "bg-gray-100 text-gray-700";

  const author_name = article.author_name || "Anonymous";

  const isAuthor = currentUser && currentUser.id === article.author_id;

  div.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-3">
        <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full break-all ${categoryClass}">
          ${safeText(article.category)}
        </span>
        <time class="text-sm text-gray-500 break-all">${formatDate(article.created_at)}</time>
      </div>
      
      <h2 class="text-xl font-bold text-gray-900 mb-3">
        ${safeText(article.title)}
      </h2>
      
      <p class="text-gray-700 mb-4 leading-relaxed">
        ${safeText(article.body.substring(0, 200))}${article.body.length > 200 ? "..." : ""}
      </p>
      
      <div class="pt-4 border-t border-gray-200">
        <div class="flex items-center">
          <div class="flex flex-col xs:flex-row justify-between w-full xs:gap-0 gap-4">
            <p class="text-sm font-medium xs:w-fit w-full text-center text-gray-900">By ${safeText(author_name)}</p>
            ${
              isAuthor
                ? `
              <a href="/article/edit/index.html?id=${safeText(article.id)}" class="text-indigo-600 hover:text-indigo-700 font-medium text-sm xs:w-fit w-full text-center">
                Edit
              </a>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;

  return div;
}

/**
 * Escapes text to prevent HTML injection.
 *
 * @returns {string} Safe text to be insertet into HTML.
 */
function safeText(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
