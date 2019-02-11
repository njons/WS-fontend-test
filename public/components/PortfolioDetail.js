import React from "react";
import PortfolioDetailGrid from "./PortfolioDetailGrid";

class PortfolioDetail extends React.Component {
  render() {
    if (this.props.portfolioDetails.length === 0) {
      return <div />;
    }

    const portfolioDetails = this.props.portfolioDetails;
    console.log("these are the portfolio details:", portfolioDetails);
    const instrumentDetails = portfolioDetails.position;
    console.log("these are the instrument details:", instrumentDetails);

    const instrument = instrumentDetails.map((instr, i) => {
      return (
        <PortfolioDetailGrid
          key={i}
          id={instr.instrument.id}
          instruments={instr}
          getInstrId={this.props.getInstrId}
        />
      );
    });

    return (
      <div
        className="container"
        style={this.props.show === true ? {} : { display: "none" }}
      >
        <div className="banner">
          <h1 className="page-title"> Portfolio #{portfolioDetails.id}</h1>
          <button className="back" onClick={this.props.back}>
            {" "}
            {"< back"}
          </button>
        </div>
        <h2 className="page-title">available cash</h2>
        <p className="portfolio-li">
          {portfolioDetails.available_cash} {portfolioDetails.currency}
        </p>
        <h2 className="page-title">Market value</h2>
        <p className="portfolio-li">
          {portfolioDetails.market_value === null
            ? 0
            : portfolioDetails.market_value}{" "}
          {portfolioDetails.currency}
        </p>
        <div className="grid-container">
          <h2 className="page-title">Instruments</h2>
          <table className="instruments-table">
            <thead>
              <tr>
                <td className="page-title">Name</td>
                <td className="page-title">Price Today</td>
                <td className="page-title">Allocation </td>
                <td className="page-title">Change</td>
              </tr>
            </thead>
            <tbody>{instrument}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PortfolioDetail;
