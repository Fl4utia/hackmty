import React from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  return (
    <header id="header" className="fixed top-0 w-full bg-[#00303F] text-white flex items-center py-2 z-10">
      <div className="w-1/5 ml-4">
        <img id="header-img" className="w-1/2" src="https://imgur.com/IXMsbAn.png" alt="company-logo" />
      </div>
      <nav id="nav-bar" className="w-4/5">
        <ul className="flex justify-around text-gray-400">
          {isLoggedIn ? (
            <>
              <li><a className="nav-link" href="#events">Events</a></li>
              <li><a className="nav-link" href="#profile">Profile</a></li>
              <li><button className="nav-link" onClick={handleLogout}>Log out</button></li>
            </>
          ) : (
            <>
              <li><a className="nav-link" href="#overview">FinVents</a></li>
              <li><a className="nav-link" href="#story">Our Story</a></li>
              <li><a className="nav-link" href="#events">Events</a></li>
              <li><a className="nav-link" href="#contact">Get Started</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;