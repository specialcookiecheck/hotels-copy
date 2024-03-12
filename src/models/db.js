import { userMemStore } from "./mem/user-mem-store.js";
import { hotelListMemStore } from "./mem/hotel-list-mem-store.js";
import { hotelMemStore } from "./mem/hotel-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { hotelListJsonStore } from "./json/hotel-list-json-store.js";
import { hotelJsonStore } from "./json/hotel-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { hotelListMongoStore } from "./mongo/hotel-list-mongo-store.js";
import { hotelMongoStore } from "./mongo/hotel-mongo-store.js";

import { connectFirebase } from "./firebase/connect.js";
import { userFirebaseStore } from "./firebase/user-firebase-store.js";
import { hotelListFirebaseStore } from "./firebase/hotel-list-firebase-store.js";
import { hotelFirebaseStore } from "./firebase/hotel-firebase-store.js";



export const db = {
  userStore: null,
  hotelListStore: null,
  hotelStore: null,

  init(dbType) {
    switch (dbType) {
      case "json":
        this.userStore = userJsonStore;
        this.hotelListStore = hotelListJsonStore; 
        this.hotelStore = hotelJsonStore; 
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.hotelListStore = hotelListMongoStore;
        this.hotelStore = hotelMongoStore;
        connectMongo();
        break;
      case "firebase": 
        this.userStore = userFirebaseStore;
        this.hotelListStore = hotelListFirebaseStore;
        this.hotelStore = hotelFirebaseStore;
        connectFirebase();
        break;
      default:
        this.userStore = userMemStore;
        this.hotelListStore = hotelListMemStore;
        this.hotelStore = hotelMemStore;
    }
  },
};