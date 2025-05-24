import { Outlet } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../../Components/Footer";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
