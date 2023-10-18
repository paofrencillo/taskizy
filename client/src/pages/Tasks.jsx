import { useEffect, useState } from "react";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import { useOutletContext } from "react-router-dom";
import TaskServices from "../services/TaskServices";
import TasksTable from "../components/Tasks/TasksTable";
import { Typography } from "@material-tailwind/react";

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasksData, setTasksData] = useState([]);
  const user = useOutletContext();

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await TaskServices.getUserTasks(user.userID);
        if (response.status === 200) {
          setIsLoading(false);
          setTasksData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasksData();
    document.title = "Taskizy | My Tasks";
  }, [user.userID]);

  return (
    <>
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
              <Typography variant="h6" color="purple" className="text-center">
                You need to create or join a room to create tasks.
              </Typography>
            </div>
          ) : (
            <>
              <Typography variant="h4" className="mt-4 w-full text-center">
                My Tasks
              </Typography>
              <div className="inline-block w-full">
                <div className="overflow-x-auto">
                  <TasksTable tasksData={tasksData} user={user} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
