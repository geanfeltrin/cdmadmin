import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "http://localhost:3333/"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("@cdm-adm:token");
  const { active: category } = store.getState().category;
  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (category) {
    headers.CATEGORY = category.slug;
  }

  console.log(headers);
  console.log(token);

  return { ...config, headers };
});

export default api;
