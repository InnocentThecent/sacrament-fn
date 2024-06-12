import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useRef } from "react";
import getLanguage from "../../utils/getLanguage";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const currentRoute = useLocation()?.pathname;
  const lanRef = useRef<any>();
  const lan = getLanguage();
  const userLang = window.navigator.language;

  const handleLanChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    i18next.changeLanguage(value);
  };

  useEffect(() => {
    if (lanRef.current) {
      lanRef.current.value = lan;
    }
  }, []);

  return (
    <>
      {/*  {/* <!--/  Header Area  */}
      <header className="header z-50">
        {/*  {/* <!--/  Header Inner  */}
        <div className="header-inner">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  {/*  {/* <!--/  Start Logo  */}
                  <div className="logo w-24 mt-0">
                    <a href="index.html">
                      <img src={logo} alt="#" />
                    </a>
                  </div>
                  {/*  {/* <!--/  End Logo  */}
                  {/*  {/* <!--/  Mobile Nav  */}
                  <div className="mobile-nav"></div>
                  {/*  {/* <!--/  End Mobile Nav  */}
                </div>
                <div className="col-lg-7 col-md-8 col-12">
                  {/*  {/* <!--/  Main Menu  */}
                  <div className="main-menu">
                    <nav className="navigation">
                      <ul className="nav menu">
                        <li className={`${currentRoute === "/" && "active"}`}>
                          <Link to="/">{t("Home")}</Link>
                          {/* <ul className="dropdown">
                            <li>
                              <a href="index.html">Home Page 1</a>
                            </li>
                          </ul> */}
                        </li>

                        <li
                          className={`${
                            currentRoute === "/services" && "active"
                          }`}
                        >
                          {/* <Link to="/services">{t("Services")}</Link> */}
                        </li>
                        {/* <li>
                          <a href="#">
                            Pages <i className="icofont-rounded-down"></i>
                          </a>
                          <ul className="dropdown">
                            <li>
                              <a href="404.html">404 Error</a>
                            </li>
                          </ul>
                        </li> */}

                        <li
                          className={`${
                            currentRoute === "/contact-us" && "active"
                          }`}
                        >
                          {/* <Link to="/contact-us">{t("Contact us")}</Link> */}
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {/*  {/*  {/* <!--/ / End Main Menu  */}
                </div>
                <div
                  className={` col-lg-2 col-12 ${
                    currentRoute == "/login" && "hidden"
                  }`}
                  style={{
                    display: currentRoute == "login" ? "none" : "",
                    marginLeft: "0",
                  }}
                >
                  <div className="row">
                    <div className="get-quote">
                      <Link to="/login" className="btn">
                        {t("Login")}
                      </Link>
                    </div>
                    <div
                      className={` my-auto p-2  text-white   cursor-pointer`}
                    >
                      <select
                        defaultValue={userLang}
                        data-testid="lanChange"
                        ref={lanRef}
                        onChange={(e) => handleLanChange(e)}
                        className="ml-auto border border-primary bg-white  px-2 h-9 rounded-md text-xs md:text-sm text-gray-600 dark:text-dark-text-fill dark:bg-dark-bg outline-none"
                      >
                        <option value="en">English</option>
                        <option value="kn">Ikinyarwanda</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  {/*  {/* <!--/ / End Header Inner  */}
      </header>
      {/* {/*  {/* <!--/  End Header Area  */}
    </>
  );
}
