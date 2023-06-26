const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    fname: String,
    email: String,
    cardType: String,
    cardName: String,
    cardNumber: String,
    cvv: String,
    expDate: Date,
  },
  {
    collection: "Payment",
  }
);
mongoose.model("Payment", PaymentSchema);
