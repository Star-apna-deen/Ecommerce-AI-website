import React from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Lists from "./pages/lists";
import Order from "./pages/Order";
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminDataContext } from "./context/AdminContext";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  let { adminData } = useContext(AdminDataContext);
  return (
    <>
      <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
