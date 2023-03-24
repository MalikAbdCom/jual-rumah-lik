import React from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

// firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const OAuth = () => {
  const navigate = useNavigate();

  // firebase auth
  const googleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // create a snapshot to verify if user exist
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      type="button"
      onClick={googleSignIn}
      className="flex items-center w-full justify-center bg-red-600 text-sm py-3 rounded font-semibold transition ease-in-out duration-200 hover:bg-red-700 active:bg-red-800"
    >
      <FcGoogle className="bg-white rounded-full mr-2" />
      <p>Continue with Google</p>
    </button>
  );
};

export default OAuth;
