import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list", {
        withCredentials: true,
      });
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id},
        {},
        { witCredentials: true }`
      );
      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative">
      <Nav />
      <Sidebar />
      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <div className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]">
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white mt-15">
            All Listed Products
          </div>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[90%] md:h-[120%] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]"
                key={index}
              >
                <img
                  src={item.image1}
                  alt=""
                  className="w-[30%] md:w-[120px] h-[90%] rounded-lg"
                />
                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]">
                  <div className="w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]">
                    {item.name}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    {item.category}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    ₹ {item.price}
                  </div>
                </div>
                <div className="w-[10%] h-[100%] bg-transparent flex items-center justify-center">
                  <span
                    className="w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300"
                    onClick={() => removeList(item._id)}
                  >
                    x
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg"> No products Available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lists;
