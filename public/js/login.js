const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/post');
      } else {
        alert("Email/password is incorrect, please re-enter.");
      }
    }
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const createAccountButton = document.getElementById("createAccount");
    if (createAccountButton) {
        createAccountButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior
            window.location.href = "./createac"; // Navigate to the create account page
        });
    }
});

  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  