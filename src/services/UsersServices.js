import axios from "axios";
import JWTTokenServices from "./JWTTokenServices";
import {
  API_RESET_PASSWORD_CONFIRM_URL,
  API_RESET_PASSWORD_URL,
  API_SET_PASSWORD_URL,
  API_USERS_URL,
} from "../config/apiUrls";

const getUsers = (roomID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(`${API_USERS_URL}${roomID}/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      console.error(err);
    }
  }
};

const getUser = () => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(`${API_USERS_URL}me/`, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      console.error(err);
    }
  }
};

const updateUser = (userFormData) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.patch(`${API_USERS_URL}me/`, userFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      console.error(err);
    }
  }
};

const changeUserImage = (userImageData) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.patch(`${API_USERS_URL}me/`, userImageData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.response.status === 401) {
      console.error(err);
    }
  }
};

const changePassword = (formData) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
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

const forgotPassword = (email) => {
  try {
    return axios.post(API_RESET_PASSWORD_URL, email, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const confirmResetPassword = (formData) => {
  return axios.post(`${API_RESET_PASSWORD_CONFIRM_URL}`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const UsersServices = {
  getUsers,
  getUser,
  updateUser,
  changeUserImage,
  changePassword,
  forgotPassword,
  confirmResetPassword,
};

export default UsersServices;
