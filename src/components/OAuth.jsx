import React from "react";

import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button className="flex items-center w-full justify-center bg-red-600 text-sm py-3 rounded font-semibold transition ease-in-out duration-200 hover:bg-red-700 active:bg-red-800">
      <FcGoogle className="bg-white rounded-full mr-2" />
      <p>Continue with Google</p>
    </button>
  );
};

export default OAuth;
