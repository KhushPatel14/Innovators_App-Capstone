import React, { Component } from "react";
import "./resetStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const successSent = "A link would be sent by email if an account exists";

    console.log(email);
    fetch("http://localhost:5000/forget-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");

        if (data.status == "Reset Link sent by email") {
          toast.info(successSent, {
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
            window.location.href = "./logIn";
          }, 3000);
        } else if (data.status == "Error") {
          toast.info(successSent, {
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
          toast.info(successSent, {
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
  render() {
    return (
      <div className="formClass">
        <div className="formReset">
          <form onSubmit={this.handleSubmit}>
            <div className="title">Reset Password</div>

            <br />
            <div className="loginDiv">
              <div className="mb-3">
                <div className="classDiv" />
                <input
                  type="email"
                  className="formClass"
                  placeholder="Enter email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <br />

              <br />

              <br />
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Reset
                </button>{" "}
                <br />
                <br />
                <h3 className="h3Class">Or</h3>
                <button type="button" className="btn btn-primary">
                  <a href="/login">Log In</a>
                </button>
                {/* <button
                type="button"
                className="submitBtn2"
                onSubmit={handleClick}
              >
                SignUp
              </button> */}
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}
