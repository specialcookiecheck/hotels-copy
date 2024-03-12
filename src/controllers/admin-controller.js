import { db } from "../models/db.js";
import { getDatabaseCount } from "../models/firebase/store-utils.js";
import { HotelAdminSpec, UserSpec, HotelListSpec, HotelSpec } from "../models/joi-schemas.js";


export const adminController = {
    index: {
      handler: async function (request, h) {
        console.log("adminController index handler started")
        const loggedInUser = request.auth.credentials;
        const geoAPIKey = process.env.GEO_API_KEY;
        const allHotels = await db.hotelStore.getAllHotels();
        const userCount = await getDatabaseCount("users");
        const hoteListCount = await getDatabaseCount("hotelLists");
        const hotelCount = await getDatabaseCount("hotels");
        const viewData = {
          title: "Admin Dashboard",
          userCount: userCount,
          hoteListCount: hoteListCount,
          hotelCount: hotelCount,
          hotels: allHotels,
          geoAPIKey: geoAPIKey,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController index handler completed, returning")
        return h.view("admin-dashboard-view", viewData);
      },
    },

    listAllUsersIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllUsersIndex handler started")
        const userList = await db.userStore.getAllUsers();
        const viewData = {
          title: "Admin All Users",
          userList: userList,
        };
        const loggedInUser = request.auth.credentials;
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllUsersIndex handler completed, returning")
        return h.view("admin-users-view", viewData);
      },
    },

    editUserIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllUsersIndex handler started")
        const loggedInUser = request.auth.credentials;
        const user = await db.userStore.getUserById(request.params.id);
        const viewData = {
          title: `Edit User ${user.email}`,
          user: user,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllUsersIndex handler completed, returning")
        return h.view("admin-edit-user-view", viewData);
      },
    },

    listAllHotelListsIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllHotelListsIndex handler started")
        const loggedInUser = request.auth.credentials;
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        console.log("hotelLists:");
        console.log(hotelLists);
        const viewData = {
          title: "Admin All Hotel Lists",
          hotelLists: hotelLists,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllHotelListsIndex handler completed, returning")
        return h.view("admin-hotel-lists-view", viewData);
      },
    },

    hotelListIndex: {
      handler: async function (request, h) {
          console.log("adminController hotelListIndex handler started")
          const hotelList = await db.hotelListStore.getHotelListById(request.params.id);
          hotelList.hotels = await db.hotelStore.getHotelsByHotelListId(request.params.id);
          console.log(`hotelList: ${hotelList}`);
          // console.log(hotelList); // for testing
          const viewData = {
              title: "HotelList",
              hotelList: hotelList,
              listId: request.params.id,
              hotels: hotelList.hotels,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          // console.log(`viewData listId: ${viewData.listId}`); // for testing
          console.log("adminController hotelListIndex handler completed");
        return h.view("admin-hotel-list-view", viewData);
      },
    },

    listAllHotelsIndex: {
      handler: async function (request, h) {
        console.log("adminController listAllHotelsIndex handler started")
        const loggedInUser = request.auth.credentials;
        const geoAPIKey = process.env.GEO_API_KEY;
        const hotelLists = await db.hotelListStore.getAllHotelLists();
        for (let i = 0; i < hotelLists.length; i++) {
          console.log(`i: ${i}`);
          console.log(hotelLists[i]._id);
          hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id); // necessary to make sure database provides all values in time
          hotelLists[i].user = await db.userStore.getUserByEmail(loggedInUser.email); // necessary to make sure database provides all values in time
          console.log(hotelLists[i]);
        }
        const viewData = {
          title: "Admin All Hotels",
          hotelLists: hotelLists,
          displayHotels: true,
          displayListDetails: true,
          geoAPIKey: geoAPIKey,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listAllHotelsIndex handler completed, returning")
        return h.view("admin-hotels-view", viewData);
      },
    },

    listOnlyHotelsIndex: {
      handler: async function (request, h) {
        console.log("adminController listOnlyHotelsIndex handler started")
        const loggedInUser = request.auth.credentials;
        const geoAPIKey = process.env.GEO_API_KEY;
        const hotels = await db.hotelStore.getAllHotels();
        const viewData = {
          title: "Admin Only Hotels",
          displayHotels: true,
          hotels: hotels,
          geoAPIKey: geoAPIKey,
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
        }
        console.log("adminController listOnlyHotelsIndex handler completed, returning")
        return h.view("admin-hotels-only-view", viewData);
      },
    },

    addHotel: {
      validate: {
        payload: HotelAdminSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addHotel failAction started");
          console.log(request.params);
          const hotelLists = await db.hotelListStore.getAllHotelLists();
          const geoAPIKey = process.env.GEO_API_KEY;
          for (let i = 0; i < hotelLists.length; i++) {
            hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id); // necessary to make sure database provides all values in time
          }
          const viewData = {
              title: "Add hotel error",
              hotelLists: hotelLists,
              hotels: await db.hotelStore.getAllHotels(),
              errors: error.details,
              displayHotels: true,
              geoAPIKey: geoAPIKey,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          console.log(`viewData listId: ${viewData.listId}`);
          console.log("adminController addHotel failAction completed, returning");
          return h.view( "admin-hotels-only-view", viewData ).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          console.log("adminController addHotel handler started");
          let hotelList;
          if (request.payload.hotelListTitle) {
            hotelList = await db.hotelListStore.getHotelListByTitle(request.payload.hotelListTitle);
          };
          if (request.params.hotellistid) {
            hotelList = await db.hotelListStore.getHotelListById(request.params.hotellistid);
          }
          console.log(hotelList);
          if (hotelList === null) {
            console.log(`unknown hotelList: ${request.payload.hotelListTitle}`);
            let user = await db.userStore.getUserByEmail(request.payload.userEmail);
            if (user === null) {
              console.log(`unknown user, adding user ${request.payload.userEmail}`);
              user = await db.userStore.addUser({email: request.payload.userEmail});
            }
            const newHotelList = {
              userid: user._id,
              title: request.payload.hotelListTitle,
            }
            console.log(`unknown hotelList, adding hotelList ${request.payload.hotelListTitle}`);
            hotelList = await db.hotelListStore.addHotelList(newHotelList);
          }
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
          console.log(`newHotel: ${newHotel}`);
          console.log(newHotel);
          await db.hotelStore.addHotel(hotelList._id, newHotel);
          // hotelListController.index();
          console.log("adminController addHotel handler completed, returning");
          return h.redirect("/admin/hotels");
      },
    },

    addHotelToExistingList: {
      validate: {
        payload: HotelSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addHotelToExistingList failAction started");
          console.log(request.params);
          const hotelLists = await db.hotelListStore.getAllHotelLists();
          for (let i = 0; i < hotelLists.length; i++) {
            hotelLists[i].hotels = await db.hotelStore.getHotelsByHotelListId(hotelLists[i]._id); // necessary to make sure database provides all values in time
          }
          const viewData = {
              title: "Add hotel error",
              hotelLists: hotelLists,
              errors: error.details,
              displayHotels: true,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          console.log(`viewData listId: ${viewData.listId}`);
          console.log("adminController addHotelToExistingList failAction completed, returning");
          return h.view( "admin-hotels-view", viewData ).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          console.log("adminController addHotelToExistingList handler started");
          console.log(request.params);
          const newHotel = {
              name: request.payload.name,
              city: request.payload.city,
              country: request.payload.country,
          };
          console.log(`newHotel: ${newHotel}`);
          console.log(newHotel);
          await db.hotelStore.addHotel(request.params.hotellistid, newHotel);
          // hotelListController.index();
          console.log("adminController addHotelToExistingList handler completed, returning");
          return h.redirect(`/admin/hotellists/hotellist/${request.params.hotellistid}`);
      },
    },


    addUser: {
      validate: {
        payload: UserSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addUser failAction started")
          const userList = await db.userStore.getAllUsers();
          console.log("Setting viewData");
          const viewData = {
            title: "Add user error",
            userList: userList,
            errors: error.details,
          };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
            viewData.admin = true;
          }
          console.log("adminController addUser failAction completed, returning")
          return h.view("admin-users-view", viewData ).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          console.log("adminController addUser handler started")
          const user = request.payload;
          await db.userStore.addUser(user);
          console.log("adminController addUser handler completed, returning")
          return h.redirect("/admin/users");
      },
    },

    addHotelList: {
      validate: {
        payload: HotelListSpec,
        options: { abortEarly: false },
        failAction: async function (request, h, error) {
          console.log("adminController addHotelList failAction started");
          const hotelLists = await db.hotelListStore.getAllHotelLists();
          console.log(`hotelLists: ${hotelLists}`);
          const viewData = {
              title: "Add HotelList error",
              hotelLists: hotelLists,
              errors: error.details,
            };
          const loggedInUser = request.auth.credentials;
          if (loggedInUser.email === process.env.ADMIN_EMAIL) {
              viewData.admin = true;
          }
          console.log("adminController addHotelList failAction completed, returning");
          return h.view("admin-hotel-lists-view", viewData).takeover().code(400);
        },
      },
      handler: async function (request, h) {
        console.log("adminController addHotelList handler started");
        const userEmail = request.payload.email;
        console.log(`userEmail: ${userEmail}`);
        let user = await db.userStore.getUserByEmail(userEmail);
            if (user === null) {
              console.log(`unknown user, adding user ${userEmail}`);
              user = await db.userStore.addUser({email: userEmail});
            }
        const newHotelList = {
          userid: user._id,
          title: request.payload.title,
        };
        // console.log("adminController newHotelList payload loaded");
        await db.hotelListStore.addHotelList(newHotelList);
        console.log("adminController addHotelList handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },

    deleteHotel: {
      handler: async function(request, h) {
        console.log("adminController deleteHotel handler started");
        console.log(`request.params.id: ${request.params.id}`);
        const hotel = await db.hotelStore.getHotelById(request.params.id);
        await db.hotelStore.deleteHotelById(request.params.id);
        console.log("adminController deleteHotel handler completed, returning");
        return h.redirect("/admin/hotels");
      },
    },

    deleteUser: {
      handler: async function(request, h) {
        console.log("adminController deleteHotel handler started");
        console.log(`request.params.id: ${request.params.id}`);
        console.log("checking for hotelLists to be deleted")
        const hotelListsToBeDeleted = await db.hotelListStore.getUserHotelLists(request.params.id);
        for (let i = 0; i < hotelListsToBeDeleted.length; i++) {
          console.log("checking for hotels to be deleted")
          const hotelsToBeDeleted = await db.hotelStore.getHotelsByHotelListId(hotelListsToBeDeleted[i]._id); // necessary to make sure database provides all values in time
          for (let j = 0; i < hotelsToBeDeleted.length; j++) {
            console.log(`deleting hotel: ${hotelsToBeDeleted[j]._id}`);
            await db.hotelStore.deleteHotelById(hotelsToBeDeleted[j]._id); // necessary to make sure database provides all values in time
          }
          console.log("hotelsToBeDeleted completed, deleting list");
          console.log(`deleting hotelList: ${hotelListsToBeDeleted[i]._id}`);
          await db.hotelStore.deleteHotelById(hotelListsToBeDeleted[i]._id); // necessary to make sure database provides all values in time
        }
        console.log("hotelListsToBeDeleted completed, deleting list");
        await db.userStore.deleteUserById(request.params.id);
        console.log("adminController deleteHotel handler completed, returning");
        return h.redirect("/admin/users");
      },
    },

    deleteHotelList: {
      handler: async function (request, h) {
        console.log("adminController deleteHotelList handler started");
        console.log(`request.params.id: ${request.params.id}`);
        console.log("checking for hotels to be deleted")
        const hotelsToBeDeleted = await db.hotelStore.getHotelsByHotelListId(request.params.id);
        for (let i = 0; i < hotelsToBeDeleted.length; i++) {
          console.log(`deleting hotel: ${hotelsToBeDeleted[i]._id}`);
          await db.hotelStore.deleteHotelById(hotelsToBeDeleted[i]._id); // necessary to make sure database provides all values in time
        }
        console.log("hotelsToBeDeleted completed, deleting list");
        await db.hotelListStore.deleteHotelListById(request.params.id);
        console.log("adminController deleteHotelList handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },

    deleteAllHotels: {
      handler: async function(request, h) {
        console.log("adminController deleteAllHotels handler started");
        await db.hotelStore.deleteAllHotels();
        console.log("adminController deleteAllHotels handler completed, returning");
        return h.redirect("/admin/hotels");
      },
    },

    deleteAllUsers: {
      handler: async function(request, h) {
        console.log("adminController deleteAllUsers handler started");
        await db.hotelStore.deleteAllHotels();
        await db.hotelListStore.deleteAllHotelLists();
        await db.userStore.deleteAllUsers();
        console.log("adminController deleteAllUsers handler completed, returning");
        return h.redirect("/");
      },
    },

    deleteAllHotelLists: {
      handler: async function (request, h) {
        console.log("adminController deleteAllHotelLists handler started");
        await db.hotelStore.deleteAllHotels();
        await db.hotelListStore.deleteAllHotelLists();
        console.log("adminController deleteAllHotelLists handler completed, returning");
        return h.redirect("/admin/hotellists");
      },
    },
  };