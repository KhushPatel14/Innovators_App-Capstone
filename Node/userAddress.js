const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    email: String,
    streetAddress: String,
    city: String,
    postalCode: String,
    province: String,
  },
  {
    collection: "userAddress",
  }
);
mongoose.model("userAddress", AddressSchema);
