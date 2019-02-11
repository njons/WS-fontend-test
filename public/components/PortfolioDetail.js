import React from "react";
import PortfolioDetailGrid from "./PortfolioDetailGrid";

class PortfolioDetail extends React.Component {
  render() {
    if (this.props.show !== true) {
      return <div />;
    }

    const portfolioDetailsData = this.props.portfolioDetailsData;
    const instrumentDetails = portfolioDetailsData.position;

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
      <div className="container">
        <div className="banner">
          <h1 className="page-title"> Portfolio #{portfolioDetailsData.id}</h1>
          <button className="back" onClick={this.props.back}>
            {" "}
            {"< back"}
          </button>
        </div>
        <h2 className="page-title">available cash</h2>
        <p className="portfolio-li">
          {portfolioDetailsData.available_cash} {portfolioDetailsData.currency}
        </p>
        <h2 className="page-title">Market value</h2>
        <p className="portfolio-li">
          {portfolioDetailsData.market_value === null
            ? 0
            : portfolioDetailsData.market_value}{" "}
          {portfolioDetailsData.currency}
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
