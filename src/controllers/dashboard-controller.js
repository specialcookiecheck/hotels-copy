import { db } from "../models/db.js";
import { HotelListSpec } from "../models/joi-schemas.js";

export const dashboardController = {

  index: {
    handler: async function (request, h) {
      console.log("dashboardController index handler started");
      const loggedInUser = request.auth.credentials;
      console.log(loggedInUser);
      const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id);
      const hotels = [];
      for (let i = 0; i < hotelLists.length; i++) {
        console.log("i-loop running");
        console.log(hotelLists[i]);
        hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id);
        for (let j = 0; j < hotelLists[i].hotels.length; j++) {
          console.log("j-loop running");
          console.log(hotelLists[i].hotels[j]);
          hotels.push(hotelLists[i].hotels[j]);
        }
      };
      console.log("hotels loaded, logging hotels");
      console.log(hotels);
      const viewData = {
        title: "Hotel Dashboard",
        user: loggedInUser,
        hotelLists: hotelLists,
        hotels: hotels,
      };
      if (loggedInUser.email === process.env.ADMIN_EMAIL) {
        viewData.admin = true;
      }
      console.log("dashboardController index handler completed, returning")
      return h.view("dashboard-view", viewData);
    },
  },

  addHotelList: {
    validate: {
      payload: HotelListSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        console.log("dashboardController addHotelList failAction started");
        const loggedInUser = request.auth.credentials;
        const hotelLists = await db.hotelListStore.getUserHotelLists(loggedInUser._id);
        console.log(`hotelLists: ${hotelLists}`);
        const viewData = {
            title: "Add HotelList error",
            hotelLists: hotelLists,
            errors: error.details,
            user: loggedInUser,
        };
        console.log("dashboardController addHotelList failAction completed, returning");
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      console.log("dashboardController addHotelList handler started");
      const newHotelList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      // console.log("dashboardController newHotelList payload loaded");
      await db.hotelListStore.addHotelList(newHotelList);
      console.log("dashboardController addHotelList handler completed, returning");
      return h.redirect("/dashboard");
    },
  },

  deleteHotelList: {
    handler: async function (request, h) {
      console.log("dashboardController deleteHotelList handler started");
      const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
      console.log("checking for hotels to be deleted")
        const hotelsToBeDeleted = await db.hotelStore.getHotelsByHotelListId(request.params.id);
        for (let i = 0; i < hotelsToBeDeleted.length; i++) {
          console.log(`deleting hotel: ${hotelsToBeDeleted[i]._id}`);
          await db.hotelStore.deleteHotelById(hotelsToBeDeleted[i]._id);
        }
      console.log("hotelsToBeDeleted completed, deleting list");
      await db.hotelListStore.deleteHotelListById(hotelList._id);
      console.log("dashboardController deleteHotelList handler completed, returning");
      return h.redirect("/dashboard");
    },
  },
};