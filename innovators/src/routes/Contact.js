import NavBarMain from "../components/navbar/NavBarMain";
import ContactForm from "../components/homecomponent/ContactForm";
import Footer from "../components/homecomponent/Footer";
import Hero from "../components/homecomponent/Hero";
import contactPage from "../assets/contact.jpg";

function Contact() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={contactPage}
        title="Contact Us"
        btnClass=".show"
      />
      <ContactForm />
      <Footer />
    </div>
  );
}
export default Contact;
