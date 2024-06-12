import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Error from "../pages/Error";
import DashboardRoutes from "./DashboardRoutes";
import Register from "../pages/auth/Register";
import Activate from "../pages/auth/Activate";
import AddOrg from "../pages/auth/AddOrg";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassord from "../pages/auth/ResetPassword";
import Homepage from "../pages/Homepage";
import About from "../pages/About";
import LandingProjects from "../pages/Projects";
import SingleProject from "../pages/SingleProject";

function MainRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Suspense fallback={<Skeleton />}> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<LandingProjects />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-org" element={<AddOrg />} />
        <Route path = '/activate' element={<Activate />} />
        <Route path = '/forgot-password' element={<ForgotPassword />} />
        <Route path = '/reset-password' element={<ResetPassord />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
}

export default MainRoutes;