import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import TaskServices from "../../../services/TaskServices";

export default function TaskContainer({ tasks, user, roomAdmin }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [taskID, setTaskID] = useState("");
  const handleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const params = useParams();

  useEffect(() => {
    tasks ? setIsloading(false) : null;
  }, [tasks]);

  const handleGetTaskID = (e) => {
    setTaskID(e.currentTarget.getAttribute("data-task-id"));
    setOpenDeleteModal(true);
  };

  const handleSendTaskTrash = () => {
    const roomID = params.room_id;

    const sendData = async () => {
      try {
        const response = await TaskServices.deleteTask(taskID, roomID);

        if (response.status === 204) {
          setOpenDeleteModal(false);
          location.reload();
        } else console.error(response.status);
      } catch (err) {
        setOpenDeleteModal(false);
        toast.error("Something is wrong. Try Again.", toast.POSITION.TOP_RIGHT);
        console.error(err);
      }
    };

    sendData();
  };

  return (
    <>
      <ToastContainer />
      {/*  */}
      {/* Delete Task Modal */}
      {/*  */}
      <Dialog size="xs" open={openDeleteModal} handler={handleOpenDeleteModal}>
        <DialogHeader>Delete Task</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this task?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDeleteModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSendTaskTrash}
          >
            <span>Yes, Delete Task</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*  */}
      {/* Task Container */}
      {/*  */}
      <div className="flex flex-wrap justify-center items-center gap-4 w-full h-fit shadow-lg p-6 rounded-xl">
        {isLoading === true && tasks.length === 0 ? (
          "Loading..."
        ) : tasks.length !== 0 ? (
          tasks.map((task) => {
            return (
              // ---------
              // Task Card
              // ---------
              <Card key={task.task_id} className="w-96 h-64">
                <CardBody className="flex flex-col gap-2 p-4 h-full">
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex justify-between items-center gap-2">
                      {task.is_urgent ? (
                        <div className="text-xs py-1 px-2 bg-orange-50 text-orange-500 rounded-md">
                          Urgent
                        </div>
                      ) : null}
                      {task.is_completed ? (
                        <div className="text-xs py-1 px-2 bg-green-50 text-green-500 rounded-md">
                          Completed
                        </div>
                      ) : (
                        <div className=" text-xs py-1 px-2 bg-gray-50 text-gray-500 rounded-md">
                          Not Completed
                        </div>
                      )}
                    </div>

                    <Avatar
                      size="md"
                      src="/logo_temp.png"
                      alt="tasker-img"
                      title={
                        task.tasker.first_name === user.first_name
                          ? "Me"
                          : `${task.tasker.first_name} ${task.tasker.last_name}`
                      }
                    />
                  </div>

                  <Typography variant="h6" color="gray">
                    {task.description}
                  </Typography>
                </CardBody>
                <CardFooter className="py-3 px-3.5" divider>
                  <div className="w-full flex justify-center items-center gap-2 bg-blue-50 rounded-md py-1 px-2">
                    <Avatar
                      src="/logo_temp.png"
                      alt="creator-img"
                      size="xs"
                      className="border border-blue-100"
                    />
                    <Typography color="blue" className="text-xs">
                      Assigned by{" "}
                      {task.creator.first_name === user.first_name
                        ? "Me"
                        : task.creator.first_name}
                    </Typography>
                  </div>
                  <div className="mt-2 flex justify-center items-center gap-2">
                    {!task.is_completed &&
                      (task.creator.id === user.userID ||
                        roomAdmin.id === user.userID) && (
                        <Button
                          data-task-id={task.task_id}
                          variant="gradient"
                          color="red"
                          className="flex-grow flex justify-center items-center gap-2 hover:shadow-md w-fit py-1.5 px-8"
                          onClick={handleGetTaskID}
                        >
                          <FaRegTrashAlt />
                          <Typography className="text-xs">Trash</Typography>
                        </Button>
                      )}

                    {!task.is_completed &&
                      (task.tasker.id === user.userID ||
                        roomAdmin.id === user.userID) && (
                        <Button
                          data-task-id={task.task_id}
                          color="green"
                          variant="gradient"
                          className="flex justify-center items-center gap-2 hover:shadow-md w-full py-1.5 px-4"
                        >
                          <IoCheckmarkDoneSharp />
                          <Typography className="text-xs">
                            Mark as Complete
                          </Typography>
                        </Button>
                      )}
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : isLoading === false && !tasks ? (
          <Typography
            variant="h3"
            color="purple"
            className="w-full text-center"
          >
            No Tasks
          </Typography>
        ) : null}
      </div>
    </>
  );
}
