import React, { Component, useState, useEffect } from "react";
import "./SuccessStyles.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment-timezone";
import teamlogo from "./teamlogo.jpg";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function SuccessPage() {
  const [details, setDetails] = useState([]);
  const [logoDataUrl, setLogoDataUrl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/getAppDetails")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setDetails(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLoadLogo = async () => {
    const response = await fetch(require("./teamlogo.jpg"));
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      setLogoDataUrl(reader.result);
    };
  };

  useEffect(() => {
    handleLoadLogo();

    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }
  });

  const handleGenerateReceipt = () => {
    // create the document definition
    const docDefinition = {
      content: [
        {
          image: logoDataUrl,
          fit: [100, 100],
          alignment: "center",
        }, // add the image to the document definition

        { text: "\nAppointment Receipt", fontSize: 24 },
        { text: "------------------------", fontSize: 20 },
        { text: "Your Appointment has been booked\n", fontSize: 20 },
      ],
    };

    // loop through the appointment details and add them to the document definition
    details.forEach((appointment) => {
      const date = new Date(appointment.appDate);
      const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;

      docDefinition.content.push(
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
        }
      );
    });

    // add the closing message to the document definition
    docDefinition.content.push({
      text: "Thank you for your business!",
      fontSize: 16,
    });

    // generate the PDF
    pdfMake.createPdf(docDefinition).download("receipt.pdf");
  };
  return (
    <div className="successContainer">
      <h2>Appointment Booked Successfully!</h2>
      <p>
        Your appointment has been booked successfully. Thank you for choosing
        our service.
      </p>
      <button onClick={handleGenerateReceipt} className="receiptButton">
        Generate Receipt
      </button>
    </div>
  );
}
