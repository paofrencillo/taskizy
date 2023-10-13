import axios from "axios";
import TokenServices from "./tokenServices";
import { API_TASKS_URL, API_TASK_URL } from "../config/apiUrls";

const getUserTasks = (userID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(`${API_TASKS_URL}user${userID}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createTask = (taskFormData, roomID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.post(`${API_TASK_URL}room${roomID}/create/`, taskFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const markAsDoneTask = (roomID, taskID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.patch(
      `${API_TASK_URL}room${roomID}/task${taskID}/mark-done/`,
      { is_completed: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteTask = (taskID, roomID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.delete(`${API_TASK_URL}room${roomID}/task${taskID}/delete/`, {
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
  getUserTasks,
  createTask,
  markAsDoneTask,
  deleteTask,
};

export default TaskServices;