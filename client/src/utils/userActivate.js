import axios from "axios";
import { API_AUTH_ACTIVATE_URL } from "../config/apiUrls";

export default function userActivate(params) {
  return axios
    .post(API_AUTH_ACTIVATE_URL, params)
    .then(function (response) {
      console.log(response.status);
      return response.status;
    })
    .catch(function (error) {
      console.log(error.response.status);
      return error.response.status;
    });
}
