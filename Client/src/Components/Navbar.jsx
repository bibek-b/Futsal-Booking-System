import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import user from "../assets/user.webp";
import useFetchUser from "../CustomHooks/useFetchUser";
import { useActiveSectionStore } from "../stores/activeSection";
import { useIsHome } from "../CustomHooks/useIsHome";
import menuBar from "../assets/menu.svg";
import X from "../assets/cross.svg";

const NAV_LINKS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About Us", href: "about" },
  { id: 3, name: "Book Futsal", href: "bookFutsal" },
  { id: 4, name: "Contact Us", href: "contact" },
];

const Navbar = () => {
  const currentUser = useFetchUser();
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const activeLink = useActiveSectionStore((state) => state.activeSection);
  const [isOpen, setIsOpen] = useState(false);
  const setActiveLink = useActiveSectionStore(
    (state) => state.setActiveSection,
  );
  const isHome = useIsHome();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const navbarBg =
  //   !isHome || scrolled
  //     ? "bg-black/30 shadow-md backdrop-blur-lg"
  //     : "bg-transparent";

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
    <div>
      <nav
        className={`w-full  flex justify-center h-20 fixed top-0  bg-black/80 shadow-md  z-[999]`}
      >
        <ul
          className={`flex w-full items-center md:justify-around justify-between   text-sm lg:text-[18px] font-medium md:px-10 px-2`}
        >
          {/* ${
            token ? "gap-70" : "gap-115"
          } */}
          <Link to="/" onClick={() => handleLinkClick("/")}>
            <img
              src="/logo.png"
              alt="Logo"
              className="lg:w-60 lg:h-60 w-30 h-30 object-cover md:mt-15 mt-5"
            />
          </Link>
          <div className="md:flex hidden space-x-25">
            {NAV_LINKS.map((data) => (
              <Link
                key={data.id}
                to={data.href}
                onClick={() => handleLinkClick(data.href)}
                className={`cursor-pointer transition-all duration-300 hover:text-gray-400 ${
                  activeLink == data.href && "text-[#00ff87]"
                }`}
              >
                {data.name}
              </Link>
            ))}

            {currentUser && token && (
              <Link to="/myBookings">
                <li className="cursor-pointer hover:text-gray-400">
                  My Bookings
                </li>
              </Link>
            )}
          </div>
          <div className="space-x-10 md:block hidden">
            {currentUser?._id && token ? (
              <div className="flex items-center justify-center gap-10">
                <div className="mt-5 space-y-1 text-center">
                  <img
                    src={user}
                    alt="userImg"
                    className="w-11 h-11 rounded-[50%] object-cover"
                  />
                  <span className="font-bold">{currentUser.userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer  bg-[#ff3e3e] w-20 p-1 rounded hover:bg-[#ff3e3eba]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="cursor-pointer bg-[#00ff87] p-2 rounded-2xl hover:bg-[#00ff8886] w-25">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className=" cursor-pointer hover:text-gray-400">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="transition-all duration-700 ease-in-out z-10">
            <img
              src={isOpen ? X : menuBar}
              alt="Menu"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-8 h-8 md:hidden transform  transition-transform duration-700 ${isOpen ? "rotate-90" : "rotate-0"}`}
            />
          </div>
        </ul>

        <div
          className={`absolute h-60 transition-all duration-500 ease-in-out bg-black w-full  ${isOpen ? "top-0" : "-top-60"}`}
        >
          {isOpen && (
            <ul className="flex flex-col gap-4 pt-15 px-5">
              {NAV_LINKS.map((data) => (
                <Link
                  to={data.href}
                  onClick={() => handleLinkClick(data.href)}
                  className={`cursor-pointer transition-all duration-300 hover:text-gray-400 ${
                    activeLink == data.href && "text-[#00ff87]"
                  }`}
                >
                  {data.name}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {/* <HeroPage /> */}
    </div>
  );
};

export default Navbar;
