import axios from "axios";
import TokenServices from "./tokenServices";
import { API_USERS_URL } from "../config/apiUrls";

const getUsers = () => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(API_USERS_URL, {
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
