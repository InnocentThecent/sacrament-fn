import React from "react";
import { NavLink } from "react-router-dom";

interface SubmenuLinkProps {
  to: string;
  name: string;
}

const SubmenuLink: React.FC<SubmenuLinkProps> = ({ to, name }) => {
  return (
    <li className="hover:text-primary transition-all ">
      <NavLink
        to={to}
        className={(navData) => {
          if (navData.isActive) {
            return "py-[4px] px-4 flex flex-row  text-primary  ";
          }
          return `flex  px-4 flex-row py-[4px] text-[#526484]`;
        }}
      >
        <span className="ml-1">{name}</span>
      </NavLink>
    </li>
  );
};

export default SubmenuLink;
