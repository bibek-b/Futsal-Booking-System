import User from "../Models/User.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password"); //.select("-password") -> removes password field
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export { getMe, getUsers };
