import Mongoose from "mongoose";

const { Schema } = Mongoose;

const hotelListSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const HotelList = Mongoose.model("HotelList", hotelListSchema);