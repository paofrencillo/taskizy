// import { useState, useEffect } from "react";
import {
  Navbar,
  // Collapse,
  Typography,
  // IconButton,
} from "@material-tailwind/react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoCloseSharp } from "react-icons/io5";
import NavList from "./NavList";
import NavProfile from "./NavProfile";

export function Nav({ userFullName }) {
  // const [isNavOpen, setIsNavOpen] = useState(false);

  // const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  // useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setIsNavOpen(false)
  //   );
  // }, []);

  return (
    <Navbar
      className="z-50 fixed mx-auto bg-white bg-opacity-100 h-16 px-6 py-3"
      fullWidth
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h5"
          className="cursor-pointer text-purple-700 w-20"
        >
          Taskizy.
        </Typography>
        <div>
          <NavList />
        </div>
        {/* <div className="hidden lg:block">
          <NavList />
        </div> */}
        {/* <IconButton
          variant="text"
          className="h-6 w-6 text-inherit text-purple-700 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={toggleIsNavOpen}
        >
          {isNavOpen ? (
            <IoCloseSharp className="h-6 w-6" strokeWidth={2} />
          ) : (
            <GiHamburgerMenu className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton> */}
        <div className="w-20">
          <NavProfile fullName={userFullName} />
        </div>
      </div>
      {/* <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse> */}
    </Navbar>
  );
}
