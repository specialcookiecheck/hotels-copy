import { db } from "../models/db.js";
import { HotelSpec } from "../models/joi-schemas.js";

export const hotelListController = {
  index: {
    handler: async function (request, h) {
        console.log("hotelListController index handler started")
        const geoAPIKey = process.env.GEO_API_KEY;
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        hotelList.hotels = await db.hotelStore.getHotelsByHotelListId(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        // console.log(hotelList); // for testing
        const viewData = {
            title: "HotelList",
            hotelList: hotelList,
            listId: request.params.id,
            hotels: hotelList.hotels,
            geoAPIKey: geoAPIKey,
      };
      const loggedInUser = request.auth.credentials;
      if (loggedInUser.email === process.env.ADMIN_EMAIL) {
        viewData.admin = true;
      }
      // console.log(`viewData listId: ${viewData.listId}`); // for testing
      return h.view("hotel-list-view", viewData);
    },
  },

  addHotel: {
    validate: {
      payload: HotelSpec,
      options: { 

        abortEarly: false,
       },
      failAction: async function (request, h, error) {
        console.log("hotelListController addHotel failAction started");
        console.log(request.params);
        const geoAPIKey = process.env.GEO_API_KEY;
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        console.log(`hotelList: ${hotelList}`);
        console.log(hotelList); // for testing
        const viewData = {
            title: "Add hotel error",
            hotelList: hotelList,
            errors: error.details,
            listId: request.params.id,
            geoAPIKey: geoAPIKey,
        };
        console.log(`viewData listId: ${viewData.listId}`);
        console.log("hotelListController addHotel failAction completed, returning");
        return h.view( "hotel-list-view", viewData ).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        console.log("hotelListController addHotel handler started");
        const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
        // console.log(hotelList);
        //  console.log(`hotelList: ${hotelList}`); // for testing
        //  console.log(hotelList); // for testing
        const newHotel = {
            name: request.payload.name,
            city: request.payload.city,
            country: request.payload.country,
            houseNumber: request.payload.houseNumber,
            street: request.payload.street,
            postcode: request.payload.postcode,
            state: request.payload.state,
            longitude: request.payload.longitude,
            latitude: request.payload.latitude,
        };
        console.log(newHotel);
        await db.hotelStore.addHotel(request.params.id, newHotel);
        // hotelListController.index();
        console.log("hotelListController addHotel handler completed, returning");
        return h.redirect(`/hotellist/${request.params.id}`);
    },
  },

  deleteHotel: {
    handler: async function(request, h) {
      console.log("hotelListController deleteHotel handler started");
      console.log(`request.params.id: ${request.params.id}`);
      const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
      console.log(`request.params.hotelid: ${request.params.hotelid}`);
      await db.hotelStore.deleteHotelById(request.params.hotelid);
      console.log("hotelListController deleteHotel handler completed, returning");
      return h.redirect(`/hotellist/${request.params.id}`);
    },
  },
};