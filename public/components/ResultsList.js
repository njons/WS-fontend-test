import React from "react";
import ResultItem from "./ResultItem";

class ResultsList extends React.Component {
  state = {
    itemId: ""
  };

  // capture
  handleInput = event => {
    this.setState(
      {
        // update itemID that was clicked here
      },
      () => {
        console.log("this is the updated state:", this.state);
      }
    );
  };

  render() {
    const results = this.props.data;
    let portfiolio = results.map((portfolio, i) => (
      <ResultItem
        id={portfolio.position[i].instrument.id}
        name={portfolio.position[i].instrument.name}
        key={i}
      />
    ));

    return (
      <div>
        <ul className="portfolios">{portfiolio}</ul>
      </div>
    );
  }
}

export default ResultsList;
