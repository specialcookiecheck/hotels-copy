import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const hotelListApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        return hotelLists;
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
      try {
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        if (!hotelList) {
          return Boom.notFound("No HotelList with this id");
        }
        return hotelList;
      } catch (err) {
        return Boom.serverUnavailable("No HotelList with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const hotelList = request.payload;
        const newHotelList = await db.hotelListStore.addHotelList(hotelList);
        if (newHotelList) {
          return h.response(newHotelList).code(201);
        }
        return Boom.badImplementation("error creating hotelList");
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
      try {
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        if (!hotelList) {
          return Boom.notFound("No HotelList with this id");
        }
        await db.hotelListStore.deleteHotelListById(hotelList._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No HotelList with this id");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.hotelListStore.deleteAllHotelLists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};