const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "manu", "supp", "reta"],
  },
});

//hash password
authSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    next();
  } catch (error) {
    return next(error);
  }
});

//compare password
authSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
