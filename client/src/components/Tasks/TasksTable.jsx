import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ImEnter } from "react-icons/im";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import TaskServices from "../../services/TaskServices";
import MutatingDotsLoader from "../Loader/MutatingDotsLoader";

export default function TasksTable({ tasksData, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taskID, setTaskID] = useState(0);

  const handleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  // Get the task ID of the task to be deleted
  const handleTrashGetTaskID = (e) => {
    const getTaskID = e.currentTarget
      .closest("tr")
      .getAttribute("data-task-id");

    if (getTaskID) {
      setTaskID(parseInt(getTaskID));
      setOpenDeleteModal(true);
    } else {
      toast.error(
        "Something is wrong. Try Again or refresh the page",
        toast.POSITION.BOTTOM_RIGHT
      );
    }
  };

  // Get the task ID of the task to be marked as done
  const handleDoneGetTaskID = (e) => {
    const getTaskID = e.currentTarget
      .closest("tr")
      .getAttribute("data-task-id");

    if (getTaskID) {
      handleSendTaskDone(parseInt(getTaskID));
    } else {
      toast.error(
        "Something is wrong. Try Again or refresh the page",
        toast.POSITION.BOTTOM_RIGHT
      );
    }
  };

  // Get the roomID of selected task
  const getRoomID = (selectedTaskID) => {
    const task = tasksData.find((task) => task.task_id === selectedTaskID);
    if (task) {
      return task.room_id;
    } else {
      return null;
    }
  };

  // Send the taskID of the task to be marked as done to the server
  const handleSendTaskDone = async (selectedTaskID) => {
    setIsLoading(true);
    try {
      const roomID = getRoomID(selectedTaskID);

      const response = await TaskServices.markAsDoneTask(
        roomID,
        selectedTaskID
      );
      if (response.status === 200) {
        toast.success("Task was marked done.", toast.POSITION.BOTTOM_RIGHT);
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
        const roomID = getRoomID(taskID);
        const response = await TaskServices.deleteTask(taskID, roomID);

        if (response.status === 204) {
          setOpenDeleteModal(false);
          location.reload();
        } else console.error(response.status);
      } catch (err) {
        setOpenDeleteModal(false);
        toast.error(
          "Something is wrong. Try Again.",
          toast.POSITION.BOTTOM_RIGHT
        );
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
          {" "}
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
          {/* Tasks Table */}
          {/*  */}
          <div className="max-h-[700px] my-4">
            <table className="w-full text-left text-sm font-light text-gray-700 bg-gray-100">
              <thead className="border-b font-medium shadow-md  text-gray-800 bg-gray-200">
                <tr>
                  <th scope="col" className="min-w-[200px] w-[400px] p-4">
                    Task
                  </th>
                  <th scope="col" className="p-4">
                    Urgency
                  </th>
                  <th scope="col" className="p-4">
                    Status
                  </th>
                  <th scope="col" className="p-4">
                    Creator
                  </th>
                  <th scope="col" className="p-4">
                    Room
                  </th>
                  <th scope="col" className="p-4 min-w-[100px]"></th>
                </tr>
              </thead>
              <tbody className="h-10">
                {tasksData.map((task) => {
                  return (
                    <tr
                      key={task.task_id}
                      data-task-id={task.task_id}
                      className="border-b transition delay-75 duration-200 ease-in-out hover:bg-purple-50"
                    >
                      <td className="min-w-[200px] max-w-[400px] whitespace-normal px-4 py-2 font-medium">
                        {task.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
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
                      <td className="whitespace-nowrap px-4 py-2">
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
                      <td className="whitespace-nowrap px-4 py-2">
                        {task.creator.id !== user.userID
                          ? `${task.creator.first_name} ${task.creator.last_name}`
                          : task.creator.id === user.userID
                          ? "Me"
                          : null}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <Link
                          to={`/room/${task.room_id}/${task.room_slug}`}
                          className="flex items-center gap-2 cursor-pointer transition delay-75 duration-200 ease-in-out hover:text-yellow-800"
                        >
                          {task.room} <ImEnter className="text-lg" />
                        </Link>
                      </td>
                      <td className="min-w-[100px] whitespace-nowrap px-4 py-2 text-gray-100">
                        <div className="flex gap-4">
                          {!task.is_completed &&
                            task.creator.id === task.tasker.id && (
                              <button
                                type="button"
                                className="w-full flex gap-2 justify-center items-center bg-red-400 hover:bg-red-700 py-1.5 px-2 rounded-lg cursor-pointer transition-colors delay-75 duration-200 ease-in-out"
                                onClick={handleTrashGetTaskID}
                              >
                                <FaRegTrashAlt className="text-lg" />
                                Trash
                              </button>
                            )}
                          {!task.is_completed && (
                            <button
                              className="w-full flex gap-2 justify-center items-center bg-green-400 hover:bg-green-700 py-1.5 px-2 text-xs rounded-lg cursor-pointer transition-colors delay-75 duration-200 ease-in-out"
                              onClick={handleDoneGetTaskID}
                            >
                              <IoCheckmarkDoneSharp className="text-lg" />
                              Done
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
