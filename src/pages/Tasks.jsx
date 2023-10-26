import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import TaskServices from "../services/TaskServices";
import TasksTable from "../components/Tasks/TasksTable";
import { API_TASKS_URL } from "../config/apiUrls";

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasksData, setTasksData] = useState([]);
  const [active, setActive] = useState(1);
  const [nextURL, setNextURL] = useState(null);
  const [prevURL, setPrevURL] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const user = useOutletContext();

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await TaskServices.getUserTasks(user.userID);
        if (response.status === 200) {
          setIsLoading(false);
          setData(response);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasksData();
    document.title = "Taskizy | My Tasks";
  }, [user.userID]);

  // Create an array with values from 1 to paginationCount
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Set properties for the pagination pages
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "purple",
    onClick: () => {
      setActive(index);
      getPage(index);
    },
    className: "rounded-full",
    disabled: active === index ? true : false,
  });

  // Handle the fetching of data after the page number was clicked
  const getPage = (page) => {
    setActive(page);

    const fetchTasks = async () => {
      try {
        const response = await TaskServices.getRoomTasksPage(
          `${API_TASKS_URL}user${user.userID}/?page=${page}`
        );
        response.status === 200
          ? setData(response)
          : console.error(response.statusText);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  };

  // Handle the setting of data after the Next or Prev button was clicked
  const setData = (response) => {
    setNextURL(response.data.next);
    setPrevURL(response.data.previous);
    setTasksData(response.data.results.tasks);
    setTotalPages(response.data.results.total_pages);
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

  return (
    <>
      <ToastContainer position="bottom-right" />
      {isLoading ? (
        <div className="w-screen h-screen">
          <MutatingDotsLoader />
        </div>
      ) : (
        <div className="flex flex-col pt-16 p-8">
          {tasksData === null || !tasksData || tasksData.length === 0 ? (
            <div className="mt-10 flex flex-col gap-2 justify-center items-center">
              <Typography variant="h1" color="purple">
                No Tasks
              </Typography>
              <img
                className="w-96 object-cover object-center"
                src="/undraw_pending_approval_xuu9.svg"
                alt="nature image"
              />
            </div>
          ) : (
            <>
              <Typography variant="h4" className="mt-8 w-full text-center">
                My Tasks
              </Typography>
              <div className="inline-block w-full">
                <div className="overflow-x-auto">
                  <TasksTable tasksData={tasksData} user={user} />
                </div>
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
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
