import { logout, getCurrentUser } from "/src/js/auth.js";

//Template used for navbar: https://www.creative-tim.com/twcomponents/component/navbar

const navbarNotSignedInHTML = `
	<div class="bg-white shadow fixed w-full z-9999">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="shrink-0">
        <a href="/index.html">
          <img class="w-auto h-15" src="/assets/logo/logo-with-white-background.png">
          </a>
        </div>

        <div class="hidden sm:flex sm:items-center">
          <a href="/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 mr-4">Home</a>
          <a href="/auth/sign-in/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 mr-4">Sign in</a>
          <a href="/auth/sign-up/index.html" class="text-gray-800 text-sm font-semibold  hover:text-indigo-600 hover:border-indigo-600">Sign up</a>
        </div>

        <div id="mobile-menu-toggle" class="sm:hidden cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-black" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"/>
          </svg>
        </div>
      </div>
      
      <div id="mobile-menu" class="block sm:hidden bg-white py-2">
          <div class="flex justify-center items-center pt-2">
            <a href="/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 mr-4">Home</a>
            <a href="/auth/sign-in/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 mr-4">Sign in</a>
            <a href="/auth/sign-up/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 hover:border-indigo-600">Sign up</a>
        </div>
      </div>
  </div>
</div>
`;

const navbarSignedInHTML = (userEmail) => `
	<div class="bg-white shadow fixed w-full">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="shrink-0">
        <a href="/index.html"
        title="Home">
          <img class="w-auto h-15 cursor-pointer" src="/assets/logo/logo-with-white-background.png">
          </a>
        </div>
        <div class="hidden sm:flex sm:items-center">
          <div class="flex items-center mr-4">
            <span class="text-gray-800 text-sm font-medium">${userEmail}</span>
          </div>
          <a href="/index.html" class="text-gray-800 text-sm font-semibold hover:text-indigo-600 mr-4">Home</a>

          <button id="logout-btn" class="cursor-pointer text-white bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 text-sm font-semibold px-4 py-2 rounded-lg transition">Logout</button>
        </div>

        <div id="mobile-menu-toggle" class="sm:hidden cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-black" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"/>
          </svg>
        </div>
      </div>
      
      <div id="mobile-menu" class="block sm:hidden bg-white py-2">
        <div class="flex flex-col">
            <div class="flex items-center justify-center mt-4">
              <span class="text-gray-800 text-sm font-medium">${userEmail}</span>
            </div>
          <button id="logout-btn-mobile" class="cursor-pointer text-white bg-red-600 hover:bg-red-700 text-sm font-semibold px-4 py-2 rounded-lg mt-2 transition">Logout</button>
        </div>
      </div>
  </div>
</div>
`;

function setActiveNavLink() {
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll("a[href]:not(:has(img))");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (
      linkPath === currentPath ||
      (linkPath === "/index.html" && currentPath === "/")
    ) {
      link.classList.add(
        "text-white",
        "font-bold",
        "bg-indigo-600",
        "rounded-lg",
        "px-4",
        "py-2",
        "hover:text-indigo-600",
        "hover:bg-white",
        "border",
        "border-indigo-600",
      );
    }
  });
}

/**
 * Render the navigation bar based on the user's authentication status (signed in or signed out).
 */
export async function renderNavbar() {
  const navbarContainer = document.getElementById("navbar-container");

  if (!navbarContainer) {
    console.error("Navbar container not found");
    return;
  }

  try {
    const user = await getCurrentUser();

    if (user && user.email) {
      navbarContainer.innerHTML = navbarSignedInHTML(user.email);
    } else {
      navbarContainer.innerHTML = navbarNotSignedInHTML;
    }

    setActiveNavLink();

    const hamburger = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (hamburger && mobileMenu) {
      mobileMenu.classList.add("hidden");
      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
          mobileMenu.classList.add("hidden");
        }
      });
    }

    const logoutBtn = document.getElementById("logout-btn");
    const logoutBtnMobile = document.getElementById("logout-btn-mobile");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", logout);
  } catch (error) {
    console.error("Error rendering navbar:", error);
    navbarContainer.innerHTML = navbarNotSignedInHTML;
  }
}
