import React from "react";
import ResultItem from "./ResultItem";

class ResultsList extends React.Component {
  state = {
    itemId: ""
  };

  getId = id => {
    console.log("youre in get Data");
    console.log("this is the clicked id:", id);
    this.setState(
      {
        itemId: id
      },
      () => {
        console.log("this is the updated state:", this.state);
      }
    );
  };

  render() {
    const results = this.props.data;
    let portfolio = results.map((portfolio, i) => (
      <ResultItem
        getData={this.getId}
        id={portfolio.id}
        name={portfolio.position[i].instrument.name}
        instruments={portfolio.position.length - 1}
        marketVal={portfolio.market_value}
        currency={portfolio.currency}
        key={i}
      />
    ));

    return (
      <div style={this.props.show ? {} : { display: "none" }}>
        <h1 className="page-title"> My Portfolio List</h1>
        <ul className="portfolios-ul">{portfolio}</ul>
      </div>
    );
  }
}

export default ResultsList;
