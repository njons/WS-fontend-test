import React from "react";
import { render } from "react-dom";

class LogoutButton extends React.Component {
  render() {
    return (
      <button className="header" onClick={ev => this.props.logout()}>
        Logout
      </button>
    );
  }
}

export default LogoutButton;
