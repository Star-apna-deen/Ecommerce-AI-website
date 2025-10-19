import React, { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";

export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  let { serverUrl } = useContext(AuthDataContext);
  let [userData, setUserData] = useState("");

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
