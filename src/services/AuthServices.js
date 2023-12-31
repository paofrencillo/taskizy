import axios from "axios";
import {
  API_AUTH_REGISTER_URL,
  API_AUTH_ACTIVATE_URL,
  API_AUTH_LOGIN_URL,
  API_AUTH_LOGOUT_URL,
} from "../config/apiUrls";

import JWTTokenServices from "./JWTTokenServices";

const register = (formData) => {
  try {
    return axios.post(API_AUTH_REGISTER_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const activate = (params) => {
  try {
    return axios.post(API_AUTH_ACTIVATE_URL, params);
  } catch (err) {
    console.error(err);
  }
};

const login = (formData) => {
  try {
    return axios.post(API_AUTH_LOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  const refreshToken = JWTTokenServices.getToken().refresh;
  const accessToken = JWTTokenServices.getToken().access;
  const refreshTokenForm = new FormData();
  refreshTokenForm.append("refresh", refreshToken);

  return axios
    .post(API_AUTH_LOGOUT_URL, refreshTokenForm, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
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
  logout,
};

export default AuthServices;
