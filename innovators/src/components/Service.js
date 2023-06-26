import ServiceData from "./ServiceData";
import DogSitting1 from "../assets/DogSitting1.jpg";
import DogSitting2 from "../assets/DogSitting2.jpg";
import CleanSer1 from "../assets/CleanSer1.jpg";
import CleanSer2 from "../assets/CleanSer2.jpg";
import "./ServiceStyles.css";

const Service = () => {
  return (
    <div className="service">
      <h1>Browse Services in Your Area</h1>
      <p>
        All of our services are provided in the comfort of your own home or at a
        location of your choice, 24 hours a day, seven days a week.
      </p>

      <ServiceData
        className="first-ser"
        heading="Dog Sitting"
        text="When we need a dog sitter, Innovative Service is by far our first option. We have employed her services on multiple times, the most recent for three weeks. During that period, she maintained the house clean and tidy and remained in touch with us on a daily basis, removing the worry of leaving the dogs and property behind. Above all, Laura is dependable, and our dogs adore her. On request, we would be pleased to give personal recommendations."
        img1={DogSitting1}
        img2={DogSitting2}
      />

      <ServiceData
        className="first-ser-reverse"
        heading="Cleaning Service"
        text="Innovators, I just wanted to remark how nice it is to come home after the girls have cleaned. The house smells amazing, the kitchen sink shines, and everything looks fantastic. They do an excellent job! Having your service frees up my weekends - what a relief not to have to worry about dusting, sweeping, mopping, or cleaning bathrooms!!! Thank you once more for your excellent work."
        img1={CleanSer1}
        img2={CleanSer2}
      />
    </div>
  );
};

export default Service;
