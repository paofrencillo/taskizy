import { Typography, Progress } from "@material-tailwind/react";

export default function RoomHeader({ roomName, task_completed_perc }) {
  return (
    <div className="flex justify-around items-center gap-4 p-8">
      <div>
        <Typography variant="h3" color="white">
          Welcome to {roomName}&apos;s Room
        </Typography>
        <Typography variant="small" className="text-gray-400">
          You have 3 task today
        </Typography>
        <div className="mt-4 flex flex-grow items-center justify-between bg-blue-gray-50 gap-2 shadow-lg rounded-lg py-2 px-4">
          <Typography variant="small" color="purple">
            {task_completed_perc}% Tasks Completed
          </Typography>
          <div className="w-72">
            <Progress
              value={task_completed_perc}
              size="lg"
              color="purple"
              className="bg-gray-300"
            />
          </div>
        </div>
      </div>
      <div>
        <img
          src="/undraw_completed_tasks_vs6q.svg"
          alt="room-img"
          className="w-56"
        />
      </div>
    </div>
  );
}
