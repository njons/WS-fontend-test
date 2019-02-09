import React from "react";
import LoginForm from "./LoginForm";

class App extends React.Component {
  state = {
    token: [] // 4. empty to take on token once its returned
  };

  componentDidMount() {
    // 3. fetch() POST login details ->  grabbed from component in Login
    // 5. setState(token: [retured data])
    // 6. refresh token...if token comes back
    // if (token) {
    // make a get request and
  }

  login = (email, password) => {
    event.preventDefault();
    console.log("this is login");
    fetch("https://beta.stockzoom.com/api-token-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(token =>
        this.setState(
          {
            token: token
          },
          () => {
            console.log("this is the state after login:", this.state);
          }
        )
      );
  };

  render() {
    return (
      <div>
        <LoginForm credentials={this.login} />
      </div>
    );
  }
}

export default App;
