import React from "react";
import "./loginError.css";

const LoginError = () => {
  const handleRedirect = () => {
    window.location.href = "./SignUp"; // replace with your login or signup page URL
  };

  return (
    <div className="loginerror-container">
      <h1 className="loginerror-h1">Error: You are not logged in</h1>
      <p className="loginerror-p">
        Please log in or sign up to access this page.
      </p>
      <button className="loginerror-btn" onClick={handleRedirect}>
        Log In / Sign Up
      </button>
    </div>
  );
};

export default LoginError;
