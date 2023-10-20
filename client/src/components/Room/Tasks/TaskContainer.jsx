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
import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import TaskServices from "../../../services/TaskServices";
import MutatingDotsLoader from "../../Loader/MutatingDotsLoader";
import { anonymousUserImgURL, freeUserImgURL } from "../../../config/userImgs";
import { SERVER_URL } from "../../../config/apiUrls";

export default function TaskContainer({ tasks, user, roomAdmin }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTaskID, setDeleteTaskID] = useState(0);
  const [roomID, setRoomID] = useState(0);
  const handleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const params = useParams();

  useEffect(() => {
    tasks ? setIsLoading(false) : null;
    params ? setRoomID(params.room_id) : setRoomID(0);
  }, [tasks, params]);

  // Get the task ID of the task to be deleted
  const handleTrashGetTaskID = (e) => {
    setDeleteTaskID(e.currentTarget.getAttribute("data-task-id"));
    setOpenDeleteModal(true);
  };

  // Get the task ID of the task to be marked as done
  const handleDoneGetTaskID = (e) => {
    const doneTaskID = e.currentTarget.getAttribute("data-task-id");
    handleSendTaskDone(doneTaskID);
  };

  // Send the taskID of the task to be marked as done to the server
  const handleSendTaskDone = async (doneTaskID) => {
    setIsLoading(true);
    try {
      const response = await TaskServices.markAsDoneTask(roomID, doneTaskID);
      if (response.status === 200) {
        toast.success("Task was marked done.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send the taskID of the task to be deleted to the server
  const handleSendTaskTrash = () => {
    const sendData = async () => {
      try {
        const response = await TaskServices.deleteTask(deleteTaskID, roomID);

        if (response.status === 204) {
          setOpenDeleteModal(false);
          location.reload();
        } else console.error(response.status);
      } catch (err) {
        setOpenDeleteModal(false);
        toast.error("Something is wrong. Try Again.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.error(err);
      }
    };
    sendData();
  };

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <MutatingDotsLoader />
        </div>
      ) : (
        <>
          <ToastContainer />
          {/*  */}
          {/* Delete Task Modal */}
          {/*  */}
          <Dialog
            size="xs"
            open={openDeleteModal}
            handler={handleOpenDeleteModal}
          >
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
          <div className="flex flex-wrap justify-center items-center gap-10 w-full h-fit shadow-lg p-6 rounded-xl">
            {isLoading === true && tasks.length === 0 ? (
              "Loading..."
            ) : tasks.length !== 0 ? (
              tasks.map((task) => {
                return (
                  // ---------
                  // Task Card
                  // ---------
                  <Card
                    key={task.task_id}
                    className="border hover:-translate-y-1 hover:shadow-purple-100 w-72 sm:w-80 md:w-96 h-64"
                  >
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
                          src={
                            task.tasker !== null
                              ? task.tasker.user_image === null
                                ? freeUserImgURL
                                : `${SERVER_URL}${task.tasker.user_image}`
                              : anonymousUserImgURL
                          }
                          alt="tasker-img"
                          title={
                            task.tasker !== null
                              ? task.tasker.first_name === user.first_name
                                ? "Me"
                                : `${task.tasker.first_name} ${task.tasker.last_name}`
                              : "AnonymousUser"
                          }
                          className="border border-gray-500"
                        />
                      </div>

                      <Typography
                        variant="h6"
                        color="gray"
                        className="text-sm lg:text-base"
                      >
                        {task.description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="py-3 px-3.5" divider>
                      <div className="w-full flex justify-center items-center gap-2 bg-blue-50 rounded-md py-1 px-2">
                        <Avatar
                          size="xs"
                          src={
                            task.creator !== null
                              ? task.creator.user_image === null
                                ? freeUserImgURL
                                : `${SERVER_URL}${task.creator.user_image}`
                              : anonymousUserImgURL
                          }
                          alt="creator-img"
                          title={
                            task.creator !== null
                              ? task.creator.first_name === user.first_name
                                ? "Me"
                                : `${task.creator.first_name} ${task.creator.last_name}`
                              : "AnonymousUser"
                          }
                        />
                        <Typography color="blue" className="text-xs">
                          Assigned by{" "}
                          {task.creator === null
                            ? "AnonymousUser"
                            : task.creator.first_name === user.first_name
                            ? "Me"
                            : task.creator.first_name}
                        </Typography>
                      </div>
                      <div className="mt-2 flex justify-center items-center gap-2">
                        {!task.is_completed &&
                        task.creator === null &&
                        roomAdmin.id === user.userID ? (
                          <Button
                            data-task-id={task.task_id}
                            ripple={false}
                            variant="gradient"
                            color="red"
                            className="flex-grow flex justify-center items-center gap-2 hover:shadow-md w-fit py-1.5 px-8"
                            onClick={handleTrashGetTaskID}
                          >
                            <FaRegTrashAlt />
                            <Typography className="text-xs">Trash</Typography>
                          </Button>
                        ) : (
                          !task.is_completed &&
                          task.creator !== null &&
                          (task.creator.id === user.userID ||
                            roomAdmin.id === user.userID) && (
                            <Button
                              data-task-id={task.task_id}
                              ripple={false}
                              variant="gradient"
                              color="red"
                              className="flex-grow flex justify-center items-center gap-2 hover:shadow-md w-fit py-1.5 px-8"
                              onClick={handleTrashGetTaskID}
                            >
                              <FaRegTrashAlt />
                              <Typography className="text-xs">Trash</Typography>
                            </Button>
                          )
                        )}

                        {!task.is_completed &&
                          (task.tasker?.id === user.userID ||
                            roomAdmin.id === user.userID) && (
                            <Button
                              data-task-id={task.task_id}
                              ripple={false}
                              color="green"
                              variant="gradient"
                              className="flex justify-center items-center gap-2 hover:shadow-md w-full py-1.5 px-4"
                              onClick={handleDoneGetTaskID}
                            >
                              <IoCheckmarkDoneSharp />
                              <Typography className="text-xs">
                                Mark as Done
                              </Typography>
                            </Button>
                          )}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            ) : isLoading === false && (!tasks || tasks.length === 0) ? (
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
      )}
    </>
  );
}
