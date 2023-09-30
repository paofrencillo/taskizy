import {
  // AiOutlinePlusCircle,
  // AiOutlineSearch,
  AiOutlineLogout,
} from "react-icons/ai";

import { RiMenu5Fill } from "react-icons/ri";

import TokenServices from "../../services/tokenServices";
import AuthServices from "../../services/AuthServices";
import { useState } from "react";
import NavMenus from "./NavMenus";

export default function Navbar(props) {
  const [showMenus, setShowMenus] = useState(false);

  window.onresize = () => {
    if (document.body.clientWidth >= 768) {
      setShowMenus(false);
    } else if (document.body.clientWidth < 768) {
      setShowMenus(true);
    }
  };

  async function handleLogout() {
    try {
      const response = await AuthServices.logout();
      if (response.status === 205) {
        TokenServices.destroyToken();
        return (window.location = "/");
      } else if (response.status === 401) {
        console.error("401 Forbidden");
      }
    } catch (error) {
      return (window.location = "/500");
    }
  }

  return (
    <>
      <nav className="sticky flex items-center justify-between z-30 h-16 w-full shadow-sm px-8">
        {/* Navbar Brand */}
        <div className="max-w-[200px] h-full flex items-center justify-center">
          <h1 className="font-black text-2xl text-purple-700 w-fit">
            taskizy.
          </h1>
        </div>

        <RiMenu5Fill
          className="block md:hidden text-2xl text-purple-500 focus:text-purple-700 hover:text-purple-700 delay-100 duration-150 ease-in-out cursor-pointer"
          onClick={() => {
            setShowMenus(!showMenus);
          }}
        />

        {document.body.clientWidth < 768 && (
          <div
            className={`${
              showMenus
                ? "hidden"
                : "fixed top-16 left-0 flex flex-col justify-start items-start gap-6 mt-1 shadow-sm bg-white"
            } `}
          >
            <NavMenus />
          </div>
        )}

        <div className="hidden md:flex flex-row justify-center items-center gap-4 bg-white">
          <NavMenus />
        </div>

        <div className="flex justify-between items-center gap-4 max-w-[200px]">
          <div className="flex justify-start items-center gap-1 cursor-pointer group">
            <div className="w-[40px] h-[40px] rounded-full border group-hover:border-purple-400">
              <img
                src="/logo_temp.png"
                alt="user"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="hidden md:inline-block max-w-[120px] text-sm text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden mr-2 group-hover:text-purple-400">
              {props.name}
            </p>
          </div>
          <AiOutlineLogout
            className="text-2xl text-gray-400 hover:text-purple-400 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </nav>
    </>
  );
}
