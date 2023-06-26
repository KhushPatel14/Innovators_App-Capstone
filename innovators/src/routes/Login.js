import Hero from "../components/homecomponent/Hero";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/homecomponent/Footer";
import loginImage from "../assets/logInBG.jpg";
import LoginPage from "../components/login/logIn";

function Login() {
  return (
    <div className>
      <Navbar />
      <Hero
        cName="hero-mid h1"
        homePageImg={loginImage}
        title="Log In"
        btnClass=".show"
      />
      <LoginPage />
      <Footer />
    </div>
  );
}

export default Login;
