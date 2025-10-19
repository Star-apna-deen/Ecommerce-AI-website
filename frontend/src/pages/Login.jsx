import React, { useContext, useState } from "react";
import Logo from "../assets/vcartlogo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";

import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(UserDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      //console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        {
          name,
          email,
        },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-30 gap-[10px] cursor-poiter"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>
      <div className="w-[100%] h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Ragistration Page</span>
        <span className="text-[16px] ">
          Welcome to OneCart, Place your order
        </span>
      </div>
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] rounded-lg flex items-center justify-center shadow-lg backdrop:blur-2xl">
        <form
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
          onSubmit={handleLogin}
        >
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
            onClick={googlelogin}
          >
            <img className="w-[20px] rounded-full" src={google} alt="" />
            Login account with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>
            <p className="flex gap-[10px]">
              You have't any account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
