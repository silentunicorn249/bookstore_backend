import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  type: String,
  hashedPass: String,
});

const User = mongoose.model("users", userSchema);

export default User;
