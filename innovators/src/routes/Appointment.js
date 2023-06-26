import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import appointmentBG from "../assets/appointmentBG.jpg";
import BookAppintment from "../components/user/BookAppointment";

function Appointment() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={appointmentBG}
        title="Book Appointment"
        btnClass=".show"
      />
      <BookAppintment />
      <Footer />
    </div>
  );
}

export default Appointment;
