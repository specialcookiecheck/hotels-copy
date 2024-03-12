import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { hotelListController } from "./controllers/hotel-list-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addhotellist", config: dashboardController.addHotelList },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/users", config: adminController.listAllUsersIndex },
  { method: "GET", path: "/admin/hotellists", config: adminController.listAllHotelListsIndex },
  { method: "GET", path: "/admin/hotellists/hotellist/{id}", config: adminController.hotelListIndex },
  { method: "GET", path: "/admin/hotels", config: adminController.listOnlyHotelsIndex },
  { method: "GET", path: "/admin/hotels/hotelswithlist", config: adminController.listAllHotelsIndex },
  { method: "GET", path: "/admin/users/user/{id}", config: adminController.editUserIndex },
  { method: "POST", path: "/admin/hotels/addhotel", config: adminController.addHotel },
  { method: "POST", path: "/admin/hotellists/{hotellistid}/addhotel", config: adminController.addHotelToExistingList },
  { method: "POST", path: "/admin/users/adduser", config: adminController.addUser },
  { method: "POST", path: "/admin/hotellists/addhotellist", config: adminController.addHotelList },
  { method: "GET", path: "/admin/hotellists/deletehotellist/{id}", config: adminController.deleteHotelList },
  { method: "GET", path: "/admin/users/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/admin/hotels/deletehotel/{id}", config: adminController.deleteHotel },
  { method: "GET", path: "/admin/hotellists/hotellist/{hotellistid}/deletehotel/{id}", config: adminController.deleteHotel },
  { method: "GET", path: "/admin/hotellists/deleteallhotellists", config: adminController.deleteAllHotelLists },
  { method: "GET", path: "/admin/users/deleteallusers", config: adminController.deleteAllUsers },
  { method: "GET", path: "/admin/hotels/deleteallhotels", config: adminController.deleteAllHotels },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/account/{id}", config: accountsController.accountIndex },
  { method: "GET", path: "/account/{id}/deleteuser", config: accountsController.deleteUser },
  { method: "POST", path: "/account/{id}/updateuser", config: accountsController.updateUser },

  { method: "GET", path: "/hotellist/{id}", config: hotelListController.index },
  { method: "POST", path: "/hotellist/{id}/addhotel", config: hotelListController.addHotel },

  { method: "GET", path: "/dashboard/deletehotellist/{id}", config: dashboardController.deleteHotelList },
  { method: "GET", path: "/hotellist/{id}/deletehotel/{hotelid}", config: hotelListController.deleteHotel },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } } // wild card pattern for images
];