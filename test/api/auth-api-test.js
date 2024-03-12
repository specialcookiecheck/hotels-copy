import { EventEmitter } from "events";
import { assert } from "chai";
import { hotelService } from "../hotel-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { vinc, vincCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    hotelService.clearAuth();
    await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    await hotelService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await hotelService.createUser(vinc);
    const response = await hotelService.authenticate(vincCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await hotelService.createUser(vinc);
    const response = await hotelService.authenticate(vincCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    hotelService.clearAuth();
    try {
        await hotelService.deleteAllUsers();
        assert.fail("Route not protected");
    } catch (error) {
        console.log("caught error");
        console.log(error);
        console.log(error.response);
    }
  });
});

EventEmitter.setMaxListeners(25);