import React from "react";

class ResultItem extends React.Component {
  // state = {
  //   itemId: ""
  // };

  // capture
  // handleInput = event => {
  //   this.setState(
  //     {
  //       // update itemID that was clicked here
  //     },
  //     () => {
  //       console.log("this is the updated state:", this.state);
  //     }
  //   );
  // };

  render() {
    return <li className="portfolios">{this.props.name}</li>;
  }
}

export default ResultItem;
