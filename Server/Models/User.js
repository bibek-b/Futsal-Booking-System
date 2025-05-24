import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: Number,
      unique: true,
      required: true,
      length: 10,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
