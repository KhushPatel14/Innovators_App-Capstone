const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    location: String,
  },
  {
    collection: "Location",
  }
);
mongoose.model("Location", LocationSchema);
