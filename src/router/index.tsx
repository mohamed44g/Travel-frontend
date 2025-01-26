import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Home from "../pages/Home";
import Destination from "../pages/destination";
import DestinationDetail from "../pages/destinationDetail";
import Profile from "../pages/profile";
import ContactUs from "../pages/Contactus";
import ProtectedRoute from "./protectedRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/destination" element={<Destination />} />
      <Route path="/destination/:id" element={<DestinationDetail />} />
      <Route path="/Contact" element={<ContactUs />} />
    </Routes>
  );
}

export default AppRoutes;
