import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import SubmenuLink from "./SubmenuLink"; // Update the path to SubmenuLink.tsx
import CheckRole from "../utils/checkRoles";
import { useTranslation } from "react-i18next";

interface SideNavLinkProps {
  to: string;
  name: string;
  onClick: () => void;
  end?: boolean;
  submenu?: { to: string; name: string }[];
  children: React.ReactNode;
  roles?: any;
}

const SideNavLink: React.FC<SideNavLinkProps> = ({
  to,
  name,
  onClick,
  submenu,
  children,
  roles,
  end,
  ...props
}) => {
  const {t} =useTranslation()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <li
      className={`text-lg font-base  hover:text-primary text-center transition-all group-hover:transition-all mb-2 first-letter:`}
      {...props}
    >
      <NavLink
        onClick={submenu ? toggleSubMenu : onClick}
        to={to}
        end={end}
        className={(navData) => {
          if (navData.isActive) {
            return "py-3 px-2 font-bold rounded-bl-lg text-center  flex flex-row  bg-gray-200 text-primary border-r-4 border-r-primary";
          }
          return `py-3 px-2 flex font-bold flex-row  rounded-bl-lg  text-[#526484] hover:bg-gray-200 hover:text-primary transition-all ease-in-out duration-400 ${
            navData.isActive ? "navActive" : ""
          }`;
        }}
      >
        {children}
        <span className="font-base ml-2">{t(name)}</span>
        {submenu && (
          <CheckRole roles={roles}>
            <span className="ml-auto">
              {isSubMenuOpen ? (
                <FaAngleDown className="w-5 mt-1 mr-2  text-light-text" />
              ) : (
                <FaAngleRight className="w-5 mt-1 mr-2  text-light-text" />
              )}
            </span>
          </CheckRole>
        )}
      </NavLink>
      <ul
        className={`${
          isSubMenuOpen && submenu ? "max-h-full" : "max-h-0 overflow-hidden"
        }
          flex flex-col bg-gray-50 justify-center ml-3 border-l-[5px] rounded-bl-lg text-gray-700 `}
      >
        {submenu &&
          submenu.map((submenuItem, idx) => (
            <CheckRole roles={roles} key={idx}>
              <SubmenuLink
                key={submenuItem.to}
                to={submenuItem.to}
                name={submenuItem.name}
              />
            </CheckRole>
          ))}
      </ul>
    </li>
  );
};

export default SideNavLink;
