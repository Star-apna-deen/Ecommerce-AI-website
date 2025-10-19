import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import axios from "axios";
import { useEffect } from "react";
import { AuthDataContext } from "./AuthContext";

export const AdminDataContext = createContext();
function AdminContext({ children }) {
  let [adminData, setAdminData] = useState(null);
  let { serverUrl } = useContext(AuthDataContext);

  const getAdmin = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log(result.data);
    } catch (error) {
      setAdminData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  let value = {
    getAdmin,
    adminData,
    setAdminData,
  };
  return (
    <div>
      <AdminDataContext.Provider value={value}>
        {children}
      </AdminDataContext.Provider>
    </div>
  );
}

export default AdminContext;
