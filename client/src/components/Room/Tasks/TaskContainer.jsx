import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

export default function TaskContainer({ tasks }) {
  return (
    <div className="flex flex-wrap gap-4 w-full h-fit shadow-lg p-6 rounded-xl">
      {tasks
        ? tasks.map((task) => {
            return (
              <Card key={task.task_id} className="w-96 h-64">
                <CardBody className="flex flex-col gap-2 p-4 h-full">
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex justify-between items-center gap-2">
                      {task.is_urgent ? (
                        <div className=" text-xs py-1 px-2 bg-orange-50 text-orange-500 rounded-md">
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
                      title={`${task.tasker.first_name} ${task.tasker.last_name}`}
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
                      Assigned by {task.creator.first_name}
                    </Typography>
                  </div>
                  <div className="mt-2 flex justify-center items-center gap-2">
                    <Button
                      variant="gradient"
                      color="red"
                      className="flex justify-center items-center gap-2 hover:shadow-md w-1/3 py-1.5 px-2"
                    >
                      <FaRegTrashAlt />
                      <Typography className="text-xs">Trash</Typography>
                    </Button>
                    <Button
                      color="green"
                      variant="gradient"
                      className="flex justify-center items-center gap-2 hover:shadow-md w-2/3 py-1.5 px-2"
                    >
                      <IoCheckmarkDoneSharp />
                      <Typography className="text-xs">
                        Mark as Complete
                      </Typography>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        : null}
    </div>
  );
}
