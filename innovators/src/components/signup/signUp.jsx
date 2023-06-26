import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../signup/signUp.css";
export default function SignUp() {
  const [fname, setFname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const signSuccess = "Successfully registered";
  const errorMessageAdmin = "Invalid Admin";
  const errorMessage = "All fields are required";
  const errorMessagePasswordmatch = "Passwords does not match";
  const errorMessagePassword =
    "Password should have at least 1 number, 1 upper case letter and minimun 8 characters";
  const errorMessageEmail = "Email is not in valid format";
  const duplicate = "User already exists";

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "innovators") {
      e.preventDefault();
      toast.error(errorMessageAdmin, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (password != confirmpass) {
      e.preventDefault();
      toast.error(errorMessagePasswordmatch, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (password == "" || fname == "" || email == "") {
      e.preventDefault();
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      e.preventDefault();
      toast.error(errorMessageEmail, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(password)) {
      e.preventDefault();
      toast.error(errorMessagePassword, {
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

      console.log(fname, email, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            toast.success(signSuccess, {
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
              window.location.href = "./logIn"; //will redirect to your blog page (an ex: blog.html)
            }, 1000); //will call the function after 2 secs.
          } else if ((data.error = "User Exists")) {
            toast.error(duplicate, {
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
  };
  return (
    <div className="formClass">
      <div className="formSignUp">
        <form onSubmit={handleSubmit}>
          <div className="title">Sign Up</div>
          <div class="subtitle">Get Service Today</div>
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
          <br />
          <div className="radioOption">
            <input
              defaultChecked
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />{" "}
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />{" "}
            Admin
          </div>

          <br />
          {userType == "Admin" ? (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <br />

          <div className="loginDiv">
            <div className="mb-3">
              <div className="classDiv" />

              <input
                type="text"
                className="formClass"
                placeholder="Enter full name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <div className="classDiv" />
              <input
                type="text"
                className="formClass"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <div className="classDiv" />
              <input
                type="password"
                className="formClass"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <div className="classDiv" />
              <input
                type="password"
                className="formClass"
                placeholder="Reenter password"
                onChange={(e) => setConfirmpass(e.target.value)}
              />
            </div>
            <br />
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <h3 className="h3Class">Or</h3>

              <button type="button" className="btn btn-primary">
                <a href="/login">Login</a>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
