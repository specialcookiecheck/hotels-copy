import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const hotelService = {
    hotelUrl: serviceUrl,

  async createUser(user) {
    console.log("hotelService createUser started");
    const res = await axios.post(`${this.hotelUrl}/api/users`, user);
    console.log("hotelService createUser completed");
    return res.data;
  },

  async getUser(id) {
    console.log("hotelService getUser started");
    const res = await axios.get(`${this.hotelUrl}/api/users/${id}`);
    console.log("hotelService getUser completed");
    return res.data;
  },

  async getAllUsers() {
    console.log("hotelService getAllUsers started");
    let res;
    try {
        res = await axios.get(`${this.hotelUrl}/api/users`);
    } catch (error) {
        console.log(error);
    };
    console.log("hotelService getAllUsers completed");
    return res.data;
  },

  async deleteAllUsers() {
    console.log("hotelService deleteAllUsers started");
    let res;
    try {
        res = await axios.delete(`${this.hotelUrl}/api/users`);
    } catch (error) {
        console.log(error.toJSON());
    };
    console.log("hotelService deleteAllUsers completed");
    return res.data;
  },

  async createHotelList(hotelList) {
    console.log("hotelService createHotelList started");
    const res = await axios.post(`${this.hotelUrl}/api/hotellists`, hotelList);
    console.log("hotelService createHotelList completed");
    return res.data;
  },

  async deleteAllHotelLists() {
    console.log("hotelService deleteAllUsers started");
    const res = await axios.delete(`${this.hotelUrl}/api/hotellists`);
    console.log("hotelService deleteAllUsers completed");
    return res.data;
  },

  async deleteHotelList(id) {
    console.log("hotelService deleteHotelList started");
    const res = await axios.delete(`${this.hotelUrl}/api/hotellists/${id}`);
    console.log("hotelService deleteHotelList completed");
    return res;
  },

  async getAllHotelLists() {
    console.log("hotelService getAllHotelLists started");
    const res = await axios.get(`${this.hotelUrl}/api/hotellists`);
    console.log("hotelService getAllHotelLists completed");
    return res.data;
  },

  async getHotelList(id) {
    console.log("hotelService getHotelList started");
    const res = await axios.get(`${this.hotelUrl}/api/hotellists/${id}`);
    console.log("hotelService getHotelList completed");
    return res.data;
  },

  async getAllHotels() {
    console.log("hotelService getAllHotels started");
    const res = await axios.get(`${this.hotelUrl}/api/hotels`);
    console.log("hotelService getAllHotels completed");
    return res.data;
  },

  async createHotel(listId, hotel) {
    console.log("hotelService createHotel started");
    const res = await axios.post(`${this.hotelUrl}/api/hotellists/${listId}/hotels`, hotel);
    console.log("hotelService createHotel completed");
    return res.data;
  },

  async deleteAllHotels() {
    console.log("hotelService deleteAllHotels started");
    const res = await axios.delete(`${this.hotelUrl}/api/hotels`);
    console.log("hotelService deleteAllHotels completed");
    return res.data;
  },

  async getHotel(id) {
    console.log("hotelService getHotel started");
    const res = await axios.get(`${this.hotelUrl}/api/hotels/${id}`);
    console.log("hotelService getHotel completed");
    return res.data;
  },

  async deleteHotel(id) {
    console.log(`hotelService deleteHotel started: ${id}`);
    const res = await axios.delete(`${this.hotelUrl}/api/hotels/${id}`);
    console.log("hotelService deleteHotel completed");
    return res.data;
  },

  async authenticate(user) {
    console.log("hotelService authenticate started");
    const response = await axios.post(`${this.hotelUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token; // lab config
    console.log("hotelService authenticate completed");
    return response.data;
  },

  async clearAuth() {
    console.log("hotelService clearAuth started");
    axios.defaults.headers.common["Authorization"] = "";
    console.log("hotelService clearAuth completed");
  }
};