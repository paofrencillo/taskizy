import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { BiDoorOpen, BiTask } from "react-icons/bi";

export default function NavList() {
  return (
    <ul className="bg-white flex justify-center gap-2 items-center lg:gap-6">
      <Typography
        as="li"
        variant="h6"
        className="p-1 font-medium text-gray-600"
      >
        <Link
          to={"/rooms"}
          className="flex items-center gap-1 hover:text-purple-500 transition-colors"
        >
          <BiDoorOpen className="text-xl" />
          <span className="hidden md:inline-block">Rooms</span>
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
          <BiTask className="text-xl" />
          <span className="hidden md:inline-block">Tasks</span>
        </Link>
      </Typography>
    </ul>
  );
}
