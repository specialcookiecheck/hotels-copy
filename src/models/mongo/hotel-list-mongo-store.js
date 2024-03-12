import { HotelList } from "./hotelList.js";
import { hotelMongoStore } from "./hotel-mongo-store.js";

export const hotelListMongoStore = {
  async getAllHotelLists() {
    console.log("hotelListMongoStore getAllHotelLists started");
    const hotelLists = await HotelList.find().lean();
    console.log("hotelListMongoStore getAllHotelLists completed");
    return hotelLists;
  },

  async getHotelListById(id) {
    console.log("hotelListMongoStore getHotelListById started");
    if (id) {
      const hotelList = await HotelList.findOne({ _id: id }).lean();
      console.log(`hotelList: ${hotelList}`);
      console.log(hotelList);
      if (hotelList) {
        hotelList.hotels = await hotelMongoStore.getHotelsByHotelListId(hotelList._id.valueOf());
      }
      console.log("hotelListMongoStore getHotelListById completed, returning hotelList");
      return hotelList;
    }
    console.log("hotelListMongoStore getHotelListById completed, returning null");
    return null;
  },

  async addHotelList(hotelList) {
    console.log("hotelListMongoStore addHotelList started");
    const newHotelList = new HotelList(hotelList);
    const hotelListObj = await newHotelList.save();
    console.log("hotelListMongoStore addHotelList completed");
    return this.getHotelListById(hotelListObj._id);
  },

  async getUserHotelLists(id) {
    console.log("hotelListMongoStore getUserHotelLists started");
    const hotelList = await HotelList.find({ userid: id }).lean();
    console.log("hotelListMongoStore getUserHotelLists completed");
    return hotelList;
  },

  async deleteHotelListById(id) {
    console.log("hotelListMongoStore deleteHotelListById started");
    try {
      await HotelList.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
    console.log("hotelListMongoStore deleteHotelListById completed");
  },

  async deleteAllHotelLists() {
    console.log("hotelListMongoStore deleteAllHotelLists started");
    await HotelList.deleteMany({});
    console.log("hotelListMongoStore deleteAllHotelLists completed");
  }
};