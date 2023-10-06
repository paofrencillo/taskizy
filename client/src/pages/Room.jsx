import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomServices from "../services/RoomServices";
import RoomHeader from "../components/Room/RoomHeader";
import { MembersCard } from "../components/Room/MembersCard";
import TaskContainer from "../components/Room/Tasks/TaskContainer";

export default function Room() {
  const params = useParams();
  const [roomData, setRoomData] = useState({});

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
      <div className="bg-gray-800">
        <RoomHeader roomName={roomData.room_name} />
      </div>

      <div className="px-10 py-4">
        {/*  */}
        {/* Page Header */}
        {/*  */}

        {/*  */}
        {/* Page Body */}
        {/*  */}
        <div className="flex justify-between gap-4">
          <TaskContainer />
          <MembersCard
            roomMembers={roomData?.room_members}
            roomAdmin={roomData?.room_admin}
          />
        </div>
      </div>
    </>
  );
}
