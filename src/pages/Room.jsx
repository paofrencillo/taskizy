import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
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
import { BsPeople, BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import TaskServices from "../services/TaskServices";
import { API_ROOM_URL } from "../config/apiUrls";
import { ToastContainer, toast } from "react-toastify";

export default function Room() {
  const user = useOutletContext();
  const [active, setActive] = useState(1);
  const [nextURL, setNextURL] = useState(null);
  const [prevURL, setPrevURL] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [filterBy, setFilterBy] = useState(0);
  const [roomData, setRoomData] = useState([]);
  const [roomTasks, setRoomTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMembersDrawer, setOpenMembersDrawer] = useState(false);
  const toggleOpenMembersDrawer = () => setOpenMembersDrawer((cur) => !cur);
  const params = useParams();
  const roomURL = `${API_ROOM_URL}room${params.room_id}/${params.room_slug}/`;

  const filterValues = [
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
          setTasksCount(response.data.count);
          setRoomData(response.data.results.room_data);
          setRoomTasks(response.data.results.tasks);
          setTotalPages(response.data.results.total_pages);
          setNextURL(response.data.next);
          setPrevURL(response.data.previous);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);

        if (err.response.status === 404) {
          toast.error(err.response.data);
        } else {
          toast.error("Something is wrong. Try to refresh the page.");
        }
      }
    };

    fetchRoomData();
    document.title = `Taskizy | ${
      roomData.length === 0 ? "" : roomData.room_name
    } Room`;
  }, [params, roomData.length, roomData.room_name]);

  // Create an array with values from 1 to paginationCount
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Set properties for the pagination pages
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "purple",
    onClick: () => {
      setActive(index);
      getRoomPage(index);
    },
    className: "rounded-full",
    disabled: active === index ? true : false,
  });

  // Handle the setting of data after the Next or Prev button was clicked
  const setData = (response) => {
    setTasksCount(response.data.count);
    setNextURL(response.data.next);
    setPrevURL(response.data.previous);
    setRoomTasks(response.data.results.tasks);
    setTotalPages(response.data.results.total_pages);
  };

  // Handle the fetching of data after the page number was clicked
  const getRoomPage = (page) => {
    setActive(page);

    const fetchTasks = async () => {
      try {
        switch (parseInt(filterBy)) {
          case 0: {
            const response = await TaskServices.getRoomTasksPage(
              `${roomURL}?all&page=${page}`
            );
            setData(response);
            break;
          }
          case 1: {
            const response = await TaskServices.getRoomTasksPage(
              `${roomURL}?is_completed=True&page=${page}`
            );
            setData(response);
            break;
          }
          case 2: {
            const response = await TaskServices.getRoomTasksPage(
              `${roomURL}?is_completed=False&page=${page}`
            );
            setData(response);
            break;
          }
          case 3: {
            const response = await TaskServices.getRoomTasksPage(
              `${roomURL}?tasker_id=${user.userID}&page=${page}`
            );
            setData(response);
            break;
          }
          case 4: {
            const response = await TaskServices.getRoomTasksPage(
              `${roomURL}?creator_id=${user.userID}&page=${page}`
            );
            setData(response);
            break;
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Something is wrong. Try to refresh the page.");
      }
    };

    fetchTasks();
  };

  // Handle the next button function
  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);

    const fetchTasks = async () => {
      try {
        const response = await TaskServices.getRoomTasksPage(nextURL);
        setData(response);
      } catch (err) {
        console.error(err);
        toast.error("Something is wrong. Try to refresh the page.");
      }
    };

    fetchTasks();
  };

  // Handle the prev button function
  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);

    const fetchTasks = async () => {
      try {
        const response = await TaskServices.getRoomTasksPage(prevURL);
        setData(response);
      } catch (err) {
        console.error(err);
        toast.error("Something is wrong. Try to refresh the page.");
      }
    };

    fetchTasks();
  };

  // Define the handleFilterChange function to update tasksFiltered state
  const handleFilterChange = async (e) => {
    const filterIndex = e.target
      .closest("button")
      .getAttribute("data-filter-by");

    setFilterBy(filterIndex);
    setActive(1);

    // Filter the tasks based on the selected filterValue
    switch (parseInt(filterIndex)) {
      case 0:
        try {
          const response = await TaskServices.getRoomTasksPage(
            `${roomURL}?all`
          );

          setData(response);
        } catch (err) {
          console.error(err);
          toast.error("Something is wrong. Try to refresh the page.");
        }
        break;

      case 1:
        try {
          const response = await TaskServices.getRoomTasksPage(
            `${roomURL}?is_completed=True`
          );

          setData(response);
        } catch (err) {
          console.error(err);
          toast.error("Something is wrong. Try to refresh the page.");
        }
        break;

      case 2:
        try {
          const response = await TaskServices.getRoomTasksPage(
            `${roomURL}?is_completed=False`
          );

          setData(response);
        } catch (err) {
          console.error(err);
          toast.error("Something is wrong. Try to refresh the page.");
        }
        break;

      case 3:
        try {
          const response = await TaskServices.getRoomTasksPage(
            `${roomURL}?tasker_id=${user.userID}`
          );

          setData(response);
        } catch (err) {
          console.error(err);
          toast.error("Something is wrong. Try to refresh the page.");
        }
        break;

      case 4:
        try {
          const response = await TaskServices.getRoomTasksPage(
            `${roomURL}?creator_id=${user.userID}`
          );

          setData(response);
        } catch (err) {
          console.error(err);
          toast.error("Something is wrong. Try to refresh the page.");
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      {isLoading === false ? (
        <div className="pt-16">
          {/*  */}
          {/* Room Header */}
          {/*  */}
          <div className="bg-gray-800">
            <RoomHeader
              roomID={roomData.room_id}
              roomSlug={roomData.room_slug}
              roomName={roomData.room_name}
              roomAdmin={roomData.room_admin}
              user={user}
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
                      Tasks Count: {tasksCount}
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
                            Filter
                            {filterBy ? `: ${filterValues[filterBy]}` : null}
                          </Typography>
                        </button>
                      </MenuHandler>
                      <MenuList>
                        {filterValues.map((value, index) => {
                          return (
                            <MenuItem
                              key={index}
                              name="filter-by"
                              className="p-2"
                              onClick={handleFilterChange}
                              data-filter-by={index}
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
                  tasks={roomTasks}
                  user={user}
                  roomAdmin={roomData.room_admin}
                />
                {roomTasks.length !== 0 ? (
                  <div className="flex justify-center items-center shadow-lg rounded-lg bg-white mt-4 gap-4 py-2 px-4">
                    <Button
                      variant="text"
                      className="flex items-center gap-2 rounded-full"
                      onClick={prev}
                      disabled={active === 1}
                    >
                      <BsArrowLeftShort
                        color="purple"
                        strokeWidth={2}
                        className="h-4 w-4"
                      />
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      {pages.map((page) => (
                        <IconButton key={page} {...getItemProps(page)}>
                          {page}
                        </IconButton>
                      ))}
                    </div>
                    <Button
                      variant="text"
                      className="flex items-center gap-2 rounded-full"
                      onClick={next}
                      disabled={active === totalPages}
                    >
                      Next
                      <BsArrowRightShort
                        color="purple"
                        strokeWidth={2}
                        className="h-4 w-4"
                      />
                    </Button>
                  </div>
                ) : null}
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
