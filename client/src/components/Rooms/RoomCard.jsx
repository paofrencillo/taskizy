import { useEffect, useState } from "react";
import { ImEnter } from "react-icons/im";
import { Link } from "react-router-dom";
import { Progress, Typography } from "@material-tailwind/react";

export default function RoomCard(props) {
  const [firstMember, setFirstMember] = useState("");
  const [secondMember, setSecondMember] = useState("");
  const [countOtherMember, setCountOtherMember] = useState(0);
  const [roomMembers, setRoomMembers] = useState("");

  useEffect(() => {
    const getMembers = () => {
      const membersList = [];
      props.roomData.room_members.map((member) => {
        if (member.id !== props.roomData.room_admin.id) {
          membersList.push(member.first_name);
        }
      });

      switch (membersList.length) {
        case 0:
          setRoomMembers("You are the only one in this room");
          break;
        case 1:
          setFirstMember(membersList[0]);
          setRoomMembers(`${firstMember} was here`);
          break;
        case 2:
          setFirstMember(membersList[0]);
          setSecondMember(membersList[1]);
          setRoomMembers(`${firstMember} and ${secondMember} were here`);
          break;
        default:
          setFirstMember(membersList[0]);
          setSecondMember(membersList[1]);
          setCountOtherMember(membersList.length - 2);
          setRoomMembers(
            `${firstMember}, ${secondMember} and ${countOtherMember} others were here`
          );
      }
    };
    getMembers();
  }, [props.roomData, firstMember, secondMember, countOtherMember]);

  return (
    <div className="w-[325px] shadow-md hover:shadow-purple-100 hover:-translate-y-1 rounded-md transition delay-75 duration-150 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 rounded-t-md bg-purple-700 text-sm text-gray-100 font-semibold p-2">
        {props.roomData.room_name}
        <div
          className="w-10 h-10 bg-white rounded-full"
          title={`${props.roomData.room_admin.first_name} ${props.roomData.room_admin.last_name}`}
        >
          <img
            src="logo_temp.png"
            alt="admin-img"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      {/* Body */}
      <div className="flex justify-center flex-col gap-2 px-4 py-2 my-4">
        <Typography
          variant="small"
          color="gray"
          className="text-center w-full  mb-2"
        >
          {props.roomData.task_completed_perc}% Tasks Completed
        </Typography>
        <Progress
          size="lg"
          value={props.roomData.task_completed_perc}
          color="purple"
        />

        <div className="px-6 py-2 shadow-md rounded-md w-full text-center">
          <Typography variant="small">Total Task</Typography>
          <Typography variant="h6" color="purple">
            {props.roomData.tasks_count}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs px-4 py-2 text-purple-700 italic">
        {roomMembers}
        <Link
          to={`/room/${props.roomData.room_id}/${props.roomData.room_slug}`}
        >
          <ImEnter className="text-2xl text-yellow-700 hover:text-yellow-800 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
