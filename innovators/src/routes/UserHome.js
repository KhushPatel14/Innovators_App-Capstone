import Hero from "../components/homecomponent/Hero";
import NavbarMain from "../components/navbar/NavBarMain";
import DropDown from "../components/user/Dropdown";
import homePage from "../assets/homeBG.jpg";
import Service from "../components/Service";
import Review from "../components/Review";
import Footer from "../components/homecomponent/Footer";
import Contact from "./Contact";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    } else {
      localStorage.removeItem("appDate");
      localStorage.removeItem("appTime");
      localStorage.removeItem("phone");
      localStorage.removeItem("appDetails");
      localStorage.removeItem("streetAddress");
      localStorage.removeItem("city");
      localStorage.removeItem("postalCode");
      localStorage.removeItem("province");
      localStorage.removeItem("service");
      localStorage.removeItem("location");
      localStorage.removeItem("provider");
      localStorage.removeItem("providerPhone");
      localStorage.removeItem("price");

      fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          this.setState({ userData: data.data });
          localStorage.setItem("email", data.data.email); // set email to localStorage
        });
    }
  }

  render() {
    return (
      <div className>
        <NavbarMain />
        <Hero
          cName="hero"
          homePageImg={homePage}
          title="Start your Service with us"
          // text="Our Service Your Reliability"
          buttonText="Start Service"
          url="/"
          btnClass="show"
        />
        <br />

        <DropDown />

        <br />
        <br />
        <br />

        <Service />
        <Review />

        <Footer />
        <ToastContainer />
      </div>
    );
  }
}
