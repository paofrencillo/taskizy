import { useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { BsChevronDown, BsPersonCircle } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import TokenServices from "../../services/tokenServices";
import AuthServices from "../../services/AuthServices";

export default function NavProfile({ fullName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <BsChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem className="gap-2 rounded !cursor-auto w-full">
          <Typography
            as="span"
            variant="small"
            className="font-normal flex gap-1 items-center text-gray-800"
          >
            {fullName}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className="flex items-center gap-2 rounded w-full"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal flex gap-1 items-center w-full text-gray-600 hover:text-purple-500 transition-colors"
          >
            <BsPersonCircle />
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className="flex items-center gap-2 rounded w-full"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal flex gap-1 items-center w-full text-red-300 hover:text-red-500 transition-colors"
            onClick={handleLogout}
          >
            <RiShutDownLine />
            Logout
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
