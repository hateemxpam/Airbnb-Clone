// /client/src/api/axios.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Your Express backend
  withCredentials: true, // Allow cookies (e.g., for JWT if needed)
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
