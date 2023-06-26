import Hero from "../components/homecomponent/Hero";
import Navbar from "../components/navbar/NavBarMain";
import Footer from "../components/homecomponent/Footer";
import loginImage from "../assets/logInBG.jpg";
import Price_List from "../components/user/PriceList";

function PriceList() {
  return (
    <div className>
      <Navbar />
      <br />
      <br />
      <br />
      <Price_List />
      <Footer />
    </div>
  );
}

export default PriceList;
