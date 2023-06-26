import React, { Component } from "react";

export default class UserDetails extends Component {
  componentDidMount() {
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
      });
  }
  render() {
    return (
      <div>
        <h1>Khush</h1>
        <h1>khush@gmail.com</h1>
      </div>
    );
  }
}
