const viewProfileHandler = async (event) => {
  event.preventDefault();

  // Get the user ID from the clicked profile link
  const userId = event.target.getAttribute('data-user-id');

  if (userId) {
    try {
      const response = await fetch(`/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        // Use userData to display the profile information or redirect to a profile page
         // You can update this part to display the user's profile
      } else {
        alert('Failed to fetch user profile');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching user profile');
    }
  }
};

document.querySelector('.viewProfiles').addEventListener('click', viewProfileHandler);
