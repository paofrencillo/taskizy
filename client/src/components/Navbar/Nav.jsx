import { Navbar, Typography } from "@material-tailwind/react";

import NavList from "./NavList";
import NavProfile from "./NavProfile";

export function Nav({ userFullName, userImg }) {
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
          className="flex items-center gap-2 cursor-pointer text-purple-700 w-20"
        >
          <img src="/taskizy_logo.png" alt="logo" className="w-8" />
          Taskizy
        </Typography>
        <div>
          <NavList />
        </div>

        <div className="w-20">
          <NavProfile fullName={userFullName} userImg={userImg} />
        </div>
      </div>
    </Navbar>
  );
}
