import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import checkoutBG from "../assets/checkoutBG.jpg";
import CheckoutPage from "../components/user/CheckoutPage";

function Checkout() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={checkoutBG}
        title="Checkout"
        btnClass=".show"
      />
      <CheckoutPage />
      <Footer />
    </div>
  );
}

export default Checkout;
