import React from "react";

class ResultItem extends React.Component {
  render() {
    return (
      <li
        className="portfolio-li"
        onClick={ev => this.props.getData(ev.target.id)}
      >
        <p className="instrument-name" id={this.props.id}>
          {this.props.name} and {this.props.instruments} others
        </p>
        <p className="market-value">
          {this.props.marketVal === null ? 0 : this.props.marketVal}
        </p>
        <p>{this.props.currency}</p>
      </li>
    );
  }
}

export default ResultItem;
