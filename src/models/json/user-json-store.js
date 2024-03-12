import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const userJsonStore = {
  async getAllUsers() {
    console.log("userJsonStore getAllUsers started");
    await db.read();
    console.log("userJsonStore getAllUsers completed");
    return db.data.users;
  },

  async addUser(user) {
    console.log("userJsonStore addUser started");
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    console.log("userJsonStore addUser completed");
    return user;
  },

  async getUserById(id) {
    console.log("userJsonStore deleteUserById started");
    await db.read();
    let returnableUser = db.data.users.find((user) => user._id === id);
    if (returnableUser === undefined) returnableUser = null;
    console.log("userJsonStore deleteUserById completed");
    return returnableUser;
  },

  async getUserByEmail(email) {
    console.log("userJsonStore getUserByEmail started");
    await db.read();
    let returnableUser = db.data.users.find((user) => user.email === email);
    if (returnableUser === undefined) returnableUser = null;
    console.log("userJsonStore getUserByEmail completed");
    return returnableUser;
  },

  async deleteUserById(id) {
    console.log("userJsonStore deleteUserById started");
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    // console.log(`index: ${index}`); // for testing
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
    console.log("userJsonStore deleteUserById completed");
  },

  async deleteAllUsers() {
    console.log("userJsonStore deleteAllUsers started");
    db.data.users = [];
    await db.write();
    console.log("userJsonStore deleteAllUsers completed");
  },
};