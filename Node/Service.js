const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    service: String,
    price: String,
    // provider: String,
    // providerPhone: String,
  },
  {
    collection: "Service",
  }
);
mongoose.model("Service", ServiceSchema);
