import React, { useState, useEffect } from "react";
import "./ContactFormStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState("");

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

  useEffect(() => {
    setName(userData.fname || "");
    setEmail(userData.email || "");
  }, [userData]);

  const handleSubmit = (e) => {
    if (subject == "" || message == "") {
      e.preventDefault();
      toast.error("Both Subject and Message is required", {
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

      fetch("http://localhost:5000/addmessage", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: userData.fname,
          email: userData.email,
          subject,
          message,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "contactData");
          if (data.status === "ok") {
            setTimeout(function () {
              window.location.href = "/contactsuccess";
            }, 1000);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="form-container">
      <h1>Send a message to us!</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} disabled />
        <input placeholder="Email" value={email} disabled />
        <input
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <ToastContainer />
    </div>
  );
}
