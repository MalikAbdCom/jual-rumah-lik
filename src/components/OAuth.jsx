import React from "react";

import { FcGoogle } from "react-icons/fc";

// firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

const OAuth = () => {
  // firebase auth
  const firebaseSignIn = async () => {
    try {
      const auth = getAuth();
      auth.languageCode = "id";

      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const { user } = result;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log(user);
          console.log(credential);

          toast.success("Sign in with Google success");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...

          toast.error("Can't sign ini with Google");
        });
    } catch (error) {
      toast.error("Can't sign ini with Google");
    }
  };

  return (
    <button
      type="button"
      onClick={firebaseSignIn}
      className="flex items-center w-full justify-center bg-red-600 text-sm py-3 rounded font-semibold transition ease-in-out duration-200 hover:bg-red-700 active:bg-red-800"
    >
      <FcGoogle className="bg-white rounded-full mr-2" />
      <p>Continue with Google</p>
    </button>
  );
};

export default OAuth;
