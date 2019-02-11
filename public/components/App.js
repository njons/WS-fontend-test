import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import PortfolioList from "./PortfolioList";
import PortfolioDetail from "./PortfolioDetail";
import InstrumentDetail from "./InstrumentDetail";

class App extends React.Component {
  state = {
    loginForm: true,
    resultList: false,
    resultDetails: false,
    instrumentDetails: false,
    token: "",
    portfolioList: [],
    portfolioDetails: [],
    instrumentDetailsData: []
  };

  login = (email, password) => {
    event.preventDefault();
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
            loginForm: false,
            token: token.token,
            resultList: true
          },
          () => {
            //save in local storage here
            localStorage.setItem("token", JSON.stringify(token.token));
            this.getPortfolioData();
          }
        );
      });
    // .catch(don't forget to catch errors)
  };

  getPortfolioData = () => {
    const credentials = JSON.parse(localStorage.getItem("token"));
    fetch("https://beta.stockzoom.com/api/v1/me/portfolios/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`
      }
    })
      .then(res => res.json())
      .then(portfolios => {
        console.log("this is the data:", portfolios.results);
        this.setState(
          {
            portfolioList: portfolios.results
          },
          () => {
            console.log("this is the state after login:", this.state);
          }
        );
      });
  };

  getPortfolioDetails = id => {
    const credentials = JSON.parse(localStorage.getItem("token"));
    fetch(`https://beta.stockzoom.com/api/v1/me/portfolios/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`
      }
    })
      .then(res => res.json())
      .then(portfolioDetails => {
        this.setState({
          resultList: false,
          resultDetails: true,
          portfolioDetails
        });
      });
  };

  getInstrumentDetails = id => {
    const credentials = JSON.parse(localStorage.getItem("token"));
    fetch(`https://beta.stockzoom.com/api/v1/instruments/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`
      }
    })
      .then(res => res.json())
      .then(instrumentDetails => {
        this.setState({
          resultList: false,
          resultDetails: false,
          instrumentDetails: true,
          instrumentDetailsData: instrumentDetails
        });
      });
  };

  backPortfolioDetail = () => {
    this.setState({
      resultList: true,
      resultDetails: false
    });
  };

  backPortfolioList = () => {
    this.setState({
      resultList: true,
      instrumentDetails: false
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <LoginForm credentials={this.login} show={this.state.loginForm} />
        <PortfolioList
          portfolioList={this.state.portfolioList}
          getPortfolioId={this.getPortfolioDetails}
          show={this.state.resultList}
        />
        <PortfolioDetail
          show={this.state.resultDetails}
          portfolioDetails={this.state.portfolioDetails}
          back={this.backPortfolioDetail}
          getInstrId={this.getInstrumentDetails}
        />
        <InstrumentDetail
          show={this.state.instrumentDetails}
          instrumentDetails={this.state.instrumentDetailsData}
          back={this.backPortfolioList}
        />
      </div>
    );
  }
}

export default App;
