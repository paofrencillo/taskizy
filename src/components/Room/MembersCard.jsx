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
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import InviteMembers from "./InviteMembers";
import RoomServices from "../../services/RoomServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { freeUserImgURL } from "../../config/userImgs";
import { SERVER_URL } from "../../config/apiUrls";

export function MembersCard({ roomMembers, roomAdmin, user }) {
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openKickDialog, setOpenKickDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [memberID, setMemberID] = useState(0);
  const handleOpenInviteDialog = () => setOpenInviteDialog(!openInviteDialog);
  const handleOpenKickDialog = () => setOpenKickDialog(!openKickDialog);
  const handleOpenAdminDialog = () => setOpenAdminDialog(!openAdminDialog);
  const handleOpenLeaveDialog = () => setOpenLeaveDialog(!openLeaveDialog);
  const params = useParams();

  // Gets the member id after clicking of kick option
  const getMemberIDToKick = (e) => {
    const getMemberID = e.currentTarget.getAttribute("data-member-id");
    setMemberID(parseInt(getMemberID));
    setOpenKickDialog(true);
  };

  // Gets the member id after clicking of assign as admin option
  const getMemberIDToAdmin = (e) => {
    const getMemberID = e.currentTarget.getAttribute("data-member-id");
    setMemberID(parseInt(getMemberID));
    setOpenAdminDialog(true);
  };

  // Handles the sending of member to be kicked
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

  // Handles the sending of member to assign as admin
  const handleSendAdminMember = async () => {
    try {
      const response = await RoomServices.assignAdminRoomMember(
        params.room_id,
        params.room_slug,
        memberID
      );
      if (response.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handles the logic for leaving of room member
  const handleLeaveMember = () => {
    if (roomAdmin.id === user.userID) {
      toast.warn("Room ADMIN can't leave this room.");
    } else if (roomAdmin.id !== user.userID) {
      setOpenLeaveDialog(true);
    } else {
      console.error("Something is wrong. Try Again or refresh the page.");
      toast.error("Something is wrong. Try Again or refresh the page.");
    }
  };

  // Handles the logic for leaving of room member
  const handleSendLeaveMember = async () => {
    try {
      const response = await RoomServices.kickRoomMember(
        params.room_id,
        user.userID
      );
      if (response.status === 204) {
        window.location.replace("/rooms");
      }
    } catch (err) {
      console.error("Internal Server Error. Logout and try to login again.");
      toast.error("Internal Server Error. Logout and try to login again.");
    } finally {
      setOpenLeaveDialog(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
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
            })}
            &nbsp;
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
      {/* Assign as admin dialog */}
      {/*  */}
      <Dialog size="xs" open={openAdminDialog} handler={setOpenAdminDialog}>
        <DialogHeader className="flex justify-between text-lg">
          Assign as Room Admin
          <span
            className="float-right text-2xl cursor-pointer"
            onClick={handleOpenAdminDialog}
          >
            <GrFormClose />
          </span>
        </DialogHeader>
        <DialogBody divider>
          Are you sure you want make&nbsp;
          <span className="font-semibold">
            {roomMembers.map((member) => {
              if (member.id === memberID) {
                return `${member.first_name} ${member.last_name}`;
              }
            })}{" "}
          </span>
          as ADMIN of this room?
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
            onClick={handleSendAdminMember}
          >
            <span>Yes, Proceed</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*  */}
      {/* Leave member dialog */}
      {/*  */}
      <Dialog size="xs" open={openLeaveDialog} handler={setOpenLeaveDialog}>
        <DialogHeader className="flex justify-between text-lg">
          Leave Room
          <span
            className="float-right text-2xl cursor-pointer"
            onClick={handleOpenLeaveDialog}
          >
            <GrFormClose />
          </span>
        </DialogHeader>
        <DialogBody divider>
          Are you sure you want{" "}
          <span className="font-semibold text-red-500">leave</span>&nbsp;this
          room? Any progress that you made will be deleted.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenLeaveDialog}
            className="mr-1 active:border-0"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSendLeaveMember}
          >
            <span>Yes, I want to leave</span>
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
            <Typography
              className="font-extralight text-xs text-red-300 hover:text-red-900 cursor-pointer"
              onClick={handleLeaveMember}
            >
              Leave Room
            </Typography>
          </div>

          <div className="flex flex-col justify-between max-h-[70vh] overflow-y-auto gap-4 pr-2">
            {roomMembers ? (
              roomMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex justify-start items-center gap-2">
                    {member.user_image === null || member.user_image === "" ? (
                      <Avatar src={freeUserImgURL} alt="member-img" size="sm" />
                    ) : (
                      <Avatar
                        src={`${SERVER_URL}${member.user_image}`}
                        alt="member-img"
                        size="sm"
                      />
                    )}

                    <Typography
                      variant="small"
                      color="gray"
                      className=" hover:text-gray-900 text-ellipsis"
                    >
                      {member.first_name} {member.last_name}{" "}
                      {member.first_name === user.first_name ? "(Me)" : null}
                      <br />
                      <small>{member.role}</small>
                    </Typography>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    {member.id === roomAdmin.id && (
                      <RiUserStarLine
                        className="text-yellow-800 text-lg mx-1.5"
                        title="Room Admin"
                      />
                    )}

                    {member.id !== roomAdmin.id &&
                      member.id !== user.userID &&
                      roomAdmin.id === user.userID && (
                        <Menu placement="bottom-end">
                          <MenuHandler>
                            <IconButton
                              variant="text"
                              size="sm"
                              className="p-0 m-0"
                            >
                              <BsThreeDotsVertical />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem
                              data-member-id={member.id}
                              className="flex items-center text-red-300 hover:!text-red-900 hover:!bg-red-100 text-sm cursor-pointer"
                              onClick={getMemberIDToKick}
                            >
                              Kick
                            </MenuItem>
                            <MenuItem
                              data-member-id={member.id}
                              className="flex items-center text-yellow-700 hover:!text-yellow-900 hover:!bg-yellow-100 text-sm cursor-pointer"
                              onClick={getMemberIDToAdmin}
                            >
                              Assign as Admin
                            </MenuItem>
                          </MenuList>
                        </Menu>
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
