import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import successBG from "../assets/successBG.jpg";
import SuccessPage from "../components/user/SuccessPage";

function Success() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={successBG}
        title="Success"
        btnClass=".show"
      />
      <SuccessPage />
      <br />
      <Footer />
    </div>
  );
}

export default Success;
