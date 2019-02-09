import React from "react";
import Email from "./Email";
import Input from "./Input";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("you clicked submit");
  };

  // capture
  handleInput = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        console.log("this is the updated state:", this.state);
      }
    );
  };

  render() {
    return (
      <div className="container">
        <form
          onSubmit={ev =>
            this.props.credentials(this.state.email, this.state.password)
          }
        >
          <label>
            Email
            <input type="text" name="email" onChange={this.handleInput} />
          </label>
          <label>
            Password
            <input type="text" name="password" onChange={this.handleInput} />
          </label>
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
