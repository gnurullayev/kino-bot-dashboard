import { AuthState, IParams } from "@/interfaces";
import { dispatch, getState } from "@/redux";
import localStorageHelper from "@/utils";
import Axios from "axios";

const VERSION = "v1";
export const DEV_BASE_URL = `http://127.0.0.1:8000/api/${VERSION}/`;
export const PRODUCTION_BASE_URL = `https://backend.lakemedia.uz/api/${VERSION}/`;

const transformAxiosInstance = (
  url: string,
  data: any,
  method: "PUT" | "POST"
) => {
  return {
    method,
    data,
    url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
};

export const axiosInstance = Axios.create({
  baseURL: DEV_BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// run before each request
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

const originalRequests: any = [];

// run after each response
axiosInstance.interceptors.response.use(
  (response) => {
    localStorageHelper.removeItem("isRefresh");
    return Promise.resolve(response);
  },
  async (error) => {
    const originalRequest = error.config;
    const idx = originalRequests.findIndex((item: any) =>
      item.url.includes(originalRequest.url)
    );

    if (idx < 0 && error.response.status !== 409) {
      originalRequests.push(originalRequest);
    } else {
      originalRequests.splice(idx, 1, originalRequest);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const isRefresh = localStorageHelper.getItem("isRefresh");

      if (!isRefresh) {
        localStorageHelper.setItem("isRefresh", true);
      }

      try {
        const auth: AuthState = getState().auth;

        if (auth && !isRefresh) {
          const response = await API.refreshToken({
            AccessToken: auth.token as string,
          });

          const { accessToken } = response;
          dispatch.auth.login({ token: accessToken });

          originalRequests.forEach((element: any) => {
            element.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(element);
          });
          originalRequests.splice(idx, originalRequests.length);
          return Promise.reject(error);
        } else {
          localStorageHelper.removeItem("isRefresh");
          return Promise.reject(error);
        }
      } catch (refreshError: any) {
        if (refreshError.response.status !== 409) {
          setTimeout(() => {
            dispatch.auth.logoutAsync();
          }, 3000);

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  //Auth
  login: (data: any) =>
    axiosInstance.post("login", data).then((res) => res.data),
  refreshToken: (data: any) =>
    axiosInstance(transformAxiosInstance("Auth/refresh", data, "POST")).then(
      (res) => res.data
    ),
  getUser: () => axiosInstance.get("Auth/me").then((res) => res.data),

  //USERS
  getUsers: (params: IParams) =>
    axiosInstance.get("Users", { params }).then((res) => res.data),
  updateUsers: (data: any) =>
    axiosInstance(transformAxiosInstance("Users", data, "PUT")).then(
      (res) => res.data
    ),
  getUsersById: (id: string) =>
    axiosInstance.get("Users/" + id).then((res) => res.data.data),

  //CATEGORY
  getCategories: (params: IParams) =>
    axiosInstance.get("categories", { params }).then((res) => res.data),
  postCategories: (data: any) =>
    axiosInstance.post("categories", data).then((res) => res.data),
  updateCategories: (data: any, id: String) => {
    axiosInstance.put("categories/" + id, data).then((res) => res.data);
  },
  deleteCategories: (id: string) =>
    axiosInstance.delete("categories/" + id).then((res) => res.data),
  getCategoriesById: (id: string) =>
    axiosInstance.get("categories/" + id).then((res) => res.data.data),

  //TAGS
  getTags: (params: IParams) =>
    axiosInstance.get("tags", { params }).then((res) => res.data),
  postTags: (data: any) =>
    axiosInstance.post("tags", data).then((res) => res.data),
  updateTags: (data: any, id: String) => {
    axiosInstance.put("tags/" + id, data).then((res) => res.data);
  },
  deleteTags: (id: string) =>
    axiosInstance.delete("tags/" + id).then((res) => res.data),
  getTagsById: (id: string) =>
    axiosInstance.get("tags/" + id).then((res) => res.data.data),

  //GENRES
  getGenres: (params: IParams) =>
    axiosInstance.get("genres", { params }).then((res) => res.data),
  postGenres: (data: any) =>
    axiosInstance.post("genres", data).then((res) => res.data),
  updateGenres: (data: any, id: String) => {
    axiosInstance.put("genres/" + id, data).then((res) => res.data);
  },
  deleteGenres: (id: string) =>
    axiosInstance.delete("genres/" + id).then((res) => res.data),
  getGenresById: (id: string) =>
    axiosInstance.get("genres/" + id).then((res) => res.data.data),

  //MOVIE
  getMovies: (params: IParams) =>
    axiosInstance.get("movies", { params }).then((res) => res.data),
  postMovies: (data: any) =>
    axiosInstance(transformAxiosInstance("movies", data, "POST")).then(
      (res) => res.data
    ),
  updateMovies: (data: any) =>
    axiosInstance(transformAxiosInstance("movies/update", data, "POST")).then(
      (res) => res.data
    ),
  deleteMovies: (id: string) =>
    axiosInstance.delete("movies/" + id).then((res) => res.data),
  getMoviesById: (id: string) =>
    axiosInstance.get("movies/" + id).then((res) => res.data.data),
  postMoviesVideo: (data: any) =>
    axiosInstance(transformAxiosInstance("movie-upload", data, "POST")).then(
      (res) => res.data
    ),

  //Countries
  getCounties: () =>
    axiosInstance.get("countries").then((res) => res.data.data),

  //SELECT_API
  getAllCategories: () =>
    axiosInstance.get("all-categories").then((res) => res.data.data),
  getAllTags: () => axiosInstance.get("all-tags").then((res) => res.data.data),
  getAllGenres: () =>
    axiosInstance.get("all-genres").then((res) => res.data.data),
  getAllActors: () =>
    axiosInstance.get("all-actors").then((res) => res.data.data),
  getAllSeries: () =>
    axiosInstance.get("all-series").then((res) => res.data.data),

  // upload(transformAxiosInstance("/upload", data, "POST")).then(
  //   (res) => res.data
  // ),
  upload: (data: any) =>
    axiosInstance(transformAxiosInstance("/upload", data, "POST")).then(
      (res) => res.data
    ),
};
