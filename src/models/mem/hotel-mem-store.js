import { v4 } from "uuid";

let hotels = [];

export const hotelMemStore = {
  async getAllHotels() {
    console.log("getAllHotels started");
    console.log("getAllHotels completed");
    return hotels;
  },

  async addHotel(hotelListId, hotel) {
    console.log("addHotel started");
    console.log(`hotel: ${hotel}`);
    console.log(hotel);
    hotel._id = v4();
    hotel.hotelListId = hotelListId;
    console.log(`hotel.hotelListId: ${hotelListId}`)
    hotels.push(hotel);
    console.log(`hotels: ${hotels}`);
    // console.log(hotels); // for testing
    console.log("addHotel completed");
    return hotel;
  },

  async getHotelsByHotelListId(id) {
    console.log(`getHotelsByHotelListId started: ${id}`);
    console.log(`hotels: ${hotels}`);
    console.log(hotels); // for testing
    const filteredHotels = hotels.filter((hotel) => hotel.hotelListId === id);
    console.log(`filteredHotels: ${filteredHotels}`);
    console.log(filteredHotels);
    console.log("getHotelsByHotelListId completed");
    return filteredHotels;
  },

  async getHotelById(id) {
    console.log("getHotelById started");
    let returnableHotel = hotels.find((hotel) => hotel._id === id);
    if (returnableHotel === undefined) returnableHotel = null;
    console.log("getHotelById completed");
    return returnableHotel;
  },

  async getHotelListHotels(hotellistId) {
    console.log("getHotelListHotels started");
    console.log("getHotelListHotels completed");
    return hotels.filter((hotel) => hotel.hotellistid === hotellistId);
  },

  async deleteHotelById(id) {
    console.log("deleteHotel started");
    console.log(`hotels: ${hotels}`);
    console.log(hotels);
    const index = hotels.findIndex((hotel) => hotel._id === id);
    console.log(`index to be deleted: ${index}`);
    if (index !== -1) hotels.splice(index, 1);
    console.log(`hotels: ${hotels}`);
    console.log(hotels);
    console.log("deleteHotel completed");
  },

  async deleteAllHotels() {
    console.log("deleteAllHotels started")
    hotels = [];
    console.log("deleteAllHotels completed")
  },

  async updateHotel(hotel, updatedHotel) {
    console.log("updateHotel started");
    hotel.name = updatedHotel.name;
    hotel.city = updatedHotel.city;
    hotel.airport = updatedHotel.airport;
    console.log("updateHotel completed");
  },
};