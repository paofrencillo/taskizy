import { useEffect, useState } from "react";
import { ImEnter } from "react-icons/im";
import { Link } from "react-router-dom";
import { Avatar, Progress, Typography } from "@material-tailwind/react";
import { freeUserImgURL } from "../../config/userImgs";

export default function RoomCard({ roomData, user }) {
  const [firstMember, setFirstMember] = useState("");
  const [secondMember, setSecondMember] = useState("");
  const [countOtherMember, setCountOtherMember] = useState(0);
  const [roomMembers, setRoomMembers] = useState("");

  useEffect(() => {
    const getMembers = () => {
      const membersList = [];
      roomData.room_members.map((member) => {
        if (member.id !== roomData.room_admin.id) {
          membersList.push(member.first_name);
        }
      });

      switch (membersList.length) {
        case 0:
          setRoomMembers("You are the only one in this room");
          break;
        case 1:
          setFirstMember(membersList[0]);
          if (membersList[0] === user.first_name) {
            setRoomMembers("You are here.");
          } else {
            setRoomMembers(`${firstMember} was here`);
          }

          break;
        case 2:
          setFirstMember(membersList[0]);
          setSecondMember(membersList[1]);
          if (membersList[0] === user.first_name) {
            setRoomMembers(`You and ${secondMember} were here`);
          } else if (membersList[1] === user.first_name) {
            setRoomMembers(`${firstMember} and You were here`);
          } else {
            setRoomMembers(`${firstMember} and ${secondMember} were here`);
          }

          break;
        default:
          setFirstMember(membersList[0]);
          setSecondMember(membersList[1]);
          setCountOtherMember(membersList.length - 2);

          if (membersList[0] === user.first_name) {
            setRoomMembers(
              `You, ${secondMember} and ${countOtherMember} others were here`
            );
          } else if (membersList[1] === user.first_name) {
            setRoomMembers(
              `${firstMember}, You and ${countOtherMember} others were here`
            );
          } else {
            setRoomMembers(
              `${firstMember}, ${secondMember} and ${countOtherMember} others were here`
            );
          }
      }
    };
    getMembers();
  }, [roomData, user.first_name, firstMember, secondMember, countOtherMember]);

  return (
    <div className="w-[325px] shadow-md hover:shadow-purple-100 hover:-translate-y-1 rounded-md transition delay-75 duration-150 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 rounded-t-md bg-purple-700 text-sm text-gray-100 font-semibold p-2">
        {roomData.room_name}
        <Avatar
          variant="circular"
          size="md"
          alt="user-image"
          className="p-0.5 bg-gray-100"
          src={
            roomData.room_admin.user_image === null ||
            roomData.room_admin.user_image === ""
              ? freeUserImgURL
              : roomData.room_admin.user_image
          }
          title={
            roomData.room_admin.id === user.userID
              ? "Me"
              : `${roomData.room_admin.first_name} ${roomData.room_admin.last_name}`
          }
        />
      </div>
      {/* Body */}
      <div className="flex justify-center flex-col gap-2 px-4 py-2 my-4">
        <Typography
          variant="small"
          color="gray"
          className="text-center w-full  mb-2"
        >
          {roomData.task_completed_perc}% Tasks Completed
        </Typography>
        <Progress
          size="lg"
          value={roomData.task_completed_perc}
          color="purple"
        />

        <div className="px-6 py-2 shadow-md rounded-md w-full text-center">
          <Typography variant="small">Total Task</Typography>
          <Typography variant="h6" color="purple">
            {roomData.tasks_count}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs px-4 py-2 text-purple-700 italic">
        {roomMembers}
        <Link to={`/room/${roomData.room_id}/${roomData.room_slug}`}>
          <ImEnter className="text-2xl text-yellow-700 hover:text-yellow-800 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
