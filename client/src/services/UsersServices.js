import axios from "axios";
import TokenServices from "./tokenServices";
import { API_SET_PASSWORD_URL, API_USERS_URL } from "../config/apiUrls";

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
    if (err.response.status === 401) {
      alert("Your session was expired.");
      TokenServices.destroyToken();
      window.location.replace("/");
    }
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
    if (err.response.status === 401) {
      alert("Your session was expired.");
      TokenServices.destroyToken();
      window.location.replace("/");
    }
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
    if (err.response.status === 401) {
      alert("Your session was expired.");
      TokenServices.destroyToken();
      window.location.replace("/");
    }
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
    if (err.response.status === 401) {
      alert("Your session was expired.");
      TokenServices.destroyToken();
      window.location.replace("/");
    }
  }
};

const changePassword = (formData) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.post(API_SET_PASSWORD_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
  changePassword,
};

export default UsersServices;
