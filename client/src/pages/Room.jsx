import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomServices from "../services/RoomServices";
import InviteMembers from "../components/Room/InviteMembers";
import RoomHeader from "../components/Room/RoomHeader";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function Room() {
  // const user = useOutletContext();
  const params = useParams();
  const [roomData, setRoomData] = useState({});
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

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
      <div className="fixed top-16 left-0 h-screen shadow-lg border-r w-60 px-8 py-4">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="text-gray-800 font-semibold text-base">
            Room Members
          </div>
          <div
            className="bg-blue-400 shadow-sm shadow-blue-200 rounded-full p-2 hover:bg-blue-500 transition delay-75 duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              setShowAddMemberModal(!showAddMemberModal);
            }}
          >
            <MdPersonAddAlt1 className="text-lg text-gray-100" />
          </div>
        </div>
        <div className="flex flex-col justify-between max-h-full gap-4">
          {roomData.room_members ? (
            roomData.room_members.map((member) => (
              <div key={member.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full">
                  <img src="/logo_temp.png" alt="member-img" />
                </div>
                <div className="text-sm text-gray-500 hover:text-gray-800 text-ellipsis">
                  {member.first_name} {member.last_name}
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="ml-60 p-4">
        <div>
          <RoomHeader roomName={roomData.room_name} />
          {showAddMemberModal && (
            <>
              <div className="fixed z-50 w-screen h-screen bg-gray-800 bg-opacity-50 top-0 left-0">
                <div className="fixed w-[700px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-4">
                  <InviteMembers />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="h-14 flex flex-grow items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6">
            <div className="text-gray-500">70% Task Completed</div>
            <div className="w-96 bg-purple-200 h-6 rounded-lg">
              <div className="w-[70%] bg-purple-500 h-6 rounded-lg"></div>
            </div>
          </div>
          <div className="h-14 flex items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6 text-gray-500">
            20 Task
          </div>

          <div className="h-14 flex flex-grow items-center justify-between gap-4 shadow-md rounded-lg py-2 px-6">
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
