import "./ReviewStyles.css";
import ReviewData from "./ReviewData";
import Review1 from "../assets/review1.jpg";
import Review2 from "../assets/review2.jpg";
import Review3 from "../assets/review3.jpg";
import React, { Component, useEffect, useState } from "react";

function Review() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/ratings", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "allRatings");
        setData(data.data);
      });
  }, []);

  const lastThree = data.slice(Math.max(data.length - 3, 0));

  if (lastThree.length < 3) {
    const defaultData = [
      {
        id: 1,
        service: "Cat Sitter",
        location: "Toronto",
        rating: 5,
        review:
          "I highly recommend Innovators Service! My two cats received the care and attention they needed, and my house was very well kept! In fact, it seemed cleaner when I returned, than the day I left for our trip.  Laura is very friendly, trustworthy and dependable. You will not be disappointed!",
      },
      {
        id: 2,
        service: "Senior Care",
        location: "Brampton",
        rating: 4,
        review:
          "The staff was professional, but so caring and compassionate to our whole family, during what was a difficult time for us. We highly recommend the Innovators and their staff to provide a quality of care we had only hoped for.",
      },
      {
        id: 3,
        service: "Plumbing",
        location: "London",
        rating: 3,
        review:
          "Really appreciated the fast and great response when I called Pipecraft! They were able to accommodate a fast repair for me and they were quick and clean! I'd highly recommend them and would use them again anytime.",
      },
    ];
    const diff = 3 - lastThree.length;
    for (let i = 0; i < diff; i++) {
      lastThree.unshift(defaultData[i]);
    }
  }

  return (
    <div className="review">
      <h1>Recent Testimonials</h1>
      <p>Your feedback, Our Satisfaction</p>
      <div className="reviewcard">
        {lastThree.map((review) => (
          <ReviewData
            key={review.id}
            heading={review.service}
            heading2={review.location}
            rating={review.rating}
            text={review.review}
          />
        ))}
      </div>
    </div>
  );
}

export default Review;
