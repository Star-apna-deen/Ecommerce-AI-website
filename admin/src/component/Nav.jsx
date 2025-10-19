import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vcartlogo.png";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { AdminDataContext } from "../context/AdminContext";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  let { getAdmin } = useContext(AdminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md overflow-x-hidden shadow-black">
      <div
        className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} atl="" className="w-[30px]" />
        <h1 className="text-2xl text-black font-sans">OneCart</h1>
      </div>
      <button
        className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-1 px-4 rounded-2xl text-white"
        onClick={logOut}
      >
        LogOut
      </button>
    </div>
  );
}

export default Nav;
