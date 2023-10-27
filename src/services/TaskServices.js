import axios from "axios";
import JWTTokenServices from "./JWTTokenServices";
import { API_TASKS_URL, API_TASK_URL } from "../config/apiUrls";

const getUserTasks = (userID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(`${API_TASKS_URL}user${userID}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getRoomTasksPage = (url) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(url, {
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
    const accessToken = JWTTokenServices.getToken().access;
    return axios.post(`${API_TASK_URL}room/${roomID}/create/`, taskFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      alert("Your session was expired.");
      JWTTokenServices.destroyToken();
      window.location.replace("/");
    }
  }
};

const markAsDoneTask = (roomID, taskID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.patch(
      `${API_TASK_URL}room/${roomID}/task/${taskID}/mark-done/`,
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
    if (err.response.status === 401) {
      alert("Your session was expired.");
      JWTTokenServices.destroyToken();
      window.location.replace("/");
    }
  }
};

const deleteTask = (taskID, roomID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.delete(
      `${API_TASK_URL}room/${roomID}/task/${taskID}/delete/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      alert("Your session was expired.");
      JWTTokenServices.destroyToken();
      window.location.replace("/");
    }
  }
};

const TaskServices = {
  getUserTasks,
  getRoomTasksPage,
  createTask,
  markAsDoneTask,
  deleteTask,
};

export default TaskServices;
