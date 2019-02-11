import React from "react";
import { render } from "react-dom";

class PortfolioDetailGrid extends React.Component {
  render() {
    const instrumentDetails = this.props.instruments;
    return (
      <tr
        className="table-row"
        onClick={ev => this.props.getInstrId(this.props.id)}
      >
        <td className="text">{instrumentDetails.instrument.name}</td>
        <td className="text">
          {instrumentDetails.instrument.price_today}{" "}
          {instrumentDetails.domestic_currency}
        </td>
        <td className="center text">{instrumentDetails.allocation}%</td>
        <td className="center text">{instrumentDetails.change} </td>
      </tr>
    );
  }
}

export default PortfolioDetailGrid;
