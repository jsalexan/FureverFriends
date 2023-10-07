const sequelize = require('../config/connection');
const { User, Post, Profile } = require('../models'); // Import the Profile model
const userData = require('./userData.json');
const postData = require('./postData.json');
const profileData = require('./profileData.json'); // Add profile data import


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create profiles for each user
  for (const i in users) {
    await Profile.create({
      ...profileData[i], // Use the corresponding profile data
      user_id: users[i].id, // Set user_id to the generated user's id
    });
  }

  for (const post of postData) {
    const user = users[Math.floor(Math.random() * users.length)];
    await Post.create({
      ...post,
      user_id: user.id,
    });
  }

  process.exit(0);
};

seedDatabase();






