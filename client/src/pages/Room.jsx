import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Collapse,
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
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import { IoMdRefresh } from "react-icons/io";
import { BsPeople } from "react-icons/bs";

export default function Room() {
  const params = useParams();
  const user = useOutletContext();
  const [roomData, setRoomData] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openMembersDrawer, setOpenMembersDrawer] = useState(false);
  const toggleOpenMembersDrawer = () => setOpenMembersDrawer((cur) => !cur);

  const menuValues = [
    "All",
    "Completed",
    "Not Completed",
    "Assigned to me",
    "Assigned by me",
  ];

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      setOpenMembersDrawer(false);
    }
  });

  useEffect(() => {
    // Fetch and set rooms when the component mounts
    const fetchRoomData = async () => {
      try {
        const response = await RoomServices.getRoomData(params);
        if (response.status === 200) {
          setRoomData(response.data);
          setTasksFiltered(response.data.tasks);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomData();
    document.title = `Taskizy | ${
      roomData.length === 0 ? "" : roomData.room_name
    } Room`;

    // const pollInterval = setInterval(fetchRoomData, 5000); // Poll every 5 seconds

    // return () => {
    //   clearInterval(pollInterval); // Clear the interval when the component unmounts
    // };
  }, [params, roomData.length, roomData.room_name]);

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
          roomData.tasks.filter(
            (task) => task.tasker !== null && task.tasker.id === user.userID
          )
        );
        break;

      case "Assigned by me":
        setTasksFiltered(
          roomData.tasks.filter(
            (task) => task.creator !== null && task.creator.id === user.userID
          )
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      {isLoading === false ? (
        <div className="pt-16">
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
          <div className="px-4 py-4 md:px-10">
            {/*  */}
            {/* Room Body */}
            {/*  */}
            <div className="sticky flex justify-between gap-4">
              <div className="w-full">
                <Card className="relative w-full flex flex-row justify-between items-center p-2">
                  <div className="flex justify-center items-center gap-4">
                    <Typography
                      variant="small"
                      color="gray"
                      className="hidden sm:inline-block"
                    >
                      Total Tasks: {roomData.tasks ? roomData.tasks.length : 0}
                    </Typography>

                    <IoMdRefresh
                      className="text-xl text-gray-700 hover:text-gray-800 cursor-pointer"
                      onClick={() => location.reload()}
                    />

                    <AddTask roomMembers={roomData.room_members} user={user} />
                  </div>

                  <div className="flex justify-center items-center gap-4">
                    {/*  */}
                    {/* MemberCard Responsive */}
                    {/*  */}
                    <button
                      type="button"
                      className="lg:hidden flex gap-2 justify-center items-center p-2 text-blue-700 w-fit rounded-lg shadow-lg border-2 hover:bg-blue-100 hover:border-blue-100 transition-colors ease-in-out delay-75 duration-200"
                      onClick={toggleOpenMembersDrawer}
                    >
                      <BsPeople className="text-lg" />
                      <Typography
                        variant="small"
                        className="hidden sm:inline-block"
                      >
                        Members
                      </Typography>
                    </button>
                    <Collapse
                      open={openMembersDrawer}
                      className="z-20 absolute top-14 left-1"
                    >
                      <Card className="">
                        <CardBody>
                          <MembersCard
                            roomMembers={roomData.room_members}
                            roomAdmin={roomData.room_admin}
                            user={user}
                          />
                        </CardBody>
                      </Card>
                    </Collapse>
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
                          <Typography
                            variant="small"
                            className="hidden sm:inline-block"
                          >
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
                  </div>
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
              <div className="hidden lg:block w-[325px] lg:w-[450px]">
                <MembersCard
                  roomMembers={roomData.room_members}
                  roomAdmin={roomData.room_admin}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      ) : isLoading === true ? (
        <div className="w-screen h-screen bg-gray-100 bg-opacity-70">
          <MutatingDotsLoader />
        </div>
      ) : null}
    </>
  );
}
