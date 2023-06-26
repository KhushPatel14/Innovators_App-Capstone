import React, { Component, useState } from "react";
import "./logIn.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = "Invalid Credentials";
  const success = "Successfully logged in";
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          setTimeout(function () {
            window.location.href = "./Home2"; //will redirect to your blog page (an ex: blog.html)
          }, 1000); //will call the function after 2 secs.
          toast.success(success, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if ((data.error = "User Not found")) {
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }

  return (
    <div className="formClass">
      <div className="formLogin">
        <form onSubmit={handleSubmit}>
          <div className="title">Log In</div>

          <div class="subtitle">Welcome Back!</div>

          <br />
          <div className="loginDiv">
            <div className="mb-3">
              <div className="classDiv" />
              <input
                type="text"
                className="formClass"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <br />
              <div className="classDiv" />
              <input
                type="password"
                className="formClass"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <h3 className="h3Class">Or</h3>

              {/* <button
              type="button"
              className="submitBtn2"
              onSubmit={handleClick}
            >
              SignUp
            </button> */}
            </div>
            <p className="forgotPass">
              Forgot <a href="./reset">password?</a>
            </p>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </form>
      </div>
    </div>
  );
}
