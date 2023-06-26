import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import appointmentBG from "../assets/appointmentBG.jpg";
import Userprofile from "../components/user/UserProfile";

function UserProfile() {
  return (
    <div className>
      <NavBarMain />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <Hero
        cName="hero-mid h1"
        homePageImg={appointmentBG}
        title="Book Appointment"
        btnClass=".show"
      /> */}
      <Userprofile />
      <Footer />
    </div>
  );
}

export default UserProfile;
