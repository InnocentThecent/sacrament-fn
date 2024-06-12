import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/login")
    ) {
      console.log(error);

      window.location.pathname = "/login";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export const localUrl = url;

interface ErrorResponse {
  message: string;
  data?: any[];
}

export const handleErrorResponse = (error: any): ErrorResponse => {
  if (error.response !== undefined) {
    return {
      message: error.response.data.message,
      data: error.response.data?.data,
    };
  }
  return { message: error.message };
};

export default api;
