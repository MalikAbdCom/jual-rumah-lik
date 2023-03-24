import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="max-w-6xl mx-auto min-h-[calc(100vh-48px)]">
      <h1 className="py-12 font-bold text-3xl text-center">Forgot Password</h1>
      <div className="flex flex-wrap items-center h-full w-full justify-center">
        <div className="w-[80%] mx-auto md:w-1/2">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
            alt="key"
            className="rounded-lg mb-8 md:mb-0 h-[220px] md:h-full mx-auto object-cover"
          />
        </div>
        <div className="w-[80%] mx-auto md:w-[40%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mb-12 md:mb-0"
          >
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="YourEmail@email.com"
              className="text-slate-700 rounded w-full transition ease-in-out duration-300 text-md "
              value={inputValue.email}
            />

            <div className="flex flex-col md:flex-row justify-between">
              <div className="text-sm flex items-center mb-2">
                <p className="text-sm">Don't have an account?</p>
                <Link to="/SignUp" className="text-blue-300 ml-2">
                  Sign Up
                </Link>
              </div>
              {/* forgot password? */}
              <Link to="/SignIn" className="text-blue-300 text-xs">
                Sign In
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 font-semibold text-md hover:bg-blue-600 transition ease-in-out duration-300 active:bg-blue-700 shadow-gray-700 shadow hover:shadow-md hover:shadow-gray-600"
            >
              Send me Reset Link
            </button>

            <div className="flex items-center before:border-t before:flex-1 after:border-t after:flex-1">
              <p className="text-gray-300 mx-2">OR</p>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
