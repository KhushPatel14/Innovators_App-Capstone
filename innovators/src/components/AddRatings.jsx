import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddRatingsStyles.css";

import { useLocation } from "react-router-dom";

export default function AddRatings() {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [service, setSelectedService] = useState("");
  const [location, setSelectedLocation] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userData, setUserData] = useState("");

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }

    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setServices(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://localhost:5000/locations")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setLocations(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

    fetch("http://localhost:5000/addRating", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userData.email,
        fname: userData.fname,
        rating,
        review,
        service,
        location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          toast.success("Ratings Added", {
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
            window.location.href = "./home2";
          }, 1000);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <form className="ratingsForm" onSubmit={handleSubmit}>
      <div className="dropRatingDiv">
        <div className="dropRatingTag">
          <label className="lblRatings">
            Select Service for which you want to add rating:
          </label>
          <select
            className="serviceSel"
            onChange={handleServiceChange}
            value={service}
          >
            <option value="">-Select-</option>
            {services.map((service) => (
              <option key={service._id} value={service.service}>
                {service.service}
              </option>
            ))}
          </select>
          <br />
          <label className="lblRatings">
            Select Location for which you want to add rating:
          </label>
          <select
            className="serviceSel"
            onChange={handleLocationChange}
            value={location}
          >
            <option value="">-Select-</option>
            {locations.map((location) => (
              <option key={location._id} value={location.location}>
                {location.location}
              </option>
            ))}
          </select>
        </div>
        <div className="dropRatingTag">
          <label className="lblRatings">Rating:</label>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
          />
          <p>{rating}</p>
          <br />
          <label>
            Review:
            <textarea
              className="reviewTextarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <br />
          <button
            className="ratingSubmit"
            type="submit"
            disabled={!rating || !review || !service}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
