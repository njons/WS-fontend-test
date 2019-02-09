import React from "react";
import LoginForm from "./LoginForm";
import ResultsList from "./ResultsList";

class App extends React.Component {
  state = {
    token: "", // 4. empty to take on token once its returned
    portfolios: [],
    authorised: false
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
      // .then(checkStatus ==> separete function that looks at the status code of the res object to ensure its 200)
      .then(res => res.json())
      .then(token => {
        this.setState(
          {
            token: token.token,
            authorised: true
          },
          () => {
            //save in local storage here
            this.getData();
            console.log("this is the state after login:", this.state);
          }
        );
      });
    // .catch(don't forget to catch errors)
  };

  getData = () => {
    fetch("https://beta.stockzoom.com/api/v1/me/portfolios/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(res => res.json())
      .then(portfolios => {
        this.setState(
          {
            portfolios: portfolios.results
          },
          () => {
            console.log("this is the state after login:", this.state);
          }
        );
      });
  };

  render() {
    return (
      <div>
        <LoginForm credentials={this.login} />
        <ResultsList data={this.state.portfolios} />
      </div>
    );
  }
}

export default App;
