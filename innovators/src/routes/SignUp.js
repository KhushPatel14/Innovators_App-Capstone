import Hero from "../components/homecomponent/Hero";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/homecomponent/Footer";
import sigUpImage from "../assets/signUpBG.jpg";
import SignUpPage from "../components/signup/signUp";

function SignUp() {
  return (
    <div className>
      <Navbar />
      <Hero
        cName="hero-mid h1"
        homePageImg={sigUpImage}
        title="Sign up"
        btnClass=".show"
      />
      <SignUpPage />
      <Footer />
    </div>
  );
}

export default SignUp;
