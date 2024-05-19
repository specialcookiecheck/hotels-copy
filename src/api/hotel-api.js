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
    tags: ["api"],
    description: "Get all hotelsvApi",
    notes: "Returns details of all hotels Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Get a specifc hotel Api",
    notes: "Returns details of a specific hotel Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Add a specifc hotel Api",
    notes: "Add details of a specific hotel Api",
    // response: { schema: UserArray, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi update handler started");
      try {
        console.log("request.params.id", request.params.id);
        console.log("request.payload", request.payload);
        const hotel = await db.hotelStore.updateHotel(request.params.id, request.payload);
        if (hotel) {
          return h.response(hotel).code(201);
        }
        return Boom.badImplementation("error updating hotel");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update specifc hotel Api",
    notes: "Update details of a specific hotel Api",
    // response: { schema: UserArray, failAction: validationError },
  },

  addImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("hotelApi addImage handler started");
      try {
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        console.log(`hotel: ${hotel}`);
        console.log(hotel);
        if (!hotel) {
          return Boom.notFound("No Hotel with this id");
        }
        console.log(request.params.id);
        console.log("request.payload:", request.payload, typeof request.payload);
        await db.hotelStore.addImage(request.params.id, request.payload.hotelImage);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Hotel with this id");
      }
    },
    tags: ["api"],
    description: "Add image to hotel Api",
    notes: "Add image to a specific hotel Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all hotels Api",
    notes: "Delete all hotels Api",
    // response: { schema: UserArray, failAction: validationError },
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
    tags: ["api"],
    description: "Delete a specifc hotel Api",
    notes: "Delete a specific hotel Api",
    // response: { schema: UserArray, failAction: validationError },
  },
};