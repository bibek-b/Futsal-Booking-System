import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import BookFutsal from "./Components/BookFutsal";
import About from "./Components/About";
import MyBookings from "./Components/MyBookings";
import Contact from "./Components/Contact";
import Layout from "../Layout/Layout";
import AdminLayout from "./Admin/AdminLayout/AdminLayout";
import Admin from "./Admin/Pages/Admin";
import BookFutsalAdmin from "./Admin/Pages/BookFutsalAdmin";
import MyBookingsAdmin from "./Admin/Pages/MyBookingsAdmin";
import ProtectedAdminRoutes from "./Admin/ProtectedRoutes/ProtectedAdminRoutes";
import ProtectedMyBookings from "./Admin/ProtectedRoutes/ProtectedMyBookings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout routes with navbar + footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/myBookings"
            element={
              <ProtectedMyBookings>
                <MyBookings />
              </ProtectedMyBookings>
            }
          />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* admin layout routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoutes>
              <AdminLayout />
            </ProtectedAdminRoutes>
          }
        >
          <Route index element={<Admin />} />
          <Route path="bookFutsal" element={<BookFutsalAdmin />} />
          <Route path="myBookings" element={<MyBookingsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
