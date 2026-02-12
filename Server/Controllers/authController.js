import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const Register = async (req, res) => {
  const body = req.body;

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      phoneNum: body.phoneNum,
    });
    const { token } = generateToken(user);

    return res.status(200).json({ message: "User Created Succesfully", user, token });
  } catch (error) {
      // Handle duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]; // gets "phoneNum"
    return res.status(400).json({ 
      error: `${field} already exists. Please use a different one.` 
    });
  }
    return res.status(500).json({ error: error });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //find user in db
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });
    //check  password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });
    const { token } = generateToken(user);
   
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Login Failed" });
  }
};

export { Register, Login };
