import "./FooterStyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>Innovators</h1>
          <p>Start your Service with us.</p>
        </div>
        <div>
          <a href="/">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-twitter-square"></i>
          </a>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h4>Customers Care</h4>
          <a href="/">Browse Service</a>
          <a href="/">Write a Review</a>
          <a href="/">Customers FAQ</a>
          <a href="/">Review Guidelines</a>
          <a href="/">Blog</a>
        </div>
        <div>
          <h4>My Account</h4>
          <a href="/SignUp">Sign In/Register</a>
          <a href="/">Customers FAQ</a>
          <a href="/Login">LogIn</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="/">Contact Us</a>
          <a href="/">Troubleshooting</a>
          <a href="/">Support</a>
          <a href="/">Our Team</a>
        </div>
        <div>
          <h4>Others</h4>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Our Story</a>
          <a href="/">License</a>
          <a href="/">About</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
