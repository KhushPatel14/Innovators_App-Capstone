const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  {
    collection: "Contact",
  }
);
mongoose.model("Contact", ContactSchema);
