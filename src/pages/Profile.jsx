import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";

import { toast } from "react-toastify";

import { db } from "../firebase.config";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });
  const [editChange, setEditChange] = useState(false);

  const { name, email } = inputValue;

  // get user info
  useEffect(() => {
    const getUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        setInputValue({
          name: user.displayName,
          email: user.email,
        });
      }
    };

    getUserInfo();
  }, []);

  const onSignOut = () => {
    auth.signOut();
    navigate("/SignIn");
  };

  function editChangeFunc(event) {
    setEditChange(!editChange);
  }

  function updateProfileName() {
    (async () => {
      updateProfile(auth.currentUser, name);

      // update progile data on firestore

      const user = auth.currentUser;

      const docRef = doc(db, "users", user.uid);

      await updateProfile(user, {
        displayName: name,
      });

      await updateDoc(
        docRef,
        {
          name: name,
        },
        { merge: true }
      )
        .then(() => {
          toast.success("Update success");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Update failed");
        });
    })();
  }

  return (
    <div className="max-w-6xl flex flex-col justify-center items-center mx-auto p-2 h-[calc(100vh-48px)]">
      <h1 className="text-center text-3xl font-bold p-6 mb-6">Profile</h1>
      <div className="w-full max-w-[500px]">
        <input
          type={"text"}
          className={`w-full p-2 mb-4 rounded text-slate-700 ${
            editChange && "bg-red-200 font-bold"
          }`}
          onChange={(e) =>
            setInputValue((prevState) => {
              return {
                ...prevState,
                [e.target.name]: e.target.value,
              };
            })
          }
          name={"name"}
          value={name}
          disabled={!editChange}
        />
        <input
          type={"email"}
          className={"w-full p-2 mb-4 rounded text-slate-700"}
          value={email}
          disabled={true}
          name={"email"}
        />

        <div className="whitespace-nowrap flex justify-between w-full mb-4 text-sm md:text-base">
          <p>
            Do want to change your name?
            <span
              className="text-red-400 ml-1 cursor-pointer"
              onClick={() => {
                editChange && updateProfileName();
                editChangeFunc();
              }}
            >
              {editChange ? "Apply change" : "Edit"}
            </span>
          </p>
          <p
            onClick={onSignOut}
            className="text-blue-500 font-bold cursor-pointer"
          >
            Sign Out
          </p>
        </div>

        <button
          type="button"
          className=" w-full bg-sky-500 text-medium font-medium rounded px-7 py-3 shadow shadow-blue-400 hover:bg-blue-500 active:bg-blue-600 transition ease-in-out duration-300"
        >
          <Link className="flex items-center justify-center" to={"/CreateItem"}>
            <FcHome className="mr-2 bg-white h-7 w-7 p-1 rounded-full" />
            Sell or Rent you Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
