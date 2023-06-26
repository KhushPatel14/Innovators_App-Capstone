import Review from "./Review";

import "./ReviewStyles.css";

function ReviewData(props) {
  // determine number of stars to display based on rating
  const rating = props.rating || 5; // default to 5 stars if no rating provided
  const starCount = Math.round(rating);

  // generate star icons
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= starCount) {
      starIcons.push(
        <span key={i} className="fa fa-star fa-3x checked"></span>
      );
    } else {
      starIcons.push(<span key={i} className="fa fa-star fa-3x"></span>);
    }
  }

  return (
    <div className="r-card">
      {/* <div className="r-image">
        <img alt="image" src={props.image} />
      </div> */}

      <h4>
        {props.heading}-{props.heading2}
      </h4>
      <p>{props.text}</p>
      <div className="starContainer">{starIcons}</div>
    </div>
  );
}

export default ReviewData;
