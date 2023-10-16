import axios from "axios";
import TokenServices from "./tokenServices";
import { API_USERS_URL } from "../config/apiUrls";

const getUsers = (roomID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(`${API_USERS_URL}${roomID}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getUser = () => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(`${API_USERS_URL}me/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = (userFormData) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.patch(`${API_USERS_URL}me/`, userFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const changeUserImage = (userImageData) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.patch(`${API_USERS_URL}me/`, userImageData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const UsersServices = {
  getUsers,
  getUser,
  updateUser,
  changeUserImage,
};

export default UsersServices;
