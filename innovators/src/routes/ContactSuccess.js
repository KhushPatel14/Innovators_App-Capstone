import React, { useState, useEffect } from "react";
import "./contactSuccessStyles.css";

function ContactSuccess() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Make API call or perform other async task
    // Once task is complete, set loading to false and success to true
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  }, []);

  return (
    <div className="container">
      <div className="box">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <div className="text">Loading...</div>
          </div>
        )}
        {success && (
          <div className="success">
            <div className="icon">&#10004;</div>
            <div className="text">
              Your form has been successfully submitted!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactSuccess;
