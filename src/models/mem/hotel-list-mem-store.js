import { v4 } from "uuid";
import { hotelMemStore } from "./hotel-mem-store.js";

let hotelLists = [];

export const hotelListMemStore = {
  async getAllHotelLists() {
    console.log("hotelListMemStore started")
    return hotelLists;
  },

  async addHotelList(hotelList) {
    console.log("addHotelList started")
    hotelList._id = v4();
    hotelLists.push(hotelList);
    return hotelList;
  },

  async getHotelListById(id) {
    console.log("getHotelListById started")
    let list = hotelLists.find((hotelList) => hotelList._id === id);
    console.log("list:");
    console.log(list);
    if (list) {
      list.hotels = await hotelMemStore.getHotelsByHotelListId(list._id);
      console.log(`hotels: ${list.hotels}`);
      console.log(list.hotels);
    } else {
      list = null;
    }
    console.log("getHotelListById completed")
    return list;
  },
/*
  async getHotelListById(id) {
    const list = hotellists.find((hotellist) => hotellist._id === id);
    list.hotels = await hotelMemStore.getHotelsByHotelListId(list._id);
    return list;
  },

  async getPlaylistById(id) {
    const list = playlists.find((playlist) => playlist._id === id);
    list.tracks = await trackMemStore.getTracksByPlaylistId(list._id);
    return list;
  */

  async deleteHotelListById(id) {
    console.log("deleteHotelListById started")
    const index = hotelLists.findIndex((hotelList) => hotelList._id === id);
    if (index !== -1) hotelLists.splice(index, 1);
  },

  async deleteAllHotelLists() {
    console.log("deleteAllHotelList started")
    hotelLists = [];
  },

  async getUserHotelLists(userid) {
    return hotelLists.filter((hotelList) => hotelList.userid === userid);
  },
};