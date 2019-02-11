import React from "react";
import { render } from "react-dom";

class LogoutButton extends React.Component {
  render() {
    return (
      <button className="logout" onClick={ev => this.props.logout()}>
        logout
      </button>
    );
  }
}

export default LogoutButton;
