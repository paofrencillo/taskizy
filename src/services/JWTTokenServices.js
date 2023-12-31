import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_AUTH_JWT_REFRESH_URL } from "../config/apiUrls";

const saveToken = (token) => {
  localStorage.setItem("refresh", token.refresh);
  localStorage.setItem("access", token.access);
};

const getToken = () => {
  const refresh = localStorage.getItem("refresh");
  const access = localStorage.getItem("access");
  return { refresh, access };
};

const refreshTokens = () => {
  const { refresh, access } = getToken();

  if (refresh && access) {
    const decodedRT = jwt_decode(refresh);
    const decodedAT = jwt_decode(access);
    const rtExpDate = new Date(decodedRT.exp * 1000);
    const atExpDate = new Date(decodedAT.exp * 1000);
    const currentDateTime = new Date();

    if (atExpDate <= currentDateTime) {
      axios
        .post(API_AUTH_JWT_REFRESH_URL, { refresh: refresh })
        .then((response) => {
          localStorage.setItem("access", response.data.access);
          return response;
        })
        .catch((error) => {
          return error.response.status;
        });
    }

    if (rtExpDate <= currentDateTime) {
      destroyToken();
      return;
    }
  } else {
    return;
  }
};

const destroyToken = () => {
  localStorage.removeItem("refresh");
  localStorage.removeItem("access");
};

const JWTTokenServices = {
  saveToken,
  getToken,
  refreshTokens,
  destroyToken,
};

export default JWTTokenServices;
