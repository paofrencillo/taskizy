import { ImEnter } from "react-icons/im";
import { Link } from "react-router-dom";

export default function TasksTable({ tasksData, user }) {
  console.log(tasksData);
  return (
    <div className="max-h-[700px] my-4">
      <table className="w-full text-left text-sm font-light text-gray-700 bg-gray-100">
        <thead className="border-b font-medium shadow-md  text-gray-800 bg-gray-200">
          <tr>
            <th scope="col" className="min-w-[200px] max-w-[300px] px-6 py-4">
              Task
            </th>
            <th scope="col" className="px-6 py-4">
              Urgency
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4">
              Creator
            </th>
            <th scope="col" className="px-6 py-4">
              Room
            </th>
            <th scope="col" className="px-6 py-4">
              #
            </th>
          </tr>
        </thead>
        <tbody className="h-10">
          {tasksData.map((task) => {
            return (
              <tr
                key={task.task_id}
                className="border-b transition delay-75 duration-200 ease-in-out hover:bg-purple-50"
              >
                <td className="min-w-[200px] max-w-[300px]   whitespace-normal px-6 py-4 font-medium">
                  {task.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {task.is_urgent ? (
                    <div className="w-fit rounded-md shadow-sm shadow-orange-100 text-orange-500 bg-orange-50 px-2 py-1">
                      Urgent
                    </div>
                  ) : (
                    <div className="w-fit rounded-md shadow-sm shadow-gray-100 text-gray-500 bg-gray-50 px-2 py-1">
                      Not Urgent
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {task.is_completed ? (
                    <div className="w-fit rounded-md shadow-sm shadow-green-100 text-green-500 bg-green-50 px-2 py-1">
                      Completed
                    </div>
                  ) : (
                    <div className="w-fit rounded-md shadow-sm shadow-gray-100 text-gray-500 bg-gray-50 px-2 py-1">
                      Not Completed
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {task.creator.id !== user.userID
                    ? `${task.creator.first_name} ${task.creator.last_name}`
                    : task.creator.id === user.userID
                    ? "Me"
                    : null}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Link
                    to={`/room/${task.room_id}/${task.room_slug}`}
                    className="flex items-center gap-2 cursor-pointer transition delay-75 duration-200 ease-in-out hover:text-yellow-800"
                  >
                    {task.room} <ImEnter className="text-lg" />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Actions</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
