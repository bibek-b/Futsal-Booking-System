import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import user from "../assets/user.webp";
import useFetchUser from "../CustomHooks/useFetchUser";
import { useActiveSectionStore } from "../stores/activeSection";
import { useIsHome } from "../CustomHooks/useIsHome";
import menuBar from "../assets/menu.svg";
import X from "../assets/cross.svg";
import { NAV_LINKS } from "../constants/navbar";

const Navbar = () => {
  const currentUser = useFetchUser();
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const activeLink = useActiveSectionStore((state) => state.activeSection);
  const [isOpen, setIsOpen] = useState(false);
  const setActiveLink = useActiveSectionStore((state) => state.setActiveSection);
  const isHome = useIsHome();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLinkClick = (link) => {
    setIsOpen(false);
    link && setActiveLink(link);
    if (isHome && link === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,255,135,0.07)]"
            : "bg-black/60 backdrop-blur-md"
        }`}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff87] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-18">

          {/* Logo */}
          <Link to="/" onClick={() => handleLinkClick("/")}>
            <img
              src="/logo.png"
              alt="Logo"
              className="w-24 h-24 md:w-36 md:h-36 object-cover mt-6"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8  font-medium tracking-wide">
            {NAV_LINKS.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.href}
                  onClick={() => handleLinkClick(data.href)}
                  className={`relative py-1 transition-colors duration-300 hover:text-[#00ff87] ${
                    activeLink === data.href
                      ? "text-[#00ff87]"
                      : "text-gray-300"
                  }`}
                >
                  {data.name}
                  {/* active underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#00ff87] rounded-full transition-all duration-300 ${
                      activeLink === data.href ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}

            {currentUser && token && (
              <li>
                <Link
                  to="/myBookings"
                  className="relative py-1 text-gray-300 transition-colors duration-300 hover:text-[#00ff87]"
                >
                  My Bookings
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#00ff87] rounded-full transition-all duration-300 ${
                      activeLink === "/myBookings" ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            )}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser?._id && token ? (
              <div className="flex items-center gap-4">
                {/* User chip */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1 pr-4 py-1">
                  <img
                    src={user}
                    alt="userImg"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00ff87]/40"
                  />
                  <span className="text-sm font-semibold text-white">
                    {currentUser.userName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-400 border border-red-400/30 px-4 py-1.5 rounded-full hover:bg-red-400/10 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="text-sm font-semibold bg-[#00ff87] text-black px-5 py-2 rounded-full hover:bg-[#00ff87]/80 transition-all duration-300 shadow-[0_0_16px_rgba(0,255,135,0.3)]">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-sm font-medium text-gray-300 border border-white/20 px-5 py-2 rounded-full hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-all duration-300">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:border-[#00ff87]/40"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? X : menuBar}
              alt="Menu"
              className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[998] transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-white/10 flex flex-col transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-[#00ff87] font-bold tracking-widest text-xs uppercase">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <img src={X} alt="Close" className="w-4 h-4" />
            </button>
          </div>

          {/* drawer links */}
          <ul className="flex flex-col px-6 pt-6 gap-1 flex-1">
            {NAV_LINKS.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.href}
                  onClick={() => handleLinkClick(data.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeLink === data.href
                      ? "bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {data.name}
                </Link>
              </li>
            ))}

            {currentUser && token && (
              <li>
                <Link
                  to="/myBookings"
                  onClick={() => handleLinkClick("/myBookings")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeLink === "/myBookings"
                      ? "bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  My Bookings
                </Link>
              </li>
            )}
          </ul>

          {/* drawer auth */}
          <div className="px-6 py-6 border-t border-white/10">
            {currentUser?._id && token ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                  <img
                    src={user}
                    alt="userImg"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00ff87]/40"
                  />
                  <span className="text-sm font-semibold text-white">
                    {currentUser.userName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-sm font-medium text-red-400 border border-red-400/20 py-2.5 rounded-xl hover:bg-red-400/10 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-sm font-semibold bg-[#00ff87] text-black py-2.5 rounded-xl hover:bg-[#00ff87]/80 transition-all duration-300 shadow-[0_0_16px_rgba(0,255,135,0.2)]">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-sm font-medium text-gray-300 border border-white/20 py-2.5 rounded-xl hover:border-[#00ff87]/40 hover:text-[#00ff87] transition-all duration-300">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;