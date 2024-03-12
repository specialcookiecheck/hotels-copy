import { EventEmitter } from "events";
import { assert } from "chai";
import { hotelService } from "../hotel-service.js";
import { assertSubset } from "../test-utils.js";
import { vinc, vincCredentials, testUsers } from "../fixtures.js";

const testUsersCopy = testUsers;
suite("User API tests", () => {
    setup(async () => {
      hotelService.clearAuth();
      console.log(testUsers);
      await hotelService.createUser(vinc);
      await hotelService.authenticate(vincCredentials);
      await hotelService.deleteAllUsers();
      console.log(testUsers);
      for (let i = 0; i < testUsers.length; i += 1) {
        console.log(testUsers[i]);
        testUsers[i] = await hotelService.createUser(testUsers[i]); // without the await the database is too slow
      }
      await hotelService.createUser(vinc);
      await hotelService.authenticate(vincCredentials);
      });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await hotelService.createUser(vinc);
    assertSubset(vinc, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await hotelService.getAllUsers();
    await hotelService.deleteAllUsers();
    await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    returnedUsers = await hotelService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    const returnedUser = await hotelService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - fail", async () => {
    try {
        const returnedUser = await hotelService.getUser("1234");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No User with this id");
      };
    });

    test("get a user - deleted user", async () => {
        await hotelService.deleteAllUsers();
        await hotelService.createUser(vinc);
        await hotelService.authenticate(vincCredentials);
        try {
          const returnedUser = await hotelService.getUser(testUsers[0]._id);
          assert.fail("Should not return a response");
        } catch (error) {
          assert(error.response.data.message === "No User with this id");
        }
      });
});

EventEmitter.setMaxListeners(25);