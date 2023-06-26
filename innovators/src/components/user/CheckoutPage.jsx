import React, { Component, useState, useEffect } from "react";
import "./CheckoutStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState("");

  const cancelMessage = "Cancelled!!";
  const bookSuccess = "Booking Sucessfull";
  //fetching all data from localhost
  const appDate = window.localStorage.getItem("appDate");
  const appTime = window.localStorage.getItem("appTime");
  const fname = userData.fname;
  const email = userData.email;
  const phone = window.localStorage.getItem("phone");
  const appDetails = window.localStorage.getItem("appDetails");
  const streetAddress = window.localStorage.getItem("streetAddress");
  const city = window.localStorage.getItem("city");
  const postalCode = window.localStorage.getItem("postalCode");
  const province = window.localStorage.getItem("province");
  const location = window.localStorage.getItem("location");
  const service = window.localStorage.getItem("service");
  const price = window.localStorage.getItem("price");
  const provider = window.localStorage.getItem("provider");
  const providerPhone = window.localStorage.getItem("providerPhone");

  const tax = (price * 0.13).toFixed(2);
  const total = (Number(tax) + Number(price)).toFixed(2);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(appDate, fname, email, phone, appDetails);
    fetch("http://localhost:5000/book", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        appDate: appDate,
        appTime: appTime,
        fname: userData.fname,
        email: userData.email,
        phone: phone,
        appDetails: appDetails,
        streetAddress: streetAddress,
        city: city,
        postalCode: postalCode,
        province: province,
        location: location,
        service: service,
        total: total,
        provider: provider,
        providerPhone: providerPhone,
        modifyDate: new Date().toLocaleString(), // gets the current date and time
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userBooking");
        if (data.status === "ok") {
          toast.success(bookSuccess, {
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
            window.location.href = "./payment";
          }, 1000);
        } else {
          alert("Something went wrong");
        }
      });
  };

  const cancel = () => {
    localStorage.removeItem("appDate");
    localStorage.removeItem("appTime");
    localStorage.removeItem("phone");
    localStorage.removeItem("appDetails");
    localStorage.removeItem("streetAddress");
    localStorage.removeItem("city");
    localStorage.removeItem("postalCode");
    localStorage.removeItem("province");
    setTimeout(function () {
      window.location.href = "./Home2"; //will redirect to your blog page (an ex: blog.html)
    }, 1000); //will call the function after 2 secs.
    toast.info(cancelMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="checkout_container">
      <h1 className="checkout_h1">Appointment Cart</h1>
      <table className="checkout_table">
        <thead className="checkout_thead">
          <tr>
            <th className="checkout_th">Appointment Date</th>
            <th className="checkout_th">Appointment Time</th>
            <th className="checkout_th">Appointment Type</th>
            <th className="checkout_th">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="checkout_td">{appDate}</td>
            <td className="checkout_td">{appTime}</td>
            <td className="checkout_td">{service}</td>
            <td className="checkout_td">${price}</td>
          </tr>
        </tbody>
      </table>
      <div className="checkout_app">
        <h2 className="checkout_h2">Order Summary</h2>
        <p className="checkout_p">Subtotal: ${price}</p>
        <p className="checkout_p">Tax: ${tax}</p>
        <p className="checkout_p">Total: ${total}</p>
        <button onClick={handleSubmit} className="checkout_btn">
          Checkout
        </button>
        <button onClick={cancel} className="checkout_cancel">
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
