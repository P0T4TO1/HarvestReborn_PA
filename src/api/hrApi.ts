import axios from "axios";

const hrApi = axios.create({
  baseURL: "/api",
});

export default hrApi;