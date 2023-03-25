import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUserHasLogIn = () => {
  const [userHasLogin, setUserHasLogin] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserHasLogin(true);
      }
      setStatus(false);
    });
  }, []);
  return { userHasLogin, status };
};

export { useUserHasLogIn };
