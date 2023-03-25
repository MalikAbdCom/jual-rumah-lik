import { Navigate, Outlet } from "react-router-dom";

import { useUserHasLogIn } from "../hooks/useUserHasLogIn";

const PrivateRoute = () => {
  const { userHasLogin, status } = useUserHasLogIn();

  if (status) {
    return <div>Loading...</div>;
  }

  return userHasLogin ? <Outlet /> : <Navigate to="/SignIn" />;
};

export default PrivateRoute;
