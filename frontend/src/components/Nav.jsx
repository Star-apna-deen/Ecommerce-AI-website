import React, { useContext } from "react";
import logo from "../assets/vcartlogo.png";
import { IoSearchSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import { HiOutlineCollection } from "react-icons/hi";
import { GrContactInfo } from "react-icons/gr";
import { ShopDataContext } from "../context/ShopContext";

const Nav = () => {
  let { getCurrentUser, userData } = useContext(UserDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(ShopDataContext);
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[20%] lg:w-[30%]  flex items-center justify-start gap-[10px]">
        <img src={logo} alt="" className="w-[30px]" />
        <h1 className="text-[25px] text-[black] font-sans">OneCart</h1>
      </div>
      <div className="w-[40%] hidden md:block">
        <ul className="flex items-center justify-center gap-[19px] text-white">
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/collection")}
          >
            COLLECTION
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <IoSearchSharp
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
            onClick={() => {
              setShowSearch(!showSearch);
              navigate("/collection");
            }}
          />
        )}
        {showSearch && (
          <IoSearchCircle
            className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
        )}

        {!userData && (
          <FaCircleUser
            className="w-[30px] h-[30px] text-[#000000] cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />
        )}
        {userData && (
          <div
            className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <MdOutlineShoppingCart
          className="w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block"
          onClick={() => navigate("/cart")}
        />
        <p className="absolute w-[18px] h-[18px] items-center md:flex justify-center bg-red-500 px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden ">
          {getCartCount()}
        </p>
      </div>
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="lg:w-[50%] w-[80%] h-[60%] bg-[#233533] text-white rounded-[30px] px-[50px] placeholder:text-white text-[18px]"
            placeholder="Search Here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      )}
      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-lg z-[10]">
          <ul className="w-[100%] h-[100%] flex flex-col text-[17px] py-[10px] text-white items-start justify-around ">
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                LogOut
              </li>
            )}
            <li
              className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >
              Orders
            </li>
            <li
              className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </li>
          </ul>
        </div>
      )}
      {/* phone resposive */}
      <div className="w-[100vw] h-[90px] flex items-center  justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px]">
        <button
          className="text-white flex items-center justify-center flex-col gap-2 "
          onClick={() => navigate("/")}
        >
          <IoMdHome className="w-[28px] h-[28px] text-white md:hidden" />
          Home
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2 "
          onClick={() => navigate("/collection")}
        >
          <HiOutlineCollection className="w-[28px] h-[28px] text-white md:hidden" />
          Collections
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2 "
          onClick={() => navigate("/contact")}
        >
          <GrContactInfo className="w-[28px] h-[28px] text-white md:hidden" />
          Contact
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2 "
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart className="w-[28px] h-[28px] text-white md:hidden" />
          Cart
          <p className="absolute w-[18px] h-[18px] flex items-center justify-center  bg-red-500 px-[5px] py-[2px] text-white font-semibold rounded-full text-[9px] top-[5px] rigth-[8px]">
            {getCartCount()}
          </p>
        </button>
      </div>
    </div>
  );
};

export default Nav;
