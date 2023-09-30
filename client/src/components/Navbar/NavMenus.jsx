import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiDoorOpen, BiTask } from "react-icons/bi";

export default function NavMenus() {
  const menuClass =
    "h-10 px-8 md:px-2 w-screen md:w-fit flex justify-start items-center md:h-16 gap-1 hover:border-b-2 hover:border-b-purple-500 focus:border-b-2 focus:border-b-purple-500 font-medium text-sm text-gray-500 hover:text-purple-500 hover:bg-purple-100 focus:text-purple-500 focus:bg-purple-100 transition delay-50 duration-300 ease-in-out cursor-pointer";

  return (
    <>
      <Link to={"/dashboard"} className={menuClass}>
        <LuLayoutDashboard className="text-xl" />
        Dashboard
      </Link>
      <Link to={"/rooms"} className={menuClass}>
        <BiDoorOpen className="text-xl" />
        Rooms
      </Link>
      <Link to={"/tasks"} className={menuClass}>
        <BiTask className="text-xl" />
        Tasks
      </Link>
    </>
  );
}
