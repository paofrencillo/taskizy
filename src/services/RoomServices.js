import axios from "axios";

import { API_ROOMS_URL, API_ROOM_URL } from "../config/apiUrls";
import JWTTokenServices from "./JWTTokenServices";

const createRoom = (roomFormData) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.post(API_ROOMS_URL, roomFormData, {
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

const getRooms = () => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(API_ROOMS_URL, {
      headers: {
        "Content-Type": "application/json",
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

const getRoomData = (params) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(`${API_ROOM_URL}${params.room_id}/${params.room_slug}/`, {
      headers: {
        "Content-Type": "application/json",
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

const addRoomMembers = (formData, params) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.post(
      `${API_ROOM_URL}${params.room_id}/${params.room_slug}/members/`,
      formData,
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

const getRoomMembers = (params) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.get(
      `${API_ROOM_URL}${params.room_id}/${params.room_slug}/members/`,
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

const kickRoomMember = (roomID, memberID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.delete(
      `${API_ROOM_URL}${roomID}/member/${memberID}/destroy/`,
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
    if (err.response.status === 500) {
      alert("Internal Server Error.");
    }
  }
};

const assignAdminRoomMember = (roomID, roomSlug, memberID) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.patch(
      `${API_ROOM_URL}${roomID}/${roomSlug}/assign_as_admin/`,
      { room_admin: memberID },
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

const deleteRoom = (roomID, roomSlug) => {
  try {
    const accessToken = JWTTokenServices.getToken().access;
    return axios.delete(`${API_ROOM_URL}${roomID}/${roomSlug}/`, {
      headers: {
        "Content-Type": "application/json",
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

const RoomServices = {
  createRoom,
  getRooms,
  getRoomData,
  addRoomMembers,
  getRoomMembers,
  kickRoomMember,
  assignAdminRoomMember,
  deleteRoom,
};

export default RoomServices;
