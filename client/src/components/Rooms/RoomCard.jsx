import { ImEnter } from "react-icons/im";

export default function RoomCard(props) {
  return (
    <div className="w-[325px] shadow-sm border-2 hover:shadow-purple-100 hover:border-purple-200 hover:-translate-y-1 rounded-md transition delay-75 duration-150 ease-in-out">
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
      <div className="p-2 my-4">
        <div className="flex first-letter:gap-4 justify-between items-center">
          <div className="w-full relative h-4 bg-gray-300 rounded-lg">
            <div className="w-[75%] h-full bg-purple-500 text-white rounded-lg">
              <span className="invisible">70% Completed</span>
            </div>
            <p className="top-0 absolute text-xs h-full whitespace-nowrap w-full text-center text-gray-100">
              75% Task Completed
            </p>
          </div>
        </div>
        <div className="text-sm text-center mt-4 text-gray-700">
          15 Pending | 2 In Progress | 12 Completed
        </div>
      </div>
      <div className="flex justify-between items-center text-xs p-2 text-purple-700 italic">
        Paolo, Yana, and Ezekiel are here.
        <ImEnter className="text-2xl text-yellow-500 hover:text-yellow-600 cursor-pointer" />
      </div>
    </div>
  );
}
