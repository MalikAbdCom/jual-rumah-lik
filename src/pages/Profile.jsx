import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });
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

  return (
    <div className="max-w-6xl flex flex-col justify-center items-center mx-auto p-2">
      <h1 className="text-center text-3xl font-bold p-6 mb-6">Profile</h1>
      <div className="max-w-[768px]">
        <input
          type={"text"}
          className={"w-full p-2 mb-4 rounded text-slate-700"}
          value={name}
          disabled={true}
        />
        <input
          type={"email"}
          className={"w-full p-2 mb-4 rounded text-slate-700"}
          value={email}
          disabled={true}
        />

        <div className="whitespace-nowrap flex justify-between w-full mb-4 text-sm md:text-base">
          <p>
            Do want to change your name?{" "}
            <span className="text-red-400 ml-1 cursor-pointer">Edit</span>
          </p>
          <p
            onClick={onSignOut}
            className="text-blue-500 font-bold cursor-pointer"
          >
            Sign Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
