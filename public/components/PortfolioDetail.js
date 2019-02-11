import React from "react";
import PortfolioDetailGrid from "./PortfolioDetailGrid";
import LogoutButton from "./LogoutButton";

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
          <h1 className="title"> Portfolio #{portfolioDetailsData.id}</h1>
          <div className="control-buttons">
            <button className="back" onClick={this.props.back}>
              {" "}
              {"back"}
            </button>
            <LogoutButton logout={this.props.logout} />
          </div>
        </div>
        <div className="content">
          <h2 className="title">available cash</h2>
          <p className="text">
            {portfolioDetailsData.available_cash}{" "}
            {portfolioDetailsData.currency}
          </p>
          <h2 className="title">Market value</h2>
          <p className="text">
            {portfolioDetailsData.market_value === null
              ? 0
              : portfolioDetailsData.market_value}{" "}
            {portfolioDetailsData.currency}
          </p>
          <div className="content">
            <table className="instruments-table">
              <thead>
                <tr>
                  <td className="title">instrument</td>
                  <td className="title">Price Today</td>
                  <td className="title">Allocation </td>
                  <td className="title">Change</td>
                </tr>
              </thead>
              <tbody className=" top-table">{instrument}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioDetail;
