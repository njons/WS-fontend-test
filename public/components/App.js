import React from "react";
import LoginForm from "./LoginForm";
import ResultsList from "./ResultsList";
import Header from "./Header";

class App extends React.Component {
  state = {
    token: "",
    portfolios: [],
    authorised: false
  };

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
            this.getPortfolioData();
            console.log("this is the state after login:", this.state);
          }
        );
      });
    // .catch(don't forget to catch errors)
  };

  getPortfolioData = () => {
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
      <div className="container">
        <Header />
        <LoginForm credentials={this.login} hide={this.state.authorised} />
        <ResultsList
          data={this.state.portfolios}
          show={this.state.authorised}
        />
      </div>
    );
  }
}

export default App;
