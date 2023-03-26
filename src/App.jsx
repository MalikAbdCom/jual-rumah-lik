import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toastify
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateItem from "./pages/CreateItem";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="bg-slate-900 text-slate-100">
        <Header />
        <div className="bg-slate-800">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Offers" element={<Offers />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Profile" element={<PrivateRoute />}>
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route path="/CreateItem" element={<PrivateRoute />}>
              <Route path="/CreateItem" element={<CreateItem />} />
            </Route>
          </Routes>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-center"
        transition={Zoom}
        style={{ borderRadius: "12px" }}
        autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;
