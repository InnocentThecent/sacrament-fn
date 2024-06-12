import { useEffect, useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { guestFields, loginFields } from "../../constants/formFields";
import Input from "../../components/Input";
import { loginUser } from "../../services/auth.api";
import { UserContext } from "../../hooks/useAuth";

import logo from "../../assets/logo.png";

import loginAvatar from "../../assets/catholic-pigeon-cross.png";
import Header from "../homepage/Header";
import Tooltip from "../../components/ToolTip";
import { useTranslation } from "react-i18next";
import { guestPassword } from "../../constants";

type fields = {
  [key: string]: string | number;
};
const fieldState: fields = {};

loginFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const location = useLocation();

  const [openTab, setOpenTab] = useState("Login with account");
  const [loginState, setLoginState] = useState(fieldState);
  const { error, user: userC } = useAppSelector((state) => state.login);
  const user = JSON.parse(localStorage.getItem("auth") as any);

  useEffect(() => {
    if (userC) {
      login({ user: { ...userC } });

      if (location?.state?.currentPage == "projects") {
        return navigate("/dashboard/projects");
      }

      if (user?.email || userC?.email) {
        navigate("/dashboard/");
      }
    }
  }, [userC]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let myFields;
    if (openTab === "Login with account") {
      myFields = {
        username: loginState.email as string,
        password: loginState.password as string,
      };
    } else {
      myFields = {
        username: loginState?.uniqueCode,
        password: guestPassword,
      };
    }

    console.log(myFields);
    dispatch(loginUser(myFields));
  };

  return (
    <>
      <Header />
      <div className="bg-[#587DFF]  h-screen  flex flex-col  justify-center overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden ">
          <div className="hidden min-h-full bg-primary md:flex justify-center items-center ">
            <img
              src={loginAvatar}
              alt=""
              className="
         h-2/5 w-2/5 mr-20
         "
            />
            <div className="flex flex-col justify-center items-center">
              {/* <h2 className="text-5xl font-bold text-white">Tele</h2>
            <h2 className="text-3xl font-bold text-white">Login</h2> */}
            </div>
          </div>
          <div className="flex max-h-[520px] px-20   mt-10 overflow-hidden">
            <div className="bg-white ml- max-w-md  w-full space-y-4 border p-6 rounded shadow-md">
              <div className="rounded-md">
                {/* Login tabs option start */}
                <ul
                  className="flex rounded-md border-2  list-none flex-wrap  flex-row text-black dark:text-dark-text-fill"
                  role="tablist"
                >
                  {["Login with account", "Login as Guest"].map((tab) => (
                    <li
                      key={tab}
                      className="-mb-px  last:mr-0 flex-auto text-center"
                    >
                      <a
                        className={`font-bold text-sm  px-3 md:px-5 py-3 shadow-sm  block leading-normal ${
                          openTab === `${tab}`
                            ? "bg-primary dark:bg-dark-bg text-white "
                            : " "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(`${tab}`);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                        data-testid="tab-link"
                      >
                        {t(tab)}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Login tabs option end */}
              </div>
              <div className="flex flex-col justify-center items-center ">
                <Tooltip
                  message="Parish Sacrament Management System"
                  style="w-[300px]"
                >
                  <div className="flex">
                    <h4 className="text-lg font-bold text-red-400 uppercase ">
                      PS
                    </h4>
                    <h4 className="text-lg font-bold  uppercase text-[#2720FF]">
                      MS
                    </h4>
                  </div>
                </Tooltip>
                <div className="mx-auto flex  items-center justify-center  shadow-sm">
                  <img src={logo} alt="" className="w-24" />
                </div>
              </div>
              <div
                className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2 ${
                  error ? "flex" : "hidden"
                }`}
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>

              <form className=" space-y-6 overflow-hidden" onSubmit={onSubmit}>
                {/* LOGIN WITH ACCOUNT */}
                <div
                  className={
                    openTab == "Login with account" ? "block" : "hidden"
                  }
                >
                  {loginFields.map((field) => (
                    <Input
                      key={field.id}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={
                        openTab == "Login with Account" && field.isRequired
                      }
                      placeholder={field.placeholder}
                      customClass="dark:bg-dark-bg"
                      defaultValue={
                        loginState[field.id as keyof typeof loginState]
                      }
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setLoginState({
                          ...loginState,
                          [e.target.id]: e.target.value,
                        });
                      }}
                    />
                  ))}
                </div>

                {/* LOGIN AS GUEST */}
                <div
                  className={openTab == "Login as Guest" ? "block" : "hidden"}
                >
                  {guestFields.map((field) => (
                    <Input
                      key={field.id}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={
                        openTab == "Login as Guest" && field.isRequired
                      }
                      placeholder={field.placeholder}
                      customClass="dark:bg-dark-bg"
                      defaultValue={
                        loginState[field.id as keyof typeof loginState]
                      }
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setLoginState({
                          ...loginState,
                          [e.target.id]: e.target.value,
                        });
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between ">
                  <div className="text-sm w-full flex justify-between">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-primary hover:primaryHover"
                    >
                      {t("Forgot your password?")}
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
                >
                  {t("Login")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
