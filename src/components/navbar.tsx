import { useUser, SignOutButton } from "@clerk/clerk-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header
      id="header"
      className="fixed top-0 w-full bg-[#00303F] text-white flex items-center py-2 z-10"
    >
      <div className="w-1/5 ml-4">
        <img
          id="header-img"
          className="w-1/2 cursor-pointer"
          src="https://imgur.com/IXMsbAn.png"
          alt="company-logo"
          onClick={() => navigate("/")}
        />
      </div>
      <nav id="nav-bar" className="w-4/5">
        <ul className="flex justify-around text-gray-400">
          <li>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
