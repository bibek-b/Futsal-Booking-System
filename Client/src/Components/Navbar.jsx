import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import user from "../assets/user.webp";
import useFetchUser from "../CustomHooks/useFetchUser";
const Navbar = () => {
  const currentUser = useFetchUser();
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav className="w-full flex justify-center h-20">
        <ul
          className={`flex items-center ${
            token ? "gap-70" : "gap-115"
          } text-[18px] font-medium`}
        >
          <div className="flex space-x-25">
            <Link to="/">
              <li className="cursor-pointer hover:text-gray-400">Home</li>
            </Link>
            <Link to="bookfutsal">
              <li className="cursor-pointer hover:text-gray-400">
                Book Futsal{" "}
              </li>
            </Link>
            {currentUser && token && (
              <Link to="/myBookings">
                <li className="cursor-pointer hover:text-gray-400">
                  My Bookings
                </li>
              </Link>
            )}
            <Link to="about">
              <li className="cursor-pointer hover:text-gray-400">About us</li>
            </Link>
            <Link to="/contact">
              <li className="cursor-pointer hover:text-gray-400">Contact us</li>
            </Link>
          </div>
          <div className="space-x-10">
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
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
