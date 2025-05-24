import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import useFetchUser from "../../CustomHooks/useFetchUser";
import admin from "../../assets/admin.jpg";

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const currentUser = useFetchUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className="w-full flex justify-center h-20">
        <ul className="flex items-center gap-170 text-[18px] font-medium">
          <div className="flex space-x-25">
            <Link to="/admin">
              <li className="cursor-pointer hover:text-gray-400">Dashboard</li>
            </Link>
            <Link to="/admin/bookfutsal">
              <li className="cursor-pointer hover:text-gray-400">
                Book Futsal
              </li>
            </Link>
            <Link to="/admin/myBookings">
              <li className="cursor-pointer hover:text-gray-400">
                My Bookings
              </li>
            </Link>
          </div>
          <div className="space-x-10">
            {currentUser?._id ? (
              <div className="flex items-center justify-center gap-10">
                <div className="mt-5 space-y-1 text-center">
                  <img
                    src={admin}
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
                  <button className="cursor-pointer hover:text-gray-400 cursor-pointer bg-[#00ff87] p-2 rounded-2xl hover:bg-[#00ff8886] w-25">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="cursor-pointer hover:text-gray-400">
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

export default AdminNavbar;
