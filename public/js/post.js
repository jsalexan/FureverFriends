  // Function to fetch and update user avatars in posts
  const updatePostAvatars = async () => {
    const postAvatars = document.querySelectorAll('.one-avatar');

    for (const avatar of postAvatars) {
      const userId = avatar.getAttribute('data-user-id');
      const response = await fetch(`/profile/${userId}`);
 
      if (response.ok) {
        const profileData = await response.json();
        const avatarUrl = profileData.avatar;
        avatar.src = avatarUrl;
      }
    }
  };

  // Call the function to update avatars when the page loads
  updatePostAvatars();


const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title');
  const body = document.querySelector('#post-body').value.trim();
  const image = document.querySelector('#image');
  const formData = new FormData(document.querySelector(".form"));

  if (title && body && image) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to create post');
    }
  }
};

const deleteBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id)
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Not your post to delete! Woof!');
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const createPostBar = document.querySelector(".create-post-bar");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const createPostForm = document.querySelector(".create-post-form"); 

  createPostBar.addEventListener("click", function () {
    // Show the modal overlay and form when clicking the "+"
    modalOverlay.style.display = "flex"; // or "block" to display the modal
    createPostForm.style.display = "block"; // Show the form
  });

  modalClose.addEventListener("click", function () {
    // Hide the modal overlay and form when clicking the close button
    modalOverlay.style.display = "none";
    createPostForm.style.display = "none"; // Hide the form
  });

  // Initially, keep the modal and form hidden
  modalOverlay.style.display = "none";
  createPostForm.style.display = "none";
});



document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-listz')
  .addEventListener('click', deleteBtnHandler);
