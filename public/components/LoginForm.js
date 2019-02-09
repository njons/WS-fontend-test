import React from "react";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
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
