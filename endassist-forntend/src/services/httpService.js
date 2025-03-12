import axios from "axios";

axios.defaults.baseURL = "https://endassist-api.vercel.app";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
