import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../API REQUEST/apiRequest";
import { AuthContext } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const inputClass = `
  w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm
  placeholder:text-white/25 focus:outline-none focus:border-[#00ff87]/50
  focus:bg-[#00ff87]/5 transition-all duration-300
`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/login", { email, password });
      const token = jwtDecode(res.data.token);
      login(res.data.token);
      navigate(token.role === "admin" ? "/admin" : "/");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Server error while login, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* ── left panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">

        {/* grid bg */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* green glow */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#00ff87]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#00ff87]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* brand */}
        <Link to="/" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black tracking-tight leading-none">
              Bibek <span className="text-[#00ff87]">Futsal</span>
            </h1>
            <p className="text-4xl font-light italic text-white/20 tracking-widest mt-1">
              ArenaX
            </p>
          </motion.div>
        </Link>

        {/* big decorative number */}
        <span className="absolute right-8 bottom-12 text-[220px] font-black text-white/[0.03] select-none leading-none pointer-events-none">
          X
        </span>

        {/* bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-white/30 text-sm tracking-wide max-w-xs"
        >
          Kathmandu's premier futsal arena — book your slot and get on the
          pitch.
        </motion.p>
      </div>

      {/* ── right panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative">

        {/* mobile brand */}
        <Link to="/" className="absolute top-8 left-6 lg:hidden">
          <span className="text-xl font-black">
            Bibek <span className="text-[#00ff87]">Futsal</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-8"
        >
          {/* heading */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#00ff87]" />
              <span className="text-[#00ff87] text-xs font-semibold tracking-[0.25em] uppercase">
                Welcome back
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight">Sign In</h2>
            <p className="text-white/40 text-sm">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ff87] text-black text-sm font-bold py-3 rounded-full
                         shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_32px_rgba(0,255,135,0.5)]
                         transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </motion.button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* register link */}
          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#00ff87] font-semibold hover:underline underline-offset-4 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;