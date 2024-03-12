import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { hotelJsonStore } from "./hotel-json-store.js";

export const hotelListJsonStore = {
  async getAllHotelLists() {
    await db.read();
    return db.data.hotelLists;
  },

  async addHotelList(hotelList) {
    await db.read();
    hotelList._id = v4();
    db.data.hotelLists.push(hotelList);
    await db.write();
    return hotelList;
  },

  async getHotelListById(id) {
    await db.read();
    let list = db.data.hotelLists.find((hotelList) => hotelList._id === id);
    if (list) {
      list.hotels = await hotelJsonStore.getHotelsByHotelListId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserHotelLists(userid) {
    await db.read();
    return db.data.hotelLists.filter((hotelList) => hotelList.userid === userid);
  },

  async deleteHotelListById(id) {
    await db.read();
    const index = db.data.hotelLists.findIndex((hotelList) => hotelList._id === id);
    if (index !== -1) db.data.hotelLists.splice(index, 1);
    await db.write();
  },

  async deleteAllHotelLists() {
    db.data.hotelLists = [];
    await db.write();
  },
};
