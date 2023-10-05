import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomServices from "../services/RoomServices";
import InviteMembers from "../components/Room/InviteMembers";
import RoomHeader from "../components/Room/RoomHeader";
import { GrFormClose } from "react-icons/gr";
import {
  Drawer,
  Button,
  IconButton,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { MembersDrawer } from "../components/Room/MembersDrawer";

export default function Room() {
  const params = useParams();
  const [roomData, setRoomData] = useState({});
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    // Fetch and set rooms when the component mounts
    const fetchRoomData = async () => {
      try {
        const response = await RoomServices.getRoomData(params);
        if (response.status === 200) {
          setRoomData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomData();
  }, [params]);

  return (
    <>
      {/* Members Drawer */}
      <Drawer
        open={open}
        placement="right"
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h6" color="blue-gray">
            Room Members
            <span className="text-purple-500 ml-6 rounded-full">
              {roomData?.room_members ? roomData.room_members.length : 0}
            </span>
          </Typography>
          <IconButton variant="text" color="purple" onClick={closeDrawer}>
            <GrFormClose className="h-5 w-5" />
          </IconButton>
        </div>
        <MembersDrawer
          roomMembers={roomData?.room_members}
          roomAdmin={roomData?.room_admin}
        />
      </Drawer>

      {/* Page Header */}
      <div className="px-10 py-4">
        <div>
          <Button onClick={openDrawer}>Open Drawer</Button>
          <RoomHeader roomName={roomData.room_name} />
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="h-16 flex flex-grow items-center justify-between gap-2 shadow-md rounded-lg py-2 px-6">
            <Typography variant="h6" className="text-gray-700">
              70% Tasks Completed
            </Typography>
            <div className="w-96 bg-purple-200 h-6 rounded-lg">
              <div className="w-[70%] bg-purple-500 h-6 rounded-lg"></div>
            </div>
          </div>
          <div className="h-16 items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6">
            <Typography variant="small" className="text-gray-500">
              20
            </Typography>
            <Typography variant="h6" className="text-gray-700">
              Total Task
            </Typography>
          </div>

          <div className="h-16 flex flex-grow items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6">
            <div className="flex items-center -space-x-5">
              <Avatar
                variant="circular"
                alt="user 1"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <Avatar
                variant="circular"
                alt="user 2"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              />
              <Avatar
                variant="circular"
                alt="user 3"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
              />
              <Avatar
                variant="circular"
                alt="user 4"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
              />
              <Avatar
                variant="circular"
                alt="user 5"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
              />
            </div>
            <div>
              <Typography variant="small" className="text-gray-500">
                15
              </Typography>
              <Typography variant="h6" className="text-gray-700">
                Members
              </Typography>
            </div>
          </div>

          <div className="h-16 flex flex-grow items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6">
            <div className="w-10 h-10 rounded-full border">
              <img
                src="/logo_temp.png"
                alt="admin-img"
                className="h-full w-full"
              />
            </div>

            {roomData.room_admin ? (
              <div className="text-gray-500">
                Admin: {roomData.room_admin.first_name}
              </div>
            ) : null}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
