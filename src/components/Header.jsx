import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [headerLogStatus, setHeaderLogStatus] = useState("sign In");

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setHeaderLogStatus("Profile");
      } else {
        setHeaderLogStatus("Sign in");
      }
    });
  }, []);

  // function to verify if the current page is selected
  const isCurrentPage = (path) => {
    if (location.pathname === path) {
      return true;
    }
  };

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
            <li
              className={`cursor-pointer py-3 border-b-[3px] text-sm font-bold ${
                isCurrentPage("/")
                  ? "text-slate-200 border-b-red-500"
                  : "border-b-transparent text-slate-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 border-b-[3px] text-sm font-bold ${
                isCurrentPage("/Offers")
                  ? "text-slate-200 border-b-red-500"
                  : "border-b-transparent text-slate-500"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 border-b-[3px] text-sm font-bold ${
                isCurrentPage("/SignIn") || isCurrentPage("/Profile")
                  ? "text-slate-200 border-b-red-500"
                  : "border-b-transparent text-slate-500"
              }`}
              onClick={() => navigate("/Profile")}
            >
              {headerLogStatus}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
