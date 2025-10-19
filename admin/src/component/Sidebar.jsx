import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function SIdebar() {
  let navigate = useNavigate();
  const items = [
    {
      name: "List Items",
      icon: <FaRegListAlt className="w-[20px] h-[20px]" />,
      path: "/lists",
    },
    {
      name: "Add Items",
      icon: <IoMdAddCircle className="w-[20px] h-[20px]" />,
      path: "/add",
    },
    {
      name: "View Orders",
      icon: <SiTicktick className="w-[20px] h-[20px]" />,
      path: "/orders",
    },
  ];

  return (
    <div className="w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0">
      <div className="flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-center md:justify-start gap-3 border border--gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
          >
            {item.icon}
            <p className="hidden md:block whitespace-nowrap">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SIdebar;
