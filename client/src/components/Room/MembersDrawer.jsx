import { Typography, IconButton, Avatar } from "@material-tailwind/react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { HiLogout } from "react-icons/hi";

export function MembersDrawer({ roomMembers, roomAdmin }) {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Typography variant="small" color="blue" className="font-normal">
          <IconButton
            size="sm"
            className="bg-blue-300 shadow-sm mr-3 shadow-blue-200 rounded-full hover:bg-blue-500 transition delay-75 duration-200 ease-in-out focus:outline-0 active:outline-0"
          >
            <MdPersonAddAlt1 />
          </IconButton>
          Add Members
        </Typography>
        <Typography className="font-extralight text-xs text-red-300 hover:text-red-900 cursor-pointer">
          Leave Room
        </Typography>
      </div>

      <div className="flex flex-col justify-between max-h-[70vh] overflow-y-scroll  gap-4 pr-6">
        {roomMembers ? (
          roomMembers.map((member) => (
            <div key={member.id} className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-2">
                <Avatar src="/logo_temp.png" alt="member-img" size="sm" />

                <Typography
                  variant="small"
                  color="gray"
                  className=" hover:text-gray-900 text-ellipsis"
                >
                  {member.first_name} {member.last_name}
                </Typography>
              </div>
              <div className="flex justify-end items-center gap-2">
                {member.id === roomAdmin.id ? (
                  <RiUserStarLine
                    className="text-yellow-800 text-lg cursor-pointer"
                    title="Room Admin"
                  />
                ) : (
                  <HiLogout
                    className="text-red-300 hover:text-red-900 text-lg cursor-pointer"
                    title="Kick"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <Typography variant="small" color="gray">
            Loading...
          </Typography>
        )}
      </div>
    </>
  );
}
