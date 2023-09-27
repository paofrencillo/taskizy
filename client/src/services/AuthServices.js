import axios from "axios";
import {
  API_AUTH_REGISTER_URL,
  API_AUTH_ACTIVATE_URL,
  API_AUTH_lOGIN_URL,
} from "../config/apiUrls";

const register = async (formData) => {
  return axios
    .post(API_AUTH_REGISTER_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const activate = async (params) => {
  return axios
    .post(API_AUTH_ACTIVATE_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const login = async (formData) => {
  return axios
    .post(API_AUTH_lOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const AuthServices = {
  register,
  activate,
  login,
};

export default AuthServices;
