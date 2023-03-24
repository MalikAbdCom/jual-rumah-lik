import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";

// Toastify
import { toast } from "react-toastify";

import OAuth from "../components/OAuth";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = inputValue;
  const navigate = useNavigate();

  // handle change input
  const handleChange = (e) => {
    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  // handle show password
  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //get auth
      const auth = await getAuth();
      // create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // update profile
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const { user } = userCredential;

      // remove password from inputValue
      const inputValueCopy = { ...inputValue };
      delete inputValueCopy.password;

      // add timestamp to inputValueCopy
      inputValueCopy.timestamp = serverTimestamp();

      // add data from inputValueCopy to database firestore
      await setDoc(doc(db, "users", user.uid), inputValueCopy);

      // toast success
      toast.success("Sign Up Success");

      // navigate to home
      navigate("/");

      return user;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="max-w-6xl mx-auto min-h-[calc(100vh-48px)]">
      <h1 className="py-12 font-bold text-3xl text-center">Sign Up</h1>
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
              name="name"
              type="text"
              placeholder="e.g John Doe"
              className="text-slate-700 rounded w-full transition ease-in-out duration-300 text-md "
              value={name}
            />
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="YourEmail@email.com"
              className="text-slate-700 rounded w-full transition ease-in-out duration-300 text-md "
              value={email}
            />
            <div className="relative">
              <input
                onChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type Your Password"
                className="text-slate-700 rounded w-full transition ease-in-out duration-300 text-md "
                value={password}
              />
              <button
                onClick={handleShowPassword}
                type="button"
                className={
                  "font-semibold absolute right-4 top-[10px]" +
                  (showPassword ? " text-red-800" : " text-blue-500")
                }
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-xl" />
                ) : (
                  <AiFillEye className="text-xl" />
                )}
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <div className="text-sm flex items-center mb-2">
                <p className="text-sm">Already have an account?</p>
                <Link to="/SignIn" className="text-blue-300 ml-2">
                  Sign In
                </Link>
              </div>
              {/* forgot password? */}
              <Link to="/ForgotPassword" className="text-blue-300 text-xs">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 font-semibold text-md hover:bg-blue-600 transition ease-in-out duration-300 active:bg-blue-700 shadow-gray-700 shadow hover:shadow-md hover:shadow-gray-600"
            >
              Sign Up
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

export default SignUp;
