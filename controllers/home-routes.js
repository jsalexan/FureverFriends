const router = require("express").Router();
const { Post, User, Profile, Comment } = require("../models");
const withAuth = require("../utils/auth");
const path = require("path");

// get route for login page
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/post");
    return;
  }
  res.render("login");
});

//GET route for posts
router.get("/post", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "id"],
        include: { model: Profile, attributes: ["avatar"] },
      },
      {
        model: Comment,
      },
    ],
    order: [['date_created', 'DESC']],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("post", { posts, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET route for single post and comments
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "image", "imageId", "body", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_body", "post_id", "user_id", "dateCreated"],
        include: {
          model: User,
          attributes: ["name", "id"],
          include: [{ model: Profile, attributes: ["avatar"] }],
        },
      },
      {
        model: User,
        attributes: ["name", "id"],
        include: { model: Profile, attributes: ["avatar"] },
      },
    ],
  })
    .then((postData) => {
      
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }

      const post = postData.get({ plain: true });

      res.render("singlepost", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get route for profile with auth
router.get("/profile", withAuth, async (req, res) => {
  console.log("here");
  try {
    // find logged user based on session id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Profile }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/createac', withAuth, async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Redirect to the createac page, which will render the createProfile page
    res.redirect('/createac');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/createac", (req, res) => {
  res.render("createac");
});

router.get("/createProfile", (req, res) => {
  res.render("createProfile");
});

router.get("/profile/:id", async (req, res) => {
  try {
    const profileData = await Profile.findOne(
      { where: { user_id: req.params.id } },
      {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      }
    );

    const profile = profileData.get({ plain: true });

    console.log("profile:", profile);

    res.render("profile", {
      profile,
      logged_in: true,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
