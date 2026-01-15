import { renderNavbar } from "/src/js/ui/navbar.js";
import { renderFooter } from "/src/js/ui/footer.js";
import { renderSignin } from "./ui";
import { togglePassword } from "../toggle-password";
import { supabase } from "/src/js/supabase.js";
import { displayMessage } from "/src/js/utils";

renderNavbar();
renderFooter();
renderSignin();
togglePassword();

const signinForm = document.getElementById("signin-form");

if (signinForm) {
  signinForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        displayMessage("#message-container", "error", error.message);
        return;
      }

      if (data.user) {
        displayMessage(
          "#message-container",
          "success",
          "Login successful! Redirecting...",
        );
        setTimeout(() => {
          location.href = "/";
        }, 1000);
      }
    } catch (error) {
      displayMessage("#message-container", "error", error.toString());
    }
  });
}
