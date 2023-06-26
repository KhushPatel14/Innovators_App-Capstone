const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    appDate: Date,
    appTime: String,
    fname: String,
    email: String,
    phone: String,
    appDetails: String,
    streetAddress: String,
    city: String,
    postalCode: String,
    province: String,
    location: String,
    service: String,
    total: String,
    provider: String,
    providerPhone: String,
    modifyDate: Date,
  },
  {
    collection: "Appointment",
  }
);
mongoose.model("Appointment", AppointmentSchema);
