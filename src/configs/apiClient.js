import axios from "axios";

const baseURL = "http://139.180.196.41:6969/adminPanel/api";

const apiClient = axios.create({ baseURL });

export default apiClient;
