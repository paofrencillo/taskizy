export default function RoomHeader(props) {
  return (
    <div className="flex justify-around items-center gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to {props.roomName}&apos;s Room
        </h1>
        <span className="text-base font-medium text-gray-500">
          You have 3 task today
        </span>
      </div>
      <div>
        <img
          src="/undraw_completed_tasks_vs6q.svg"
          alt="room-img"
          className="w-48"
        />
      </div>
    </div>
  );
}
