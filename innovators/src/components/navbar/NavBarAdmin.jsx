import { useState, useEffect } from "react";
import "./NavbarStyles.css";
import { MenuItemsAdmin } from "./MenuItemsAdmin";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const logoutSuccess = "Successfully logged out";

export default function NavbarAdmin() {
  const [clicked, setClicked] = useState(false);
  const [userData, setUserData] = useState("");

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
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

  const logOut = () => {
    window.localStorage.clear();
    setTimeout(function () {
      window.location.href = "./SignUp";
    }, 1000);
    toast.success(logoutSuccess, {
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
  return (
    <nav className="NavbarItemsAdmin">
      <h1 className="navbar-logo">Innovators</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <h1 className="userTagAdmin">Hello {userData.fname}</h1>
      <ul className={clicked ? "nav-menu-admin active" : "nav-menu-admin"}>
        {MenuItemsAdmin.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <button onClick={logOut}>Log Out</button>
    </nav>
  );
}
