import axios from "axios";

const api = axios.create({
  baseURL: "https://release-checklist-4gnm.onrender.com",
});

export default api;