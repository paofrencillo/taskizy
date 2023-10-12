import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiDoorOpen, BiTask } from "react-icons/bi";

export default function NavList() {
  return (
    <ul className="my-2 bg-white flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        className="p-1 font-medium text-gray-600"
      >
        <Link
          to={"/dashboard"}
          className="flex items-center gap-1 hover:text-purple-500 transition-colors"
        >
          <LuLayoutDashboard />
          Dashboard
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        className="p-1 font-medium text-gray-600"
      >
        <Link
          to={"/rooms"}
          className="flex items-center gap-1 hover:text-purple-500 transition-colors"
        >
          <BiDoorOpen />
          Rooms
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h6"
        className="p-1 font-medium text-gray-600"
      >
        <Link
          to={"/tasks"}
          className="flex items-center gap-1 hover:text-purple-500 transition-colors"
        >
          <BiTask />
          Tasks
        </Link>
      </Typography>
    </ul>
  );
}
