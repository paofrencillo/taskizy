import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  IconButton,
  Avatar,
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { HiLogout } from "react-icons/hi";
import InviteMembers from "./InviteMembers";
import RoomServices from "../../services/RoomServices";

export function MembersCard({ roomMembers, roomAdmin, user }) {
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [memberID, setMemberID] = useState(0);
  const handleOpenInviteDialog = () => setOpenInviteDialog(!openInviteDialog);
  const handleOpenKickDialog = () => setOpenKickDialog(!openKickDialog);
  const params = useParams();

  const getMemberIDToKick = (e) => {
    const getMemberID = e.currentTarget.getAttribute("data-member-id");
    setMemberID(parseInt(getMemberID));
    setOpenKickDialog(true);
  };

  const handleSendKickMember = async () => {
    try {
      const response = await RoomServices.kickRoomMember(
        params.room_id,
        memberID
      );
      if (response.status === 204) {
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/*  */}
      {/* Kick Member */}
      {/*  */}
      <Dialog size="xs" open={openKickDialog} handler={setOpenKickDialog}>
        <DialogHeader className="flex justify-between text-lg">
          Kick Member
          <span
            className="float-right text-2xl cursor-pointer"
            onClick={handleOpenKickDialog}
          >
            <GrFormClose />
          </span>
        </DialogHeader>
        <DialogBody divider>
          Do you want to kick&nbsp;
          <span className="font-semibold">
            {roomMembers.map((member) => {
              if (member.id === memberID) {
                return `${member.first_name} ${member.last_name}`;
              }
            })}{" "}
          </span>
          ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenKickDialog}
            className="mr-1 active:border-0"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSendKickMember}
          >
            <span>Yes, Kick</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*  */}
      {/* Invite Members */}
      {/*  */}
      <Dialog open={openInviteDialog} handler={setOpenInviteDialog}>
        <DialogHeader className="flex justify-between text-lg">
          Add Room Members
          <span
            className="float-right text-2xl cursor-pointer"
            onClick={handleOpenInviteDialog}
          >
            <GrFormClose />
          </span>
        </DialogHeader>
        <DialogBody divider>
          <InviteMembers />
        </DialogBody>
      </Dialog>

      {/*  */}
      {/* Members Drawer Contents */}
      {/*  */}
      <Card className="shadow-lg h-fit">
        <CardBody>
          <div className="flex justify-between items-center mb-8">
            <Typography variant="small" color="blue" className="font-normal">
              <IconButton
                size="sm"
                className="bg-blue-300 shadow-sm mr-3 shadow-blue-200 rounded-full hover:bg-blue-500 transition delay-75 duration-200 ease-in-out focus:outline-0 active:outline-0"
                onClick={handleOpenInviteDialog}
              >
                <MdPersonAddAlt1 />
              </IconButton>
              Members
              <span className="ml-2">{roomMembers.length}</span>
            </Typography>
            <Typography className="font-extralight text-xs text-red-300 hover:text-red-900 cursor-pointer">
              Leave Room
            </Typography>
          </div>

          <div className="flex flex-col justify-between max-h-[70vh] overflow-y-auto gap-4 pr-6">
            {roomMembers ? (
              roomMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex justify-start items-center gap-2">
                    <Avatar src="/logo_temp.png" alt="member-img" size="sm" />

                    <Typography
                      variant="small"
                      color="gray"
                      className=" hover:text-gray-900 text-ellipsis"
                    >
                      {member.first_name} {member.last_name}{" "}
                      {member.first_name === user.first_name ? "(Me)" : null}
                    </Typography>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    {member.id === roomAdmin.id ? (
                      <RiUserStarLine
                        className="text-yellow-800 text-lg"
                        title="Room Admin"
                      />
                    ) : (
                      <HiLogout
                        data-member-id={member.id}
                        className="text-red-300 hover:text-red-900 text-lg cursor-pointer"
                        title="Kick"
                        onClick={getMemberIDToKick}
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
        </CardBody>
      </Card>
    </>
  );
}
