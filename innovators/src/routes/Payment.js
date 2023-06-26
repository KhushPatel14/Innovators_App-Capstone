import Hero from "../components/homecomponent/Hero";
import NavBarMain from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import paymentBG from "../assets/paymentBG.jpg";
import PaymentPage from "../components/user/paymentPage";

function Payment() {
  return (
    <div className>
      <NavBarMain />
      <Hero
        cName="hero-mid h1"
        homePageImg={paymentBG}
        title="Payment"
        btnClass=".show"
      />
      <PaymentPage />
      <Footer />
    </div>
  );
}

export default Payment;
