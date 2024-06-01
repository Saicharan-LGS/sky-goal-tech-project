import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobileNumber: { type: String },
  profile: { type: String },
});

const User = mongoose.model("user", userSchema);

export default User;
