import {
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineLogout,
} from "react-icons/ai";

import { LuLayoutDashboard } from "react-icons/lu";
import { BiDoorOpen, BiTask } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Navbar() {
  //   const checkPathName = () => {
  //     return window.location.pathname;
  //   };

  return (
    <>
      <nav className="sticky flex items-center justify-start z-30 pr-6 h-16 w-screen shadow-md">
        {/* Navbar Brand */}
        <div className="w-[75px] h-full mr-10">
          <img src="/logo_temp.png" alt="logo" className="w-full h-full" />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex justify-start items-center gap-6">
            <Link
              to={"/dashboard"}
              className="flex justify-start items-center h-16 gap-1 hover:border-b-2 hover:border-b-purple-500 font-medium text-sm text-gray-500 hover:text-purple-500 px-2 hover:bg-purple-100 cursor-pointer"
            >
              <LuLayoutDashboard className="text-xl" />
              Dashboard
            </Link>
            <Link
              to={"/rooms"}
              className="flex justify-start items-center h-16 gap-1 hover:border-b-2 hover:border-b-purple-500 font-medium text-sm text-gray-500 hover:text-purple-500 px-2 hover:bg-purple-100 cursor-pointer"
            >
              <BiDoorOpen className="text-xl" />
              Rooms
            </Link>
            <Link
              to={"/tasks"}
              className="flex justify-start items-center h-16 gap-1 hover:border-b-2 hover:border-b-purple-500 font-medium text-sm text-gray-500 hover:text-purple-500 px-2 hover:bg-purple-100 cursor-pointer"
            >
              <BiTask className="text-xl" />
              Tasks
            </Link>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="flex justify-start items-center gap-1 cursor-pointer group">
              <div className="w-[40px] h-[40px] rounded-full border group-hover:border-purple-400">
                <img
                  src="/logo_temp.png"
                  alt="user"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="max-w-[120px] text-sm text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden mr-2 group-hover:text-purple-400">
                Abdul Saaaaaaaaaaaaaaaaa
              </p>
            </div>
            <AiOutlineLogout className="text-2xl text-gray-400 hover:text-purple-400 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
}
