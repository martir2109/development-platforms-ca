import { renderNavbar } from "../../ui/navbar.js";
import { renderFooter } from "../../ui/footer.js";
import { renderSignup } from "./ui.js";
import { togglePassword } from "../toggle-password.js";
import { supabase } from "../../supabase.js";
import { displayMessage } from "../../utils";

renderNavbar();
renderFooter();
renderSignup();
togglePassword();

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 2) {
      displayMessage(
        "#message-container",
        "error",
        "Name must be at least 2 characters long.",
      );
      return;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
      displayMessage(
        "#message-container",
        "error",
        "Name can only contain letters, spaces, hyphens, and apostrophes.",
      );
      return;
    }

    if (!email) {
      displayMessage("#message-container", "error", "Email is required.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      displayMessage(
        "#message-container",
        "error",
        "Please enter a valid email address.",
      );
      return;
    }

    if (!password) {
      displayMessage("#message-container", "error", "Password is required.");
      return;
    } else if (password.length < 8) {
      displayMessage(
        "#message-container",
        "error",
        "Password must be at least 8 characters long.",
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        displayMessage("#message-container", "error", error.message);
        return;
      }

      if (data.user) {
        displayMessage(
          "#message-container",
          "success",
          "Registration successful! Please check your email to verify your account.",
        );
        form.reset();
        setTimeout(() => {
          window.location.href = "/auth/sign-in/index.html";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      displayMessage("#message-container", "error", error.toString());
    }
  });
}
