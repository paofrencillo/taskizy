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

const UsersServices = {
  getUsers,
};

export default UsersServices;
