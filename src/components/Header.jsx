import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // function to verify if the current page is selected
  const isCurrentPage = (path) => {
    if (location.pathname === path) {
      return true;
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Offers", path: "/Offers" },
    { name: "Sign In", path: "/SignIn" },
  ];

  return (
    <div className="border-b border-b-slate-700 shadow-sm">
      <header className="flex justify-between items-center max-w-6xl mx-auto px-3">
        <div>
          <img
            src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/e5b8438b.svg"
            alt="logo"
            className="cursor-pointer h-5"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-5">
            {navItems.map((navItem) => (
              <li
                key={navItem.name}
                className={`cursor-pointer py-3 border-b-[3px] text-sm font-bold ${
                  isCurrentPage(navItem.path)
                    ? "text-slate-200 border-b-red-500"
                    : "border-b-transparent text-slate-500"
                }`}
                onClick={() => navigate(navItem.path)}
              >
                {navItem.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
