import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import RoomServices from "../services/RoomServices";
import RoomHeader from "../components/Room/RoomHeader";
import { MembersCard } from "../components/Room/MembersCard";
import TaskContainer from "../components/Room/Tasks/TaskContainer";
import { IoFilter } from "react-icons/io5";
import AddTask from "../components/Room/Tasks/AddTask";

export default function Room() {
  const params = useParams();
  const user = useOutletContext();
  const [roomData, setRoomData] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  const menuValues = [
    "All",
    "Completed",
    "Not Completed",
    "Assigned to me",
    "Assigned by me",
  ];

  useEffect(() => {
    // Fetch and set rooms when the component mounts
    const fetchRoomData = async () => {
      try {
        const response = await RoomServices.getRoomData(params);
        if (response.status === 200) {
          setRoomData(response.data);
          setTasksFiltered(response.data.tasks);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomData();
  }, [params]);

  // Define the handleFilterChange function to update tasksFiltered state
  const handleFilterChange = (e) => {
    const filterValue = e.target.innerText;
    setFilterBy(filterValue); // Set the filterBy state to display in the UI
    // Filter the tasks based on the selected filterValue

    switch (filterValue) {
      case "All":
        setTasksFiltered(roomData.tasks);
        break;

      case "Completed":
        setTasksFiltered(roomData.tasks.filter((task) => task.is_completed));
        break;

      case "Not Completed":
        setTasksFiltered(roomData.tasks.filter((task) => !task.is_completed));
        break;

      case "Assigned to me":
        setTasksFiltered(
          roomData.tasks.filter((task) => task.tasker.id === user.userID)
        );
        break;

      case "Assigned by me":
        setTasksFiltered(
          roomData.tasks.filter((task) => task.creator.id === user.userID)
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      {/*  */}
      {/* Add Task Modal */}
      {/*  */}

      {/*  */}
      {/* Room Header */}
      {/*  */}
      <div className="bg-gray-800">
        <RoomHeader
          roomName={roomData.room_name}
          roomAdmin={roomData.room_admin}
          task_completed_perc={roomData.task_completed_perc}
        />
      </div>

      <div className="px-10 py-4">
        {/*  */}
        {/* Room Body */}
        {/*  */}
        <div className="sticky flex justify-between gap-4">
          <div className="w-full">
            <Card className="w-full flex flex-row justify-between items-center p-2">
              <div className="flex justify-center items-center gap-4">
                <Typography variant="small" color="gray">
                  Total Tasks: {roomData.tasks ? roomData.tasks.length : 0}
                </Typography>
                <AddTask roomMembers={roomData.room_members} user={user} />
              </div>
              {/*  */}
              {/* Filter Menu / Options */}
              {/*  */}
              <Menu placement="bottom-end">
                <MenuHandler>
                  <button
                    type="button"
                    className="flex gap-2 justify-center items-center p-2 text-gray-700 w-fit rounded-lg shadow-lg border-2 hover:bg-purple-100  hover:border-purple-100 transition-colors ease-in-out delay-75 duration-200"
                  >
                    <IoFilter className="text-lg" />
                    <Typography className="text-xs">
                      Filter{filterBy ? `: ${filterBy}` : null}
                    </Typography>
                  </button>
                </MenuHandler>
                <MenuList>
                  {menuValues.map((value, index) => {
                    return (
                      <MenuItem
                        key={index}
                        name="filter-by"
                        className="p-2"
                        onClick={handleFilterChange}
                      >
                        <Typography variant="small" color="gray">
                          {value}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Card>
            <TaskContainer
              tasks={tasksFiltered}
              user={user}
              roomAdmin={roomData.room_admin}
            />
          </div>

          {/*  */}
          {/* Room Members Container */}
          {/*  */}
          <MembersCard
            roomMembers={roomData.room_members}
            roomAdmin={roomData.room_admin}
            user={user}
          />
        </div>
      </div>
    </>
  );
}
