import React from "react";
import PortfolioItem from "./PortfolioItem";
import PortfolioDetail from "./PortfolioDetail";
import LogoutButton from "./LogoutButton";

class PortfolioList extends React.Component {
  render() {
    if (this.props.show !== true) {
      return <div />;
    }

    const results = this.props.portfolioListData;
    let portfolio = results.map((portfolio, i) => (
      <PortfolioItem
        id={portfolio.id}
        cash={portfolio.available_cash}
        getPortfolioId={this.props.getPortfolioId}
        currency={portfolio.currency}
        key={i}
        logout={this.logout}
      />
    ));

    return (
      <div className="container">
        <div className="banner">
          <h1 className="title"> My Portfolios</h1>
          <LogoutButton logout={this.props.logout} />
        </div>
        <ul className="content">{portfolio}</ul>
      </div>
    );
  }
}

export default PortfolioList;
