const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema(
  {
    provider: String,
    providerPhone: String,
    service: String,
    price: String,
    location: String,
  },
  {
    collection: "ServiceProvider",
  }
);
mongoose.model("ServiceProvider", ServiceProviderSchema);
