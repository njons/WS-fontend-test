import React from "react";
import ErrorMessage from "./ErrorMessage";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.props.show !== true) {
      return <div />;
    }

    return (
      <div className="container">
        <form
          onSubmit={ev =>
            this.props.credentials(this.state.email, this.state.password)
          }
        >
          <label className="title">
            Email
            <input
              type="text"
              name="email"
              onChange={this.handleInput}
              required
            />
          </label>
          <label className="title">
            Password
            <input
              type="text"
              name="password"
              onChange={this.handleInput}
              required
            />
          </label>
          <button className="submit" type="submit">
            {" "}
            Login{" "}
          </button>
          <p className="title error">{this.props.errorMessage}</p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
