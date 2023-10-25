import { useState } from "react";
import {
  Typography,
  Progress,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import RoomServices from "../../services/RoomServices";
import { ToastContainer, toast } from "react-toastify";

export default function RoomHeader({
  roomID,
  roomSlug,
  roomName,
  roomAdmin,
  user,
  task_completed_perc,
}) {
  const [openDeleteRoomDialog, setOpenDeleteRoomDialog] = useState(false);

  const handleOpenDeleteRoomDialog = () =>
    setOpenDeleteRoomDialog(!openDeleteRoomDialog);

  const sendDeleteRoom = async () => {
    try {
      const response = await RoomServices.deleteRoom(roomID, roomSlug);

      if (response.status === 204) {
        window.location.replace("/rooms");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong. Try to refresh the page and try again."
      );
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Dialog open={openDeleteRoomDialog} handler={handleOpenDeleteRoomDialog}>
        <DialogHeader>Delete Room</DialogHeader>
        <DialogBody className="text-lg">
          This room: <span className="text-purple-500">{roomName}</span> will be{" "}
          <span className="text-red-500">deleted forever.</span> All tasks and
          details will also be <span className="text-red-500">deleted</span>.
          Continue?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteRoomDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={sendDeleteRoom}>
            <span>Yes, Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="flex-col-reverse md:flex-row flex justify-around items-center gap-4 p-4 md:p-8">
        <div>
          <Typography variant="h3" color="white">
            Welcome to {roomName}&apos;s Room
          </Typography>
          <Typography variant="small" className="text-gray-400">
            Hello,{" "}
            {roomAdmin
              ? roomAdmin.first_name + " " + roomAdmin.last_name
              : "User User"}
          </Typography>
          <div className="mt-4 flex flex-grow items-center justify-between bg-blue-gray-50 gap-2 shadow-lg rounded-lg py-2 px-4">
            <Typography variant="small" color="purple">
              {task_completed_perc}% Tasks Completed
            </Typography>
            <div className="w-44 md:w-72">
              <Progress
                value={task_completed_perc}
                size="lg"
                color="purple"
                className="bg-gray-300"
              />
            </div>
          </div>
          {roomAdmin.id === user.userID ? (
            <Button
              color="red"
              size="sm"
              className="mt-4"
              onClick={handleOpenDeleteRoomDialog}
            >
              Delete this Room
            </Button>
          ) : null}
        </div>
        <div>
          <img
            src="/undraw_completed_tasks_vs6q.svg"
            alt="room-img"
            className="w-56"
          />
        </div>
      </div>
    </>
  );
}
