const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET = "asjbjshjscnjn()7236723676237cjdjfjh[]dfbjfdj";

const mongoUrl =
  "mongodb+srv://khush:Khush1234@cluster0.j31bmjh.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
require("./userDetails");
require("./Appointment");
require("./Payment");
require("./Location");
require("./Service");
require("./Ratings");
require("./ServiceProvider");
require("./Contact");

const User = mongoose.model("UserInfo");
const AppointmentVar = mongoose.model("Appointment");
const PaymentVar = mongoose.model("Payment");
const ServiceVar = mongoose.model("Service");
const LocationVar = mongoose.model("Location");
const RatingsVar = mongoose.model("Ratings");
const ProviderVar = mongoose.model("ServiceProvider");
const ContactVar = mongoose.model("Contact");
app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/register", async (req, res) => {
  const { fname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Incorrect Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User not exists!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    const emailPrimary = oldUser.email;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khushp1450@gmail.com",
        pass: "tfehokgdzgsksbxc",
      },
    });

    var mailOptions = {
      from: "innovatorsapp@gmail.com",
      to: emailPrimary,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ status: "Error" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: "Reset Link sent by email" });
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({ userType: { $in: ["User", ""] } });
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {}
});

//Appointment
app.post("/book", async (req, res) => {
  const {
    appDate,
    appTime,
    fname,
    email,
    phone,
    appDetails,
    streetAddress,
    city,
    postalCode,
    province,
    location,
    service,
    total,
    provider,
    providerPhone,
    modifyDate,
  } = req.body;

  try {
    await AppointmentVar.create({
      appDate,
      appTime,
      fname,
      email,
      phone,
      appDetails,
      streetAddress,
      city,
      postalCode,
      province,
      location,
      service,
      total,
      provider,
      providerPhone,
      modifyDate,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//Payment
app.post("/pay", async (req, res) => {
  const { fname, email, cardType, cardName, cardNumber, cvv, expDate } =
    req.body;

  const encryptedCardNumber = await bcrypt.hash(cardNumber, 10);
  const encryptedCVV = await bcrypt.hash(cvv, 10);

  try {
    await PaymentVar.create({
      fname,
      email,
      cardType,
      cardName,
      cardNumber: encryptedCardNumber,
      cvv: encryptedCVV,
      expDate,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//api to add location
app.post("/addlocation", async (req, res) => {
  const { location } = req.body;

  try {
    const oldLocation = await LocationVar.findOne({ location });
    if (oldLocation) {
      return res.send({ error: "Location Duplication" });
    }

    await LocationVar.create({
      location,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//api to add contact message
app.post("/addmessage", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await ContactVar.create({
      name,
      email,
      subject,
      message,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//api to add service
app.post("/addservice", async (req, res) => {
  const { service, price, provider, providerPhone } = req.body;

  try {
    const oldService = await ServiceVar.findOne({ service });
    if (oldService) {
      return res.send({ error: "Service Duplication" });
    }

    await ServiceVar.create({
      service,
      price,
      // provider,
      // providerPhone,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//api to add service provider
app.post("/addProvider", async (req, res) => {
  const { provider } = req.body;
  const { providerPhone } = req.body;
  const { service } = req.body;
  const { price } = req.body;
  const { location } = req.body;

  try {
    const oldProvider = await ProviderVar.findOne({ provider });
    if (oldProvider) {
      return res.send({ error: "Provider Duplication" });
    }

    await ProviderVar.create({
      provider,
      providerPhone,
      service,
      price,
      location,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//get appointments booked by user
app.get("/getappointments/:email", async (req, res) => {
  try {
    const appointments = await AppointmentVar.find({ email: req.params.email });
    res.send({ status: "ok", data: appointments });
  } catch (error) {
    console.log(error);
  }
});

//get service data to service page
app.get("/services", async (req, res) => {
  try {
    const allServices = await ServiceVar.find();
    res.send({ status: "ok", data: allServices });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAppDetails", async (req, res) => {
  try {
    const latestDetails = await AppointmentVar.find()
      .sort({ modifyDate: -1 })
      .limit(1);
    res.send({ status: "ok", data: latestDetails });
  } catch (error) {
    console.log(error);
  }
});
//get provider data to provider page
app.get("/providers", async (req, res) => {
  try {
    const allProviders = await ProviderVar.find();
    res.send({ status: "ok", data: allProviders });
  } catch (error) {
    console.log(error);
  }
});

//get location data to location page
app.get("/locations", async (req, res) => {
  try {
    const allLocation = await LocationVar.find();
    res.send({ status: "ok", data: allLocation });
  } catch (error) {
    console.log(error);
  }
});

//api to delete location
app.post("/deleteLocation", async (req, res) => {
  const { locationid } = req.body;
  try {
    LocationVar.deleteOne({ _id: locationid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {}
});

//api to delete service
app.post("/deleteService", async (req, res) => {
  const { serviceid } = req.body;
  try {
    ServiceVar.deleteOne({ _id: serviceid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {}
});

//api to delete provider
app.post("/deleteProvider", async (req, res) => {
  const { providerid } = req.body;
  try {
    ProviderVar.deleteOne({ _id: providerid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {}
});

//api to add ratings and reviews
app.post("/addRating", async (req, res) => {
  const { email, fname, service, rating, review, location } = req.body;

  try {
    await RatingsVar.create({
      email,
      fname,
      service,
      rating,
      review,
      location,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

//api to get ratings
app.get("/ratings", async (req, res) => {
  try {
    const allRatings = await RatingsVar.find();
    res.send({ status: "ok", data: allRatings });
  } catch (error) {
    console.log(error);
  }
});
