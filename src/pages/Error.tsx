import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/NotFoundImg.png";
import DashHeader from "../components/DashboardHeader";
import Sidebar from "../layouts/Sidebar";
import { useState } from "react";
import Header from "./homepage/Header";
import { useTranslation } from "react-i18next";

function Error() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation()?.pathname;
  const isDashboard = location?.split("/")[1] === "dashboard";
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const navigateHome = () => {
    navigate(isDashboard ? "/dashboard" : "/");
  };

  const user = localStorage.getItem("auth");
  if (!user && isDashboard) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      {isDashboard ? <DashHeader /> : <Header />}
      {isDashboard && <Sidebar toggle={handleClick} style="hidden lg:flex" />}

      <div className="errorImg flex flex-col items-center justify-center  h-screen w-screen text-center">
        <div>
          <img
            src={NotFoundImg}
            className="max-w-36 max-h-32 md:max-w-44 md:max-h-40 lg:max-w-52 lg:max-h-48 xl:max-w-2xl xl:max-h-96"
            alt="404"
          />
        </div>
        <div className="max-w-screen-md  text-gray-600">
          <h1 className="font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            {t("PAGE NOT FOUND")}
          </h1>
          <p className="my-3 px-8 md:px-14 lg:px-0 text-xl">
            {t("error_page_paragraph")}
          </p>
          <button
            onClick={navigateHome}
            className="mt-2  px-8 text-xl font-bold"
          >
            {t("Back Home")}
          </button>
        </div>
      </div>
    </>
  );
}

export default Error;
