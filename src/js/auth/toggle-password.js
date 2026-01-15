/**
 * Toggles the visibility of the password input field.
 *
 * Finds the password input and checkbox elements in the DOM.
 * Stops execution if either element is not found.
 * Adds a "change" event listener to the checkbox.
 * When the checkbox is checked, changes the password input type to "text" to show the password.
 * When the checkbox is unchecked, changes the input type back to "password" to hide the password.
 */
export function togglePassword() {
  const passwordInput = document.getElementById("password");
  const checkbox = document.getElementById("show-password");

  if (!passwordInput || !checkbox) return;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
}
