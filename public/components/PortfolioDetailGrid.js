import React from "react";
import { render } from "react-dom";

class PortfolioDetailGrid extends React.Component {
  render() {
    const instrumentDetails = this.props.instruments;
    return (
      <tr
        className="instrument-row"
        onClick={ev => this.props.getInstrId(this.props.id)}
      >
        <td>{instrumentDetails.instrument.name}</td>
        <td>
          {instrumentDetails.instrument.price_today}{" "}
          {instrumentDetails.domestic_currency}
        </td>
        <td>{instrumentDetails.allocation} %</td>
        <td>{instrumentDetails.change} </td>
      </tr>
    );
  }
}

export default PortfolioDetailGrid;
