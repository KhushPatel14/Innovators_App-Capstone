import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookAppointmentStyles.css";
import { useLocation } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Userprofile() {
  const [details, setDetails] = useState([]);
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const [email, setEmail] = useState("");

  //fetching to get fname and email from database
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }

    const email = localStorage.getItem("email");

    fetch(`http://localhost:5000/getappointments/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAppointmentClick = (appointment) => {
    console.log("Clicked appointment:", appointment);
    // generate the receipt using the appointment details
    handleGenerateReceipt(appointment);
  };

  const handleGenerateReceipt = (appointment) => {
    // format the date as mm/dd/yy
    const formattedDate = new Date(appointment.appDate).toLocaleDateString(
      "en-US",
      {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      }
    );

    // create the document definition using the appointment details
    const docDefinition = {
      content: [
        { text: "\nAppointment Receipt", fontSize: 24 },
        { text: "------------------------", fontSize: 20 },
        { text: "Your Appointment has been booked\n", fontSize: 20 },
        {
          text: `Appointment Date and Time: ${formattedDate} at ${appointment.appTime}`,
          fontSize: 14,
        },
        { text: "-----------------------------", fontSize: 14 },
        { text: `Service Location: ${appointment.location} `, fontSize: 14 },
        { text: `Service Name: ${appointment.service}`, fontSize: 14 },
        {
          text: `Provider Details: ${appointment.provider} ( ${appointment.providerPhone} )`,
          fontSize: 14,
        },
        { text: "Thank you for your business!", fontSize: 16 },
      ],
    };

    // generate the PDF
    pdfMake.createPdf(docDefinition).download("receipt.pdf");
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <button
              key={appointment._id}
              onClick={() => handleAppointmentClick(appointment)}
            >
              <div className="appointment">
                <p className="date">
                  {new Date(appointment.appDate).toLocaleDateString("en-US")}
                </p>
                <p className="time">{appointment.appTime}</p>
                <p className="name">{appointment.provider}</p>
                <p className="service">{appointment.service}</p>
                <p className="location">{appointment.location}</p>
              </div>
            </button>
          ))
        ) : (
          <p>No appointments booked.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
