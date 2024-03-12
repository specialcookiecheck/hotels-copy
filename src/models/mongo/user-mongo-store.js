import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    console.log("userMongoStore getAllUsers started");
    const users = await User.find().lean();
    console.log("userMongoStore getAllUsers completed, returning users");
    return users;
  },

  async getUserById(id) {
    console.log("userMongoStore getUserById started");
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      console.log(`user: ${user}`);
      console.log(user);
      console.log("userMongoStore getUserById completed, returning user");
      return user;
    }
    console.log("userMongoStore getUserById completed, returning null");
    return null;
  },

  async addUser(user) {
    console.log("userMongoStore addUser started");
    console.log(user);
    const newUser = new User(user);
    const userObj = await newUser.save();
    const returnedUser = await this.getUserById(userObj._id);
    console.log(returnedUser);
    console.log("userMongoStore addUser completed");
    return returnedUser;
  },

  async getUserByEmail(email) {
    console.log("userMongoStore getUserByEmail started");
    const user = await User.findOne({ email: email }).lean();
    console.log("userMongoStore getUserByEmail completed");
    return user;
  },

  async deleteUserById(id) {
    console.log("userMongoStore deleteUserById started");
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
    console.log("userMongoStore deleteUserById completed");
  },

  async deleteAllUsers() {
    console.log("userMongoStore deleteAllUsers started");
    await User.deleteMany({});
    console.log("userMongoStore deleteAllUsers completed");
  }
};