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
    tags: ["api"],
    description: "Get all hotelLists Api",
    notes: "Returns details of all hotelLists Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get a specifc hotelList Api",
    notes: "Returns detail of all specific hotelList Api",
    // response: { schema: UserArray, failAction: validationError },
  },

  listHotelsByHotelListId: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      console.log("hotelListApi listHotelsByHotelListId handler started");
      try {
        const hotels = await db.hotelStore.getHotelsByHotelListId(request.params.id);
        if (!hotels) {
          return Boom.notFound("No hotels with this hotelListId");
        }
        return hotels;
      } catch (err) {
        return Boom.serverUnavailable("No hotels with this hotelListId");
      }
    },
    tags: ["api"],
    description: "Get hotels by hotelListId Api",
    notes: "Returns details of hotels by hotelListId Api",
    // response: { schema: UserArray, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        console.log("hotelListApi create handler started");
        console.log("request.payload: ", request.payload);
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
    tags: ["api"],
    description: "Add a hotelList Api",
    notes: "Adds details of all hotelList Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Delete a hotelList Api",
    notes: "Delete a hotelList Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Deletes all hotelLists Api",
    notes: "Deletes all hotelLists Api",
    // response: { schema: UserArray, failAction: validationError },
  },
};