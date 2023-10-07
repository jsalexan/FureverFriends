const newFormHandler = async (event) => {
  event.preventDefault();

  var avatar = document.querySelector(".avatar:checked").value;
  const dog_name = document.querySelector("#dog-name").value.trim();
  const breed = document.querySelector("#dog-breed").value;
  const gender = document.querySelector(".gender:checked").value;
  const size = document.querySelector(".size:checked").value;
  const neighborhood = document.querySelector("#dog-neighborhood").value.trim();
  const hobbies = document.querySelector("#dog-hobbies").value.trim();

  // Selecting avatar
  switch (avatar) {
    case "optionOne":
      avatar =
      "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814666/dog2_cwiskm.png";
      break;
    case "optionTwo":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814666/dog3_ad2syv.png";
      break;
    case "optionThree":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814665/dog4_u4kbfh.png";
      break;
    case "optionFour":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814662/dog11_qofpmb.png";
      break;
    case "optionFive":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814664/dog6_edn6fq.png";
      break;
    case "optionSix":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814663/dog9_uu5flo.png";
      break;
    case "optionSeven":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814663/dog8_uh9xlw.png";
      break;
    case "optionEight":
      avatar =
        "https://res.cloudinary.com/dlxjksvbc/image/upload/v1694814662/dog12_bbhlea.png";
      break;
  }

  // If all profile fields are answered, then create a new profile
  if (
    avatar &&
    dog_name &&
    breed &&
    gender &&
    size &&
    neighborhood &&
    hobbies
  ) {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
        avatar,
        dog_name,
        breed,
        gender,
        size,
        neighborhood,
        hobbies,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If profile is successfully created, then redirects to the profile. If there is an error creating the profile, it alerts the users to try again.

    var userid = document.getElementById("profileUserId").getAttribute("data-userid");
    if (response.ok) {
      document.location.replace(`/profile/${userid}`);
    } else {
      alert("Failed to create profile. Please try again");
    }
  }
};

document
  .querySelector(".new-profile-form")
  .addEventListener("submit", newFormHandler);