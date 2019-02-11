import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";
import PortfolioList from "./PortfolioList";
import PortfolioDetail from "./PortfolioDetail";
import InstrumentDetail from "./InstrumentDetail";

class App extends React.Component {
  state = {
    showLoginForm: true,
    showPortfolioList: false,
    showPortfolioDetail: false,
    instrumentDetails: false,
    token: "",
    portfolioListData: [],
    portfolioDetailsData: [],
    instrumentDetailsData: []
  };

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.setState(
        {
          showLoginForm: false,
          showPortfolioList: true
        },
        () => {
          this.getPortfolioData();
        }
      );
    }
  }

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
            showLoginForm: false,
            token: token.token,
            showPortfolioList: true
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
    console.log("I am getting data since local storage has a token");
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
            portfolioListData: portfolios.results,
            showLoginForm: false,
            showPortfolioList: true
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
      .then(portfolioDetailsData => {
        this.setState({
          showPortfolioList: false,
          showPortfolioDetail: true,
          portfolioDetailsData
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
          showPortfolioList: false,
          showPortfolioDetail: false,
          instrumentDetails: true,
          instrumentDetailsData: instrumentDetails
        });
      });
  };

  backPortfolioDetail = () => {
    this.setState({
      showPortfolioList: true,
      showPortfolioDetail: false
    });
  };

  backPortfolioList = () => {
    this.setState({
      showPortfolioList: true,
      instrumentDetails: false
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <LoginForm credentials={this.login} show={this.state.showLoginForm} />
        <PortfolioList
          portfolioListData={this.state.portfolioListData}
          getPortfolioId={this.getPortfolioDetails}
          show={this.state.showPortfolioList}
        />
        <PortfolioDetail
          show={this.state.showPortfolioDetail}
          portfolioDetailsData={this.state.portfolioDetailsData}
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
