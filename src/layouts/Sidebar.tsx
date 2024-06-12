import { useContext } from "react";
import {  useNavigate } from "react-router-dom";

import { FaChartPie } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";

import Logo from "../assets/logo.png";

import Tooltip from "../components/ToolTip";
import { UserContext } from "../hooks/useAuth";
import SideNavLink from "../components/SideNavLink";
import { FaPowerOff } from "react-icons/fa6";
import CheckRole from "../utils/checkRoles";

import { CogIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { BiCross, BiDonateHeart, BiFolderMinus } from "react-icons/bi";
import { useAppDispatch } from "../redux/hook";
import { logout as logoutAction } from "../redux/features/auth.feature";

function Sidebar({ style, toggle }: { style: string; toggle: () => void }) {
  const { t } = useTranslation();
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const signOut = () => {
    dispatch(logoutAction());
    logout();
    navigate('/login')
  };

 
  return (
    <div
      className={`${style} transition ease-in-out duration-100 flex-col shadow-sm fixed h-[100%] w-1/3 md:w-1/5
       bg-light-bg border-r overflow-y-scroll no-scrollbar z-20`}
    >
      <div className="hidden fixed z-10 pt-[v3h] lg:flex items-center ml-4  lg:w-full">
        <span className="flex flex-row lg:px-5">
          <img className="cursor-pointer w-28 mr-2" src={Logo} alt="logo" />
          <h1 className="text-lg mt-2 font-bold font-lexend text-primary dark:text-dark-text-fill"></h1>
        </span>
      </div>
      <div className="list-none mt-28 pl-4 ">
        <div className="text-base  italic py-3 font-semibold text-[#8094ae] flex ">
          <span className=""> {t("Overview")} </span>
        </div>
        <SideNavLink
          onClick={toggle}
          name="Overview"
          end={true}
          to="/dashboard"
        >
          <FaChartPie className="w-5 mt-1" />
        </SideNavLink>
        <div className="text-base  italic py-3 font-semibold text-[#8094ae] flex ">
          <span className=""> {t("Application")} </span>
        </div>
        <CheckRole roles={["CLERGY", "HIGH_PRIEST"]}>
          <SideNavLink
            onClick={toggle}
            name="Parishioners"
            to="/dashboard/members"
          >
            <HiUsers className="w-5 mt-1" />
          </SideNavLink>
          <SideNavLink
            onClick={toggle}
            name="Sacraments"
            to="/dashboard/sacraments"
          >
            <BiCross className="w-5 mt-1" />
          </SideNavLink>
        </CheckRole>

        {/* Shared Links */}

        <SideNavLink
          onClick={toggle}
          name="Applications"
          to="/dashboard/applications"
        >
          <BiFolderMinus className="w-5 mt-1" />
        </SideNavLink>
        <CheckRole roles={["CHRISTIAN"]}>
        <SideNavLink
          onClick={toggle}
          name="Offerings"
          to="/dashboard/offerings"
        >
          <BiDonateHeart className="w-5 mt-1" />
        </SideNavLink>
</CheckRole>
        <SideNavLink onClick={toggle} name="Settings" to="/dashboard/settings">
          <CogIcon className="w-5 mt-1 " />
        </SideNavLink>
      </div>
      <hr className="mt-auto  mb-0" />
      <div className="flex pt-4 flex-row ml-10  mb-10 list-none z-0">
        <li className="px-2" onClick={signOut}>
          <Tooltip message="Logout">
            <FaPowerOff className="w-5 text-red-700 dark:text-red-600 hover:text-red-900" />
          </Tooltip>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
