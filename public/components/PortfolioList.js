import React from "react";
import PortfolioItem from "./PortfolioItem";
import PortfolioDetail from "./PortfolioDetail";

class PortfolioList extends React.Component {
  render() {
    if (this.props.show !== true) {
      return <div />;
    }

    const results = this.props.portfolioListData;
    console.log("these are the portfolio results:", results);
    let portfolio = results.map((portfolio, i) => (
      <PortfolioItem
        id={portfolio.id}
        cash={portfolio.available_cash}
        getPortfolioId={this.props.getPortfolioId}
        currency={portfolio.currency}
        key={i}
      />
    ));

    return (
      <div className="container">
        <div className="banner">
          <h1 className="page-title"> My Portfolio List</h1>
        </div>
        <ul className="portfolios-ul">{portfolio}</ul>
      </div>
    );
  }
}

export default PortfolioList;
