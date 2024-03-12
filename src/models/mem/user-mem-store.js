import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    console.log("getAllUsers started");
    console.log("getAllUsers completed");
    return users;
  },

  async addUser(user) {
    console.log("addUser started");
    user._id = v4();
    users.push(user);
    console.log("addUser completed");
    return user;
  },

  async getUserById(id) {
    console.log("getUserById started");
    let returnedUser = users.find((user) => user._id === id);
    console.log(returnedUser);
    if (returnedUser === undefined) returnedUser = null;
    console.log("getUserById completed");
    return returnedUser
  },

  async getUserByEmail(email) {
    console.log("getUserByEmail started");
    let returnedUser = users.find((user) => user.email === email);
    console.log(returnedUser);
    // console.log(`returnedUser: ${returnedUser}`); // adding this will generated an error (because of '[Object: null prototype]?)'
    if (returnedUser === undefined) returnedUser = null;
    console.log("getUserByEmail completed");
    return returnedUser;
  },

  async deleteUserById(id) {
    console.log("deleteUserById started");
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
    console.log("deleteUserById completed");
  },


  async deleteAllUsers() {
    console.log("deleteAllUsers started");
    users = [];
    console.log("deleteAllUsers completed");
  },
};