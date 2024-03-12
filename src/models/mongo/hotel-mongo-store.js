import { Hotel } from "./hotel.js";

export const hotelMongoStore = {
  async getAllHotels() {
    console.log("hotelMongoStore getAllHotels started");
    const hotels = await Hotel.find().lean();
    console.log("hotelMongoStore getAllHotels completed");
    return hotels;
  },

  async addHotel(hotelListId, hotel) {
    console.log("hotelMongoStore addHotel started");
    hotel.HotelList = hotelListId;
    const newHotel = new Hotel(hotel);
    console.log(`newHotel: ${newHotel}`);
    const hotelObj = await newHotel.save();
    console.log("hotelMongoStore addHotel completed");
    return this.getHotelById(hotelObj._id);
  },

  async getHotelsByHotelListId(id) {
    console.log("hotelMongoStore getHotelsByHotelListId started");
    const hotels = await Hotel.find({ HotelList: id }).lean();
    console.log("hotelMongoStore getHotelsByHotelListId completed");
    return hotels;
  },

  async getHotelById(id) {
    console.log("hotelMongoStore getHotelById started");
    if (id) {
      const hotel = await Hotel.findOne({ _id: id }).lean();
      return hotel;
    }
    console.log("hotelMongoStore getHotelById completed");
    return null;
  },

  async deleteHotelById(id) {
    console.log("hotelMongoStore deleteHotelById started");
    try {
      await Hotel.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
    console.log("hotelMongoStore deleteHotelById completed");
  },

  async deleteAllHotels() {
    console.log("hotelMongoStore deleteAllHotels started");
    await Hotel.deleteMany({});
    console.log("hotelMongoStore deleteAllHotels completed");
  },

  async updateHotel(hotel, updatedHotel) {
    console.log("hotelMongoStore updateHotel started");
    const hotelDoc = await Hotel.findOne({ _id: hotel._id });
    hotelDoc.title = updatedHotel.title;
    hotelDoc.artist = updatedHotel.artist;
    hotelDoc.duration = updatedHotel.duration;
    await hotelDoc.save();
    console.log("hotelMongoStore updateHotel completed");
  },
};