import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";
import { testHotels, testHotel, testHotelLists } from "../fixtures.js";

suite("Hotels Model tests", () => {

  setup(async () => {
    db.init("firebase");
    await db.hotelStore.deleteAllHotels();
    const hotelList = await db.hotelListStore.addHotelList(testHotelLists);
    console.log(`hotelList: ${hotelList}`);
    for (let i = 0; i < testHotels.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testHotels[i] = await db.hotelStore.addHotel(hotelList, testHotels[i]);
    }
  });

  test("create a hotel", async () => {
    const hotelList = await db.hotelListStore.addHotelList(testHotelLists);
    console.log(`hotelList: ${hotelList}`);
    const hotel = await db.hotelStore.addHotel(hotelList, testHotel );
    assertSubset(testHotel.name, hotel.name);
    assert.isDefined(hotel._id);
  });

  test("delete all hotels", async () => {
    await db.hotelStore.deleteAllHotels();
    const returnedHotels = await db.hotelStore.getAllHotels();
    assert.equal(returnedHotels.length, 0);
  });

  test("get a hotel - success", async () => {
    const hotelList = await db.hotelListStore.addHotelList(testHotelLists);
    console.log(`hotelList: ${hotelList}`);
    const hotel = await db.hotelStore.addHotel(hotelList, testHotel );
    const returnedHotel = await db.hotelStore.getHotelById(hotel._id);
    assertSubset(testHotel, hotel);
  });

  test("delete One Hotel - success", async () => {
    const id = testHotels[0]._id;
    console.log(`id: ${id}`);
    await db.hotelStore.deleteHotelById(id);
    const returnedHotels = await db.hotelStore.getAllHotels();
    assert.equal(returnedHotels.length, testHotels.length - 1);
    const deletedHotel = await db.hotelStore.getHotelById(id);
    assert.isNull(deletedHotel);
  });

  test("get a hotel - bad params", async () => {
    assert.isNull(await db.hotelStore.getHotelById(""));
    assert.isNull(await db.hotelStore.getHotelById());
  });

  test("delete One Hotel - fail", async () => {
    await db.hotelStore.deleteHotelById("bad-id");
    const allHotels = await db.hotelStore.getAllHotels();
    assert.equal(testHotels.length, allHotels.length);
  });
});