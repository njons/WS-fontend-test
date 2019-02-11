import React from "react";
import PortfolioItem from "./PortfolioItem";
import PortfolioDetail from "./PortfolioDetail";

class PortfolioList extends React.Component {
  back = () => {
    console.log("you ahve activated back");
  };

  render() {
    const results = this.props.portfolioList;
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
      <div
        className="container"
        style={this.props.show ? {} : { display: "none" }}
      >
        <div className="banner">
          <h1 className="page-title"> My Portfolio List</h1>
          {/*instrument details component here */}
        </div>
        <ul className="portfolios-ul">{portfolio}</ul>
      </div>
    );
  }
}

export default PortfolioList;
