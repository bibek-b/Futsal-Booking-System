import axios from "axios";
import { serverUrl } from "../env/serverUrl";

const {API_URL } = serverUrl();
const apiRequest = axios.create({
  baseURL: API_URL+"/api",
  withCredentials: true,
});


export default apiRequest;
