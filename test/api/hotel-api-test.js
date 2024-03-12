import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { hotelService } from "../hotel-service.js";
import { vinc, vincCredentials, testHotelLists, testHotels, testHotel } from "../fixtures.js";

suite("Hotel API tests", () => {
  let user = null;
  let favPlaces = null;

  setup(async () => {
    hotelService.clearAuth();
    user = await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    await hotelService.deleteAllHotelLists();
    await hotelService.deleteAllHotels();
    await hotelService.deleteAllUsers();
    user = await hotelService.createUser(vinc);
    await hotelService.authenticate(vincCredentials);
    testHotelLists[0].userid = user._id;
    favPlaces = await hotelService.createHotelList(testHotelLists[0]);
    console.log(`user: ${user}`);
    console.log(`favPlaces: ${favPlaces}`);
    console.log(favPlaces);
  });

  teardown(async () => {});

  test("create hotel", async () => {
    const returnedHotel = await hotelService.createHotel(favPlaces._id, testHotel);
    assertSubset(testHotel, returnedHotel);
  });

  test("create Multiple hotels", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    }
    const returnedHotels = await hotelService.getAllHotels();
    assert.equal(returnedHotels.length, testHotels.length);
    for (let i = 0; i < returnedHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hotel = await hotelService.getHotel(returnedHotels[i]._id);
      assertSubset(hotel, returnedHotels[i]);
    }
  });

  test("Delete HotelApi", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    };
    let returnedHotels = await hotelService.getAllHotels();
    console.log(`returnedHotels: ${returnedHotels}`);
    console.log(returnedHotels);
    assert.equal(returnedHotels.length, testHotels.length);
    for (let i = 0; i < returnedHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const hotel = await hotelService.deleteHotel(returnedHotels[i]._id);
    }
    returnedHotels = await hotelService.getAllHotels();
    assert.equal(returnedHotels.length, 0);
  });

  test("denormalised hotelList", async () => {
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hotelService.createHotel(favPlaces._id, testHotels[i]);
    }
    const returnedHotelList = await hotelService.getHotelList(favPlaces._id);
    assert.equal(returnedHotelList.hotels.length, testHotels.length);
    for (let i = 0; i < testHotels.length; i += 1) {
      assertSubset(testHotels[i], returnedHotelList.hotels[i]);
    }
  });
});

EventEmitter.setMaxListeners(25);