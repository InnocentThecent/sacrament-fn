import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboards";
import DashboardLayout from "./layouts/DashboardLayout";
import Error from "./pages/Error";
import Members from "./pages/members/list-members";
import Settings from "./pages/Settings";
import Activate from "./pages/auth/Activate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassord from "./pages/auth/ResetPassword";
import Home from "./pages/homepage/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/ProfileEdit";
import Sacraments from "./pages/sacrament/list-sacraments";
import Applications from "./pages/applications/list-applications";
import Offerings from "./pages/offerings/offerings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "activate",
    element: <Activate />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassord />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "sacraments",
        element: <Sacraments />,
      },
      {
        path: "members",
        element: <Members />,
      },

      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "offerings",
        element: <Offerings />,
      },
      {
        path: "profile",
        children: [
          {
            path: ":id",
            element: <Profile />,
          },
          {
            path: "edit",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
