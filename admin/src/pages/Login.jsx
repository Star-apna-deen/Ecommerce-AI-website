import React, { useContext, useState } from "react";
import logo from "../assets/vcartlogo.png";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { AdminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(AuthDataContext);
  let { adminData, getAdmin } = useContext(AdminDataContext);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      getAdmin();
      console.log(result.data);

      toast.success("AdminLogin Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.success("AdminLogin Failed");
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-30 gap-[10px] cursor-poiter">
        <img className="w-[40px]" src={logo} alt="" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>
      <div className="w-[100%] h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Ragistration Page</span>
        <span className="text-[16px] ">
          Welcome to OneCart, Apply to Admin Login
        </span>
      </div>
      <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] rounded-lg flex items-center justify-center shadow-lg backdrop:blur-2xl">
        <form
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
          onSubmit={AdminLogin}
        >
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
