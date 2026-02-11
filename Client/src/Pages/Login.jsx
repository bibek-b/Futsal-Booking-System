import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../API REQUEST/apiRequest";
import { AuthContext } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import footBallImg from "../assets/uclball.png";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/auth/login", { email, password });
      const token = jwtDecode(res.data.token);
      login(res.data.Token);
      navigate(token.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.log(error);
      setError("Server error while login, Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
        <caption className="text-5xl font-extrabold">Sign in</caption>

        <div className="flex flex-col gap-2 text-[18px]">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="border rounded p-2 w-80 "
            placeholder="Your Email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="border rounded p-2 w-80 "
            placeholder="Your Password"
            required
          />
        </div>
        <div className="text-[17px]">
          {error && <span className="text-[#ff3e3e]">{error} </span>}
        </div>
        <div className="w-full  flex flex-col items-center gap-3 ">
          <button
            className="bg-[#ff6b00] rounded w-30 text-[17px] p-2 cursor-pointer hover:bg-[#ff6a00a0] border-0 outline-0"
            type="submit"
          >
            Login
          </button>
          <div>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#f39450] hover:text-[#f3945099]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
