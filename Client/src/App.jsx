import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BookFutsal from "./Components/BookFutsal";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Layout from "../Layout/Layout";
import ProtectedAdminRoutes from "./Admin/ProtectedRoutes/ProtectedAdminRoutes";
import ProtectedMyBookings from "./Admin/ProtectedRoutes/ProtectedMyBookings";
import { lazy, Suspense } from "react";
import SuspenseLoader from "./Components/common/SuspenseLoader";

const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const MyBookings = lazy(() => import("./Components/MyBookings"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout/AdminLayout"));
const Admin = lazy(() => import("./Admin/Pages/Admin"));
const BookFutsalAdmin = lazy(() => import("./Admin/Pages/BookFutsalAdmin"));
const MyBookingsAdmin = lazy(() => import("./Admin/Pages/MyBookingsAdmin"));



const App = () => {
  return (
    <BrowserRouter>
   <Suspense fallback={<SuspenseLoader />}>
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
   </Suspense>
    </BrowserRouter>
  );
};

export default App;
