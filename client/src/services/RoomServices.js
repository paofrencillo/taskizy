import axios from "axios";
import TokenServices from "./tokenServices";
import { API_ROOMS_URL, API_ROOM_URL } from "../config/apiUrls";

const createRoom = (roomFormData) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.post(API_ROOMS_URL, roomFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getRooms = () => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(API_ROOMS_URL, {
      headers: {
        Authorization: `JWT ${accessToken}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const getRoomData = (params) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(
      `${API_ROOM_URL}room${params.room_id}/${params.room_slug}/`,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const addRoomMembers = (formData, params) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.post(
      `${API_ROOM_URL}room${params.room_id}/${params.room_slug}/members/`,
      formData,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const getRoomMembers = (params) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.get(
      `${API_ROOM_URL}room${params.room_id}/${params.room_slug}/members/`,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const kickRoomMember = (roomID, memberID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.delete(
      `${API_ROOM_URL}room${roomID}/member${memberID}/destroy/`,
      {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};

const assignAdminRoomMember = (roomID, roomSlug, memberID) => {
  try {
    const accessToken = TokenServices.getToken().access;
    return axios.patch(
      `${API_ROOM_URL}room${roomID}/room${roomSlug}/assign_as_admin/`,
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
};

export default RoomServices;
