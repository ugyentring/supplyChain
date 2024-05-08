const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: String,
  name: String,
  description: String,
  website: String,
  location: String,
  image: String,
  role: String,
});
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
