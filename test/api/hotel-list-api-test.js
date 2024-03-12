import { EventEmitter } from "events";
import { assert } from "chai";
import { hotelService } from "../hotel-service.js";
import { assertSubset } from "../test-utils.js";
import { vinc, vincCredentials, testHotel, testHotelLists } from "../fixtures.js";

suite("HotelList API tests", () => {

  let user = null;

  setup(async () => {
    hotelService.clearAuth();
    user = await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    await hotelService.deleteAllHotelLists();
    await hotelService.deleteAllUsers();
    user = await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    testHotel.userid = user._id;
  });

  teardown(async () => {});

  test("create hotelList", async () => {
    const returnedHotelList = await hotelService.createHotelList(testHotelLists[0]);
    assert.isNotNull(returnedHotelList);
    assertSubset(testHotelLists[0], returnedHotelList);
  });

  test("delete a hotelList", async () => {
    const hotelList = await hotelService.createHotelList(testHotelLists[0]);
    const response = await hotelService.deleteHotelList(hotelList._id);
    assert.equal(response.status, 204);
    try {
      const returnedHotelList = await hotelService.getHotelList(hotelList.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No HotelList with this id", "Incorrect Response Message");
    }
  });

  test("create multiple hotelLists", async () => {
    for (let i = 0; i < testHotelLists.length; i += 1) {
      testHotelLists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotelList(testHotelLists[i]);
    }
    let returnedLists = await hotelService.getAllHotelLists();
    assert.equal(returnedLists.length, testHotelLists.length);
    await hotelService.deleteAllHotelLists();
    returnedLists = await hotelService.getAllHotelLists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant hotelList", async () => {
    try {
      const response = await hotelService.deleteHotelList("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No HotelList with this id", "Incorrect Response Message");
    }
  });
});

EventEmitter.setMaxListeners(25);