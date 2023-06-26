import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import checkoutBG from "../assets/checkoutBG.jpg";
import RatingPage from "../components/AddRatings";

function AddRatings() {
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
        homePageImg={checkoutBG}
        title="Add Ratings"
        btnClass=".show"
      /> */}
      <RatingPage />
      <Footer />
    </div>
  );
}

export default AddRatings;
