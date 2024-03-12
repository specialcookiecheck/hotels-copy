import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const hotelApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi find handler started");
      try {
        const hotels = await db.hotelStore.getAllHotels();
        return hotels;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      console.log("hotelApi findOne handler started");
      try {
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        if (!hotel) {
          return Boom.notFound("No hotel with this id");
        }
        return hotel;
      } catch (err) {
        return Boom.serverUnavailable("No hotel with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi create handler started");
      try {
        const hotel = await db.hotelStore.addHotel(request.params.id, request.payload);
        if (hotel) {
          return h.response(hotel).code(201);
        }
        return Boom.badImplementation("error creating hotel");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi deleteAll handler started");
      try {
        await db.hotelStore.deleteAllHotels();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi deleteOne handler started");
      try {
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        console.log(`hotel: ${hotel}`);
        console.log(hotel);
        if (!hotel) {
          return Boom.notFound("No Hotel with this id");
        }
        await db.hotelStore.deleteHotelById(hotel._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Hotel with this id");
      }
    },
  },
};