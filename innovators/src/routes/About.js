import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import aboutPage from "../assets/about.jpg";
import AboutUs from "../components/homecomponent/AboutUs";

function About() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={aboutPage}
        title="About"
        btnClass=".show"
      />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default About;
