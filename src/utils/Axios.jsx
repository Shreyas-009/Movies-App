import axios from "axios";

const instance = axios.create({
  baseURL: "https://movie-app-proxy.vercel.app/",
  headers: {
    accept: "application/json",
  },
});

export default instance;
