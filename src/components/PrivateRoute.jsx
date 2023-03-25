import { Navigate, Outlet } from "react-router-dom";

import { useUserHasLogIn } from "../hooks/useUserHasLogIn";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { userHasLogin, status } = useUserHasLogIn();

  if (status) {
    return <Spinner />;
  }

  return userHasLogin ? <Outlet /> : <Navigate to="/SignIn" />;
};

export default PrivateRoute;
