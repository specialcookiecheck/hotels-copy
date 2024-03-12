import { userApi } from "./api/user-api.js";
import { hotelListApi } from "./api/hotel-list-api.js";
import { hotelApi } from "./api/hotel-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAllUsers },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/hotellists", config: hotelListApi.create },
  { method: "DELETE", path: "/api/hotellists", config: hotelListApi.deleteAll },
  { method: "GET", path: "/api/hotellists", config: hotelListApi.find },
  { method: "GET", path: "/api/hotellists/{id}", config: hotelListApi.findOne },
  { method: "DELETE", path: "/api/hotellists/{id}", config: hotelListApi.deleteOne },

  { method: "GET", path: "/api/hotels", config: hotelApi.find },
  { method: "GET", path: "/api/hotels/{id}", config: hotelApi.findOne },
  { method: "POST", path: "/api/hotellists/{id}/hotels", config: hotelApi.create },
  { method: "DELETE", path: "/api/hotels", config: hotelApi.deleteAll },
  { method: "DELETE", path: "/api/hotels/{id}", config: hotelApi.deleteOne },
];