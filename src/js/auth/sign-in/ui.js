import { stylePopUpContainer } from "../../utils";

//Template used for sign in: https://www.creative-tim.com/twcomponents/component/login-form-35

const signInHTML = `<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-4 sm:p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          <div id="message-container"></div>
    <form id="signin-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          name="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          name="password"
          id="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox" id="show-password" class="cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <span class="ml-2 text-sm text-gray-600">Show password</span>
        </label>
      </div>

      <button type="submit" id="signin-btn" class="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        Sign In
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600">
      Don't have an account? 
      <a href="/auth/sign-up/index.html" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
    </div>
  </div>
</div>`;

export function renderSignin() {
  const signinContainer = document.getElementById("signin-container");
  const popupContainer = document.getElementById("popup-container");
  stylePopUpContainer(popupContainer);

  if (!signinContainer) {
    displayMessage(popupContainer, "error", "Sign In container not found");
    setTimeout(() => {
      popupContainer.innerHTML = "";
    }, 2000);
    return;
  }

  signinContainer.innerHTML = signInHTML;
}
