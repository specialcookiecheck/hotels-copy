
import { v4 } from "uuid";
import { db } from "./connect.js";
import { deleteCollection } from "./store-utils.js";

export const hotelFirebaseStore = {

  async addHotel(hotelListId, hotel) {
    console.log("hotelFirebaseStore addHotel started");
    console.log(hotel);
    const imageOptions = [
      "https://cdn.stocksnap.io/img-thumbs/960w/hotel-room_DGBAEIS339.jpg",
      "https://cdn.stocksnap.io/img-thumbs/960w/modern-room_ORRHZ1VULX.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2183226477/display_1500/stock-photo-vacation-couple-on-the-beach-near-swimming-pool-luxury-travel-2183226477.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1964198212/display_1500/stock-photo-asian-girl-receptionist-and-caucasian-woman-traveler-checking-or-checkout-in-hotel-1964198212.jpg",
      "https://cdn.stocksnap.io/img-thumbs/960w/resort-leisure_9IRWVX4JZL.jpg"
    ]
    const randomImageURL = imageOptions[Math.floor(Math.random() * imageOptions.length)];
    console.log(randomImageURL);
    hotel.imageURL = randomImageURL;
    const hotelId = v4();
    hotel._id = hotelId;
    hotel.hotelListid = hotelListId;
    hotel = Object.setPrototypeOf(hotel, Object.prototype);
    try{
      await db.collection("hotels").doc(hotelId).set(hotel);
    } catch(error) {
      console.log(error);
    }
    console.log("userFirebaseStore addHotel completed");
    return hotel;
  },

  
  async updateHotel(hotelId, hotel) {
    console.log("hotelFirebaseStore updateHotel started");
    console.log("logging hotel")
    console.log(hotel);
    console.log("hotel logged");
    try{
      console.log("adding updated hotel to database");
      await db.collection("hotels").doc(hotelId).set(hotel, {merge: false});
    } catch(error) {
      console.log(error);
    }
    console.log("userFirebaseStore updateHotel completed");
    return hotel;
  },
  

  async addImage(hotelId, imageUrl) {
    console.log("hotelFirebaseStore addImage started");
    const snapshot = await db.collection("hotels").doc(hotelId).get()
    let hotel = snapshot.data();
    console.log(hotel);
    console.log("imageUrl:", imageUrl, typeof imageUrl);
    /*
    const imageOptions = [
      "https://cdn.stocksnap.io/img-thumbs/960w/hotel-room_DGBAEIS339.jpg",
      "https://cdn.stocksnap.io/img-thumbs/960w/modern-room_ORRHZ1VULX.jpg",
      "https://www.shutterstock.com/shutterstock/photos/2183226477/display_1500/stock-photo-vacation-couple-on-the-beach-near-swimming-pool-luxury-travel-2183226477.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1964198212/display_1500/stock-photo-asian-girl-receptionist-and-caucasian-woman-traveler-checking-or-checkout-in-hotel-1964198212.jpg",
      "https://cdn.stocksnap.io/img-thumbs/960w/resort-leisure_9IRWVX4JZL.jpg"
    ]
    const randomImageURL = imageOptions[Math.floor(Math.random() * imageOptions.length)];
    console.log(randomImageURL);
    hotel.imageURL = randomImageURL;
    */
   console.log("adding imageUrlArray");
    if (hotel.imageUrlArray) {
      console.log("hotel.imageURLarray", hotel.imageUrlArray);
      hotel.imageUrlArray.push(imageUrl);
      console.log("hotel.imageURLarray", hotel.imageUrlArray);
    } else {
      hotel.imageUrlArray = [imageUrl]
    }
    console.log("imageUrlArray add completed");
    console.log(hotel);
    hotel = Object.setPrototypeOf(hotel, Object.prototype);
    try{
      console.log("updating hotel db entry");
      await db.collection("hotels").doc(hotelId).set(hotel, { merge: true });
    } catch(error) {
      console.log(error);
    }
    console.log("hotelFirebaseStore addImage completed");
    return hotel;
  },

  async getHotelsByHotelListId(id) {
    console.log(`hotelFirebaseStore getHotelsByHotelListId ${id} started`);
    const hotels = [];
    const snapshot = await db.collection("hotels").where("hotelListid", "==", id).get();
    console.log("snapshot retrieved");
    snapshot.forEach((doc) => {
      console.log(`doc: ${doc}`);
      console.log(doc.id, "=>", doc.data());
      hotels.push(doc.data());
    });
    console.log(hotels);
    console.log("hotelFirebaseStore getHotelsByHotelListId completed");
    return hotels;
  },

  async getAllHotels() {
    console.log("hotelFirebaseStore getAllHotels started");
    const returnedHotels = [];
    const snapshot = await db.collection("hotels").get();
    snapshot.forEach((doc) => {
      console.log(`doc: ${doc}`);
      console.log(doc.id, "=>", doc.data());
      returnedHotels.push(doc.data());
    });
    console.log(returnedHotels);
    console.log("hotelFirebaseStore getAllHotels completed");
    return returnedHotels;
  },

  async getHotelById(id) {
    console.log("hotelFirebaseStore getHotelById started");
    if (id) {
    console.log(`id: ${id}`);
    console.log(`typeof id: ${typeof id}`);
    let returnedHotel;
    try {
      const snapshot = await db.collection("hotels").doc(id).get();
      if (!snapshot.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", snapshot.data());
        returnedHotel = snapshot.data();
      }
    } catch(error) {
      console.log(error);
    }
    console.log("returnedHotel returned");
    console.log(`returnedHotel: ${returnedHotel}`);
    if (returnedHotel === undefined) {
      console.log("hotelFirebaseStore getHotelById undefined, returning null");
      return null
    }
    console.log("hotelFirebaseStore getHotelById completed, returning hotel");
    return returnedHotel;
    }
    console.log("hotelFirebaseStore getHotelById completed, returning null");
    return null
  },

  async deleteHotelById(id) {
    console.log("hotelFirebaseStore deleteHotelById started");
    try {
      await db.collection("hotels").doc(id).delete();
      console.log("document deleted");
    } catch (error) {
      console.log("delete not successful");
      console.log(error);
    }
    console.log("hotelFirebaseStore deleteHotelById completed");
  },

  async deleteAllHotels() {
    console.log("hotelFirebaseStore deleteAllHotels started");
    await deleteCollection(db, "hotels", 100);
    console.log("hotelFirebaseStore deleteAllHotels completed");
  },
  /*
  async updateHotel(hotelId, updatedHotel) {
    console.log("hotelFirebaseStore updateHotel started");
    await db.collection("hotels").doc(hotelId).update(updatedHotel);
    // hotel.name = updatedHotel.name;
    // hotel.city = updatedHotel.city;
    // hotel.airport = updatedHotel.airport;
    console.log("hotelFirebaseStore updateHotel completed"); 
  },
  */
}
