import React, { Component, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookAppointmentStyles.css";
import { useLocation } from "react-router-dom";

export default function BookAppointment() {
  const [appDate, setappDate] = useState("");
  const [appTime, setappTime] = useState("");
  const [fname, setFname] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [service, setService] = useState("");

  const [appDetails, setappDetails] = useState("");
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState("");

  //validations

  const errorPhoneRegex = "Phone should be in 999-999-9999 format";
  const fieldsReq = "All fields are required";
  const bookSuccess = "Booking Sucessfull";

  const errorpostalRegex = "Postal code should be in A1A 1A1 format";
  const location = localStorage.getItem("location");
  const handleClick = () => {
    setClicked(!clicked);
  };

  //fetching to get fname and email from database
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    } else {
      localStorage.removeItem("appDate");
      localStorage.removeItem("appTime");
      localStorage.removeItem("phone");
      localStorage.removeItem("appDetails");
      localStorage.removeItem("streetAddress");
      localStorage.removeItem("city");
      localStorage.removeItem("postalCode");
      localStorage.removeItem("province");
    }
  });

  //post method to store data in database
  const handleSubmit = (e) => {
    if (
      (!appDate || phone == "",
      province == "",
      streetAddress == "",
      city == "",
      province == "")
    ) {
      e.preventDefault();
      toast.error(fieldsReq, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (appTime < "10:00" || appTime > "22:00") {
      e.preventDefault();
      toast.error("Appointment time should be between 10 am and 10 pm.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!/^\d{3}-\d{3}-\d{4}$/i.test(phone)) {
      toast.error(errorPhoneRegex, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      e.preventDefault();
    } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)) {
      toast.error(errorpostalRegex, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      e.preventDefault();
    } else {
      e.preventDefault();

      console.log(appDate, fname, email, phone, appDetails);

      localStorage.setItem("appDate", appDate);
      localStorage.setItem("appTime", appTime);
      localStorage.setItem("phone", phone);
      localStorage.setItem("appDetails", appDetails);
      localStorage.setItem("streetAddress", streetAddress);
      localStorage.setItem("city", location);
      localStorage.setItem("postalCode", postalCode);
      localStorage.setItem("province", province);

      window.location.href = "/checkout";
    }
  };
  return (
    <div className="appointmentContainer">
      <h2>Book An Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label className="dateLabel">Select Date:</label>

        <input
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setappDate(e.target.value)}
        />
        <label className="dateLabel">Select Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          placeholder="Time"
          // min="10:00"
          // max="22:00"
          onChange={(e) => setappTime(e.target.value)}
        />

        <label className="textFieldLabel">Enter your Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="999-999-9999"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className="textFieldLabel">Appointment Details:</label>
        <textarea
          id="details"
          name="details"
          placeholder="Enter Appointment Details"
          onChange={(e) => setappDetails(e.target.value)}
        ></textarea>
        <div className="addressFields">
          <div className="addressGroupName">Address:</div>
          <div className="addressFieldGroup">
            <label className="addressFieldLabel">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="123 Main St"
              onChange={(e) => setStreetAddress(e.target.value)}
              className="addressFieldInput"
            />
          </div>
          <div className="addressFieldGroup">
            <label className="addressFieldLabel">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Toronto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="addressFieldInput"
              disabled
            />
          </div>
          <div className="addressFieldGroup">
            <label className="addressFieldLabel">Postal Code</label>
            <input
              type="text"
              id="postal"
              name="postal"
              placeholder="A1B 2C3"
              onChange={(e) => setPostalCode(e.target.value)}
              className="addressFieldInput"
            />
          </div>
          <div className="addressFieldGroup">
            <label className="addressFieldLabel">Province:</label>
            <select
              id="province"
              name="province"
              onChange={(e) => setProvince(e.target.value)}
              className="addressFieldSelect"
            >
              <option value="">--</option>
              <option value="ON">ON</option>
              <option value="NL">NL</option>
              <option value="PE">PE</option>
              <option value="NS">NS</option>
              <option value="NB">NB</option>
              <option value="QC">QC</option>
              <option value="MB">MB</option>
              <option value="SK">SK</option>
              <option value="AB">AB</option>
              <option value="BC">BC</option>
              <option value="YT">YT</option>
              <option value="NT">NT</option>
              <option value="NU">NU</option>
            </select>
          </div>
        </div>

        <ToastContainer />
        <input type="submit" value="Submit" className="submitButton" />
      </form>
    </div>
  );
}
