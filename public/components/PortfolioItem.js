import React from "react";
import PortfolioDetail from "./PortfolioDetail";

class PortfolioItem extends React.Component {
  render() {
    return (
      <li
        className="portfolio-li"
        id={this.props.id}
        onClick={ev => this.props.getPortfolioId(ev.target.id)}
      >
        <p className="text" id={this.props.id}>
          {this.props.cash} {this.props.currency} portfolio
        </p>
        <p className="text" id={this.props.id}>
          # {this.props.id}
        </p>
      </li>
    );
  }
}

export default PortfolioItem;
