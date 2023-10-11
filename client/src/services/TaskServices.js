import axios from "axios";
import TokenServices from "./tokenServices";
import { API_TASK_URL } from "../config/apiUrls";

const createTask = (taskFormData, roomID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.post(`${API_TASK_URL}${roomID}/create/`, taskFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteTask = (taskID, roomID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.delete(`${API_TASK_URL}${roomID}/${taskID}/delete/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const TaskServices = {
  createTask,
  deleteTask,
};

export default TaskServices;
