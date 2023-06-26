import { Component } from "react";
import "./ServiceStyles.css";

class ServiceData extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="ser-text">
          <h2>{this.props.heading}</h2>
          <p>{this.props.text}</p>
        </div>

        <div className="image">
          <img alt="Dog sitting img" src={this.props.img1} />
          <img alt="Dog sitting img" src={this.props.img2} />
        </div>
      </div>
    );
  }
}

export default ServiceData;
