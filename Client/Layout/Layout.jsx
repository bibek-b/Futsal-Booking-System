import Navbar from "../src/Components/Navbar";
import Footer from "../src/Components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
