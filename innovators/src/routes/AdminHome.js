import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/admin/admin.css";
import NavbarAdmin from "../components/navbar/NavBarAdmin";

export default function AdminHome({ userData }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUser();
  }, []);

  const logoutSuccessAdmin = "Successfully logged out";
  const deleteSuccess = "User Deleted";

  const getAllUser = () => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    setTimeout(function () {
      window.location.href = "./login"; //will redirect to your blog page (an ex: blog.html)
    }, 1000); //will call the function after 2 secs.

    toast.success(logoutSuccessAdmin, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const deleteUser = (id, name) => {
    fetch("http://localhost:5000/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getAllUser();
        toast.success(deleteSuccess, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="auth-wrapper">
      <NavbarAdmin />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Welcome Admin</h3>

        <br />
        <p>Below is the list of users that are registered to Innovators</p>
        <table style={{ width: 500 }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    className="btnDelete"
                    onClick={() => deleteUser(i._id, i.fname)}
                  /> */}
                  <button
                    onClick={() => deleteUser(i._id, i.fname)}
                    className="deleteuser_btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
