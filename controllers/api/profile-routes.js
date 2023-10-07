const router = require('express').Router();
const { Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// Get the current user's own profile
// get route for profile with auth
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged-in user based on session id
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Profile }],
//     });

//     if (!userData) {
//       res.status(404).json({ message: "No user found with this id!" });
//       return;
//     }

//     const user = userData.get({ plain: true });

//     if (user.Profile) {
//       // User has a profile, render the existing profile
//       res.render("profile", {  
//         profile: user.Profile,
//         logged_in: true,
//         user_id: req.session.user_id,
//       });
//     } else {
//       // User does not have a profile, render the create profile form
//       res.render("createProfile", {
//         logged_in: true,
//         user_id: req.session.user_id,
//       });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get a specific user's profile by ID
// router.get("/profile/:id", async (req, res) => {
//   try {
//     const profileData = await Profile.findOne(
//       { where: { user_id: req.params.id } },
//       {
//         include: [
//           {
//             model: User,
//             attributes: ["name"],
//           },
//         ],
//       }
//     );

//     const profile = profileData.get({ plain: true });

//     console.log("profile:", profile);

//     res.render("profile", {
//       profile,
//       logged_in: true,
//       user_id: req.session.user_id,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProfile);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;