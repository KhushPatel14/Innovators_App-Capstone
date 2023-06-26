import React, { Component, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./paymentStyles.css";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const [cardType, setCardType] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");
  const [userData, setUserData] = useState("");
  const paySuccess = "Payment Successfull";
  const cvvRegexError = "CVV should be a valid 3 digit number";
  const cardTypeError = "Please select card type";
  const dateValidation = "Date should not be in past";
  const fieldsReq = "All fields are required";

  const numberRegexError =
    "Card number should be in 1111 1111 1111 1111 format";

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
      });
  }, []);

  //post method to store data in database
  const handleSubmit = (e) => {
    if (
      expDate == "" ||
      cardType == "" ||
      cardNumber == "" ||
      cvv == "" ||
      cardName == ""
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
    } else if (!/^\d{3}$/.test(cvv)) {
      toast.error(cvvRegexError, {
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
    } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber)) {
      toast.error(numberRegexError, {
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
    } else if (new Date(expDate) <= new Date()) {
      e.preventDefault();
      toast.error(dateValidation, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      e.preventDefault();
      console.log(cardType, cardName, cardNumber, cvv, expDate);
      fetch("http://localhost:5000/pay", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname: userData.fname,
          email: userData.email,
          cardType,
          cardName,
          cardNumber,
          cvv,
          expDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userPayment");
          if (data.status === "ok") {
            toast.success(paySuccess, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            setTimeout(function () {
              window.location.href = "./success";
            }, 1000);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="paymentContainer">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label className="textFieldLabel">Card Type:</label>
        <select
          id="cardType"
          name="cardType"
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="">Select card type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">Amex</option>
        </select>

        <label className="textFieldLabel">Name on Card:</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          placeholder="Enter name on card"
          onChange={(e) => setCardName(e.target.value)}
        />

        <label className="textFieldLabel">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Enter card number"
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <label className="textFieldLabel">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          placeholder="Enter CVV"
          onChange={(e) => setCvv(e.target.value)}
        />

        <label className="textFieldLabel">Expiry Date:</label>
        <input
          type="month"
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YY"
          min={new Date().toISOString().split("-").slice(0, 2).join("-")}
          onChange={(e) => setExpDate(e.target.value)}
        />

        <ToastContainer />
        <input type="submit" value="Submit" className="submitButton" />
      </form>
    </div>
  );
}
