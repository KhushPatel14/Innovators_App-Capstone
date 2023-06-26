import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import resetImage from "../assets/resetBG.jpg";
import ResetPage from "../components/reset/ResetPass";

function Reset() {
  return (
    <div className>
      <Hero
        cName="hero-mid h1"
        homePageImg={resetImage}
        title="Reset"
        btnClass=".show"
      />
      <ResetPage />
      <Footer />
    </div>
  );
}

export default Reset;
