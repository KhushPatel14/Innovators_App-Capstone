import React, { Component } from "react";
import "./SuccessStyles.css";

export default class PriceList extends Component {
  render() {
    return (
      <div className="checkout_container">
        <table className="checkout_table">
          <thead className="checkout_thead">
            <tr>
              <th className="checkout_th">Service</th>
              <th className="checkout_th">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkout_td">Dog Walking</td>
              <td className="checkout_td">40$</td>
            </tr>
            <tr>
              <td className="checkout_td">Hair Cut</td>
              <td className="checkout_td">35$</td>
            </tr>
            <tr>
              <td className="checkout_td">Snow Shovel</td>
              <td className="checkout_td">45$</td>
            </tr>
            <tr>
              <td className="checkout_td">Body Care</td>
              <td className="checkout_td">75$</td>
            </tr>
            <tr>
              <td className="checkout_td">Housekeeping</td>
              <td className="checkout_td">100$</td>
            </tr>
            <tr>
              <td className="checkout_td">Automotive</td>
              <td className="checkout_td">110$</td>
            </tr>
            <tr>
              <td className="checkout_td">Plumbing</td>
              <td className="checkout_td">45$</td>
            </tr>
            <tr>
              <td className="checkout_td">House Maintenance</td>
              <td className="checkout_td">80$</td>
            </tr>
            <tr>
              <td className="checkout_td">Grooming</td>
              <td className="checkout_td">93$</td>
            </tr>
            <tr>
              <td className="checkout_td">Senior Care</td>
              <td className="checkout_td">150$</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
