import { useState } from "react";
import { Link } from "react-router-dom";
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
import JWTTokenServices from "../../services/JWTTokenServices";
import AuthServices from "../../services/AuthServices";
import { freeUserImgURL } from "../../config/userImgs";
import { SERVER_URL } from "../../config/apiUrls";

export default function NavProfile({ fullName, userImg }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  async function handleLogout() {
    try {
      const response = await AuthServices.logout();
      if (response.status === 205) {
        JWTTokenServices.destroyToken();
        window.location = "/";
      } else if (response.status === 401) {
        console.error("401 Forbidden");
      }
    } catch (error) {
      window.location = "/500";
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
            alt="user-image"
            className="border border-gray-900 p-0.5"
            src={
              userImg === null || userImg === ""
                ? freeUserImgURL
                : `${SERVER_URL}${userImg}`
            }
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
        <Link to={"/me"}>
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
        </Link>
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
