
import { v4 } from "uuid";
import { db } from "./connect.js";
import { hotelFirebaseStore } from "./hotel-firebase-store.js";
import { deleteCollection } from "./store-utils.js";


export const hotelListFirebaseStore = {

  async getUserHotelLists(userid) {
    console.log("hotelListFirebaseStore getUserHotelLists started");
    const userHotelLists = [];
    const snapshot = await db.collection("hotelLists").where("userid", "==", userid).get();
    console.log("snapshot retrieved");
    snapshot.forEach((doc) => {
      console.log(`doc: ${doc}`);
      console.log(doc.id, "=>", doc.data());
      userHotelLists.push(doc.data());
    });
    console.log(userHotelLists);
    console.log("hotelListFirebaseStore getUserHotelLists completed");
    return userHotelLists;
  },

  async addHotelList(hotelList) {
    console.log("hotelListFirebaseStore addHotelList started");
    const hotelListId = v4();
    hotelList._id = hotelListId;
    hotelList = Object.setPrototypeOf(hotelList, Object.prototype);
    try{
      await db.collection("hotelLists").doc(hotelListId).set(hotelList);
    } catch(error) {
      console.log(error);
    }
    console.log("hotelListFirebaseStore addHotelList completed");
    return hotelList;
  },

  async getHotelListById(id) {
    console.log("hotelListFirebaseStore getHotelListById started");
    let list;
    try {
      const snapshot = await db.collection("hotelLists").doc(id).get();
      if (!snapshot.exists) {
        console.log("No such document!");
      } else {
        // console.log("Document data:", snapshot.data());
        list = snapshot.data();
      }
    } catch(error) {
      console.log(error);
    }
    if (list) {
      console.log(list);
      console.log("list retrieved, getting hotels");
      list.hotels = await hotelFirebaseStore.getHotelsByHotelListId(list._id);
    } else {
      list = null;
    }
    console.log("hotelListFirebaseStore getHotelListById completed");
    return list;
  },

  async getHotelListByTitle(title) {
    console.log("hotelListFirebaseStore getHotelListByTitle started");
    let list;
    try {
      const snapshot = await db.collection("hotelLists").where("title", "==", title).get();
      if (!snapshot.exists) {
        console.log("No such document!");
      } else {
        // console.log("Document data:", snapshot.data());
        list = snapshot.data();
      }
    } catch(error) {
      console.log(error);
    }
    if (list) {
      console.log(list);
      console.log("list retrieved, getting hotels");
      list.hotels = await hotelFirebaseStore.getHotelsByHotelListId(list._id);
    } else {
      list = null;
    }
    console.log("hotelListFirebaseStore getHotelListByTitle completed");
    return list;
  },

  async getAllHotelLists() {
    console.log("hotelListFirebaseStore getAllHotelLists started");
    const list = [];
    const snapshot = await db.collection("hotelLists").get();
    snapshot.forEach((doc) => {
      console.log(`doc: ${doc}`);
      console.log(doc.id, "=>", doc.data());
      list.push(doc.data());
    });
    console.log("list:")
    console.log(list);
    console.log("hotelListFirebaseStore getAllHotelLists completed");
    return list;
  },

  async deleteHotelListById(id) {
    console.log("hotelListFirebaseStore deleteHotelListById started");
    try {
      await db.collection("hotelLists").doc(id).delete();
      console.log("document deleted");
    } catch (error) {
      console.log("delete not successful");
      console.log(error);
    }
    console.log("hotelListFirebaseStore deleteHotelListById completed");
  },

  async deleteAllHotelLists() {
    console.log("hotelListFirebaseStore deleteAllHotelLists started");
    await deleteCollection(db, "hotelLists", 100);
    console.log("hotelListFirebaseStore deleteAllHotelLists completed");
  },
};

