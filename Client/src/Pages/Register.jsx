import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../API REQUEST/apiRequest";
import { useState } from "react";
import footBallImg from "../assets/uclball.png";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    const newUser = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      phoneNum: inputs.phNo,
    };

    if (inputs.password !== inputs.confirmPassword)
      return setError("Passwords doesn't match");

    try {
      const res = await apiRequest.post("/auth/register", newUser);
      const token = jwtDecode(res.data.token);
      login(res.data.token);
      navigate(token.role === "admin" ? "/admin" : "/");
    } catch (error) {
      setError("Server error while register, Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Link to="/">
          <div className="absolute left-30 top-30 text-center">
            <h1 className="text-6xl ">
              Bibek <span className="text-[#0cb455]">Futsal</span>
            </h1>{" "}
            <i className="text-5xl">ArenaX</i>
          </div>
          <img
            src={footBallImg}
            alt="footballImg"
            className="w-60 text-center absolute top-60 left-40"
          />
        </Link>
        <caption className="text-5xl font-extrabold">Sign Up</caption>

        <div className="flex flex-col gap-2 text-[18px]">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            className="border rounded p-2 w-80 "
            placeholder="Immortal"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="border rounded p-2 w-80 "
            placeholder="Immortal@gmail.com"
          />
          <label htmlFor="phNo">Phone Number:</label>
          <input
            type="telNo"
            name="phNo"
            className="border rounded p-2 w-80 "
            placeholder=" +977-98XXXXXXXX"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="border rounded p-2 w-80 "
            placeholder="Password"
          />
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            className="border rounded p-2 w-80 "
            placeholder="Confirm Password"
          />
        </div>
        <div className="text-[17px]">
          {error && <span className="text-[#ff3e3e]">{error} </span>}
        </div>
        <div className="w-full text-center space-y-4">
          <button
            className="bg-[#ff6b00] rounded w-fit p-2 cursor-pointer hover:bg-[#ff6a00a0] border-0 outline-0"
            type="submit"
          >
            Create Account
          </button>

          <div>
            Already have an account?{" "}
            <Link to="/login" className="text-[#f39450] hover:text-[#f3945099]">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
