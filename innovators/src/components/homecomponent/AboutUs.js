import "./AboutUsStyles.css";
import AboutUsData from "./AboutUsData";
import Image1 from "../../assets/image1.jpg";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpg";

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1> Welcome to Innovators</h1>
      <p>
        Our platform delivers a broad spectrum of service options to simplify
        your routine tasks. Our expert and seasoned team offers professional
        assistance across various domains including pet-sitting, beauty and
        personal grooming, home maintenance and repair, childcare, senior care,
        body care, housekeeping, and automotive services. Our services are
        accessible in major cities and we assure you of the highest quality
        standards and personalized attention to fulfill all your requirements.
        Scheduling your service is effortless with our convenient online booking
        system. Explore our service offerings and book your appointment today.
        <br /> <br />
        At our platform, we understand the value of your time and the importance
        of reliable and trustworthy service providers. That's why we have a
        rigorous screening process to ensure that only the best service
        providers are listed on our platform. We also offer a satisfaction
        guarantee, so if you're not happy with the service you received, we'll
        work to make it right.
        <br /> <br />
        In addition to our services, we also offer flexible payment options,
        including online payment and invoicing, to make the booking and payment
        process as smooth as possible. And if you have any questions or
        concerns, our friendly customer support team is available to assist you
        every step of the way. Join our platform today and experience the
        convenience and peace of mind that comes with our exceptional services.
      </p>
      <h1>Founders</h1>
      <div className="aboutcard">
        <AboutUsData
          image={Image2}
          heading="Khush Patel-Back End"
          text="Responsible for building and maintaining the technology that powers our application, a Backend Developer is an expert in designing, developing, and implementing server-side software using Express, MongoDB, and APIs. Ensures the reliability, scalability, and security of our application by optimizing performance, monitoring server resources, and identifying and fixing issues. "
        />
        <AboutUsData
          image={Image1}
          heading="Niraj Gadhavi-Front End"
          text="Responsible for designing and developing the user-facing technology of our application. Expert in HTML, CSS, and JavaScript and work to create responsive, accessible, and engaging interfaces that enhance the user experience. Stay up to date with the latest web technologies and best practices to ensure our application remains modern and user-friendly.."
        />
        <AboutUsData
          image={Image3}
          heading="Yeasin Islam-UML and Documentation"
          text="Responsible for creating and maintaining the architecture and documentation of our application, a Technical Writer and UML Designer is an expert in designing, documenting, and implementing software architecture and UML diagrams."
        />
      </div>
    </div>
  );
}
