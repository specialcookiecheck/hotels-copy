import { v4 } from "uuid";
import { db } from "./connect.js";
import { deleteCollection } from "./store-utils.js";


export const userFirebaseStore = {

  async addUser(user) {
    console.log(`userFirebaseStore addUser ${user.email} started`);
    const userId = v4();
    user._id = userId;
    user = Object.setPrototypeOf(user, Object.prototype);
    try{
      await db.collection("users").doc(userId).set(user);
    } catch(error) {
      console.log(error);
    }
    console.log(`userFirebaseStore addUser ${user.email} completed`);
    return user;
  },

  async getUserById(id) {
    console.log("userFirebaseStore getUserById started");
    if (id) {
    console.log(`id: ${id}`);
    console.log(`typeof id: ${typeof id}`);
    let returnedUser;
    try {
      const snapshot = await db.collection("users").doc(id).get();
      if (!snapshot.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", snapshot.data());
        returnedUser = snapshot.data();
      }
    } catch(error) {
      console.log(error);
    }
    console.log("user returned");
    console.log(`returnedUser: ${returnedUser}`);
    if (returnedUser === undefined) {
      console.log("userFirebaseStore getUserById undefined, returning null");
      return null
    }
    console.log("userFirebaseStore getUserById completed, returning user");
    return returnedUser;
    }
    console.log("userFirebaseStore getUserById completed, returning null");
    return null
  },

  async getUserByEmail(email) {
    console.log("userFirebaseStore getUserByEmail started");
    let returnedUser;
    const snapshot = await db.collection("users").where("email", "==", email).get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      returnedUser = doc.data()
    });
    console.log(`returnedUser: ${returnedUser}`);
    console.log(returnedUser);
    if (returnedUser === undefined) {
      console.log("userMongoStore getUserById undefined, returning null");
      return null
    }
    console.log("userFirebaseStore getUserById completed, returning user");
    return returnedUser;
  },

  async getAllUsers() {
    console.log("userFirebaseStore getAllUsers started");
    const returnedUsers = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      console.log(`doc: ${doc}`);
      console.log(doc.id, "=>", doc.data());
      returnedUsers.push(doc.data());
    });
    console.log(returnedUsers);
    console.log("userFirebaseStore getAllUsers completed");
    return returnedUsers;
  },

  async updateUserById(updatedUser, id) {
    console.log("userFirebaseStore updateUserById started");
    try {
      await db.collection("users").doc(id).update(updatedUser);
      console.log("document updated");
    } catch (error) {
      console.log("update not successful");
      console.log(error);
    }
    console.log("userFirebaseStore updateUserById completed");
  },

  async deleteUserById(id) {
    console.log("userFirebaseStore deleteUserById started");
    try {
      await db.collection("users").doc(id).delete();
      console.log("document deleted");
    } catch (error) {
      console.log("delete not successful");
      console.log(error);
    }
    console.log("userFirebaseStore deleteUserById completed");
  },

  async deleteAllUsers() {
    console.log("userFirebaseStore deleteAllUsers started");
    await deleteCollection(db, "users", 100);
    console.log("userFirebaseStore deleteAllUsers completed");
  },
};