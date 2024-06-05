import Auth from "../utils/auth.ts";
import axios, { AxiosInstance } from "axios";
export function createAxios(): AxiosInstance {
  let instance = axios.create();
  Auth.initialize();
  instance.defaults.headers["x-token"] = Auth.state["x-token"];
  instance.defaults.headers["Accept"] = "application/json";
  instance.defaults.headers["Content-Type"] = "application/json";

  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        const haveFile = Object.values(config.data).some(
          (e) => e && e.toString() === "[object File]"
        );
        if (haveFile) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // instance.interceptors.response.use(
  //   (response) => response.data,
  //   (error) => {
  //     if (error.response && error.response.data) {
  //       return Promise.reject({ ...error.response.data })
  //     } else {
  //       return Promise.reject({
  //         error: true,
  //         message: "Error Code 100: No response error from server",
  //         statusCode:
  //           error && error.request && error.request.status
  //             ? error.request.status
  //             : "1899",
  //       })
  //     }
  //   }
  // )
  return instance;
}
