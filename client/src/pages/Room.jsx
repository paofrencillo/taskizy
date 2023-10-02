import { useOutletContext, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import RoomServices from "../services/RoomServices";
import InviteMembers from "../components/Room/InviteMembers";

export default function Room() {
  const user = useOutletContext();
  const params = useParams();
  const [roomData, setRoomData] = useState({});
  const [roomMembers, setRoomMembers] = useState([]);

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

  // Update members when roomData changes
  useEffect(() => {
    if (roomData.room_members) {
      setRoomMembers(roomData.room_members);
    }
  }, [roomData]);

  return (
    <div>
      <Navbar name={user.fullName} />
      <div>
        <div>{roomData.room_name}</div>

        <div>
          {roomData.room_members ? (
            roomData.room_members.map((member) => (
              <div key={member.id}>{member.first_name}</div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          <InviteMembers />
        </div>
      </div>
    </div>
  );
}
