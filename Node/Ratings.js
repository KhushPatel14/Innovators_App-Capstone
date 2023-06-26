const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema(
  {
    email: String,
    fname: String,
    rating: String,
    review: String,
    service: String,
    location: String,
  },
  {
    collection: "Ratings",
  }
);
mongoose.model("Ratings", RatingsSchema);
