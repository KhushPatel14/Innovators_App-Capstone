import AboutUs from "./AboutUs";
import "./AboutUsStyles.css";


function AboutUsData(props){
    return(
        <div className="a-card">
            <div className="a-image">
                <img alt="image" src={props.image} />
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    );
}

export default AboutUsData;