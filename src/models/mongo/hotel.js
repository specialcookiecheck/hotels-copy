import Mongoose from "mongoose";

const { Schema } = Mongoose;

const hotelSchema = new Schema({
  name: String,
  city: String,
  airport: String,
  HotelList: {
    type: Schema.Types.ObjectId,
    ref: "HotelList",
  },
});

export const Hotel = Mongoose.model("Hotel", hotelSchema);