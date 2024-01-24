import axios from "axios";

const API_URL = "http://192.168.10.21:8000";

export const api = axios.create({
  baseURL: API_URL,
});

export const apiUrls = {
  register: "/register",
  login: "/login",
  getUsers: (userId: string) => `/users/${userId}`,
};
