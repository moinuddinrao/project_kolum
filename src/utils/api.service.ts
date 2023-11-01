import axios from "axios";

export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    signup: "/auth/signup",
  },
};

export const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
