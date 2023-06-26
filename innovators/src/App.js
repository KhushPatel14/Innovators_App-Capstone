import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Home2 from "./routes/Home2";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Signup from "./routes/SignUp";
import Reset from "./routes/Reset";
import Appointment from "./routes/Appointment";
import Payment from "./routes/Payment";
import Success from "./routes/Success";
import Checkout from "./routes/Checkout";
import Price_List from "./routes/PriceList";
import LoginError from "./routes/LoginError";
import ChangeLocationDropDown from "./routes/ChangeLocationDropDown";
import ChangeServiceDropDown from "./routes/ChangeServiceDropDown";
import UserProfile from "./routes/UserProfile";
import AddRatings from "./routes/AddRatings";
import ChangeProvider from "./routes/ChangeProvider";

import ContactSuccess from "./routes/ContactSuccess";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/price" element={<Price_List />} />
        <Route path="/loginError" element={<LoginError />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route
          path="/changeLocationDrop"
          element={<ChangeLocationDropDown />}
        />
        <Route path="/changeServiceDrop" element={<ChangeServiceDropDown />} />
        <Route path="/addratings" element={<AddRatings />} />
        <Route path="/changeprovider" element={<ChangeProvider />} />
        <Route path="/contactsuccess" element={<ContactSuccess />} />
      </Routes>
    </div>
  );
}
