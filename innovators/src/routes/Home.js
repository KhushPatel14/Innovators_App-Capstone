import Hero from "../components/homecomponent/Hero";
import Navbar from "../components/navbar/Navbar";
import DropDown from "../components/user/Dropdown";
import homePage from "../assets/homeBackground.jpg";
import Service from "../components/Service";
import Review from "../components/Review";
import Footer from "../components/homecomponent/Footer";
import Contact from "./Contact";

function Home() {
  return (
    <div className>
      <Navbar />
      <Hero
        cName="hero"
        homePageImg={homePage}
        title="Start your Service with us"
        text="Our Service Your Reliability"
        buttonText="Start Service"
        url="/"
        btnClass="show"
      />
      <br />
      {/* <DropDown /> */}
      <Service />
      <Review />
      <Footer />
    </div>
  );
}

export default Home;
