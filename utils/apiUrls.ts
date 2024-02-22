import axios from "axios";

// Revisar IP del local para correr la base de datos
const API_URL = "http://192.168.10.11:8000";

export const api = axios.create({
  baseURL: API_URL,
});

export const apiUrls = {
  register: "/register",
  login: "/login",
  getUsers: (userId: string) => `/users/${userId}`,
  sendFriendRequest: "/friend-request",
  getFriendRequests: (userId: string) => `/friend-request/${userId}`,
  acceptFriendRequest: "/friend-request/accept",
};
