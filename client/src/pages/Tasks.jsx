import { useEffect, useState } from "react";
import MutatingDotsLoader from "../components/Loader/MutatingDotsLoader";
import { useOutletContext } from "react-router-dom";
import TaskServices from "../services/TaskServices";
import TasksTable from "../components/Tasks/TasksTable";

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
  }, [user.userID]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <MutatingDotsLoader />
        </div>
      ) : (
        <div className="flex flex-col pt-16 p-8">
          <div className="">
            <div className="inline-block w-full">
              <div className="overflow-x-auto">
                <TasksTable tasksData={tasksData} user={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
