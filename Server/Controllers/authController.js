import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const body = req.body;

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      userName: body.userName,
      email: body.email,
      password: hashedPassword,
      phoneNum: body.phoneNum,
    });
    return res.status(200).json({ message: "User Created Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Email already exists" });
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
    //generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ Token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Login Failed" });
  }
};

export { Register, Login };
