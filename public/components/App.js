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
    instrumentDetailsData: [],
    errorMessage: ""
  };

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      console.log("this is in localstorage", localStorage.getItem("token"));
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
    fetch("/api-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => this.checkStatus(res))
      .then(res => res.json())
      .then(token => {
        this.setState(
          {
            showLoginForm: false,
            token: token,
            showPortfolioList: true
          },
          () => {
            localStorage.setItem("token", token);
            this.getPortfolioData();
          }
        );
      })
      .catch(error => {
        console.log("looks like something went wrong", error);
        this.setState(
          {
            showLoginForm: false,
            showPortfolioList: false,
            showPortfolioDetail: false,
            instrumentDetails: false
          },
          () => {
            this.logout();
          }
        );
      });
  };

  checkStatus = response => {
    console.log("status checked");
    console.log(response.status);
    if (response.ok) {
      return Promise.resolve(response);
    } else if (response.status === 400 || response.status === 401) {
      this.setState({
        errorMessage: "Your details were not recognised. Try again!"
      });
    } else if (response.staus === 500) {
      this.setState({
        errorMessage: "Something went wrong on our end. Try again later."
      });
    }
  };

  getPortfolioData = () => {
    const credentials = localStorage.getItem("token");
    console.log(
      "I am getting data since local storage has a token",
      credentials
    );
    fetch("/api-portfolios", {
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
    const credentials = localStorage.getItem("token");
    fetch(`/api-portfolio-details/${id}/`, {
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
    const credentials = localStorage.getItem("token");
    fetch(`/api-instrument-details/${id}/`, {
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
      showPortfolioDetail: true,
      instrumentDetails: false
    });
  };

  backPortfolioList = () => {
    this.setState({
      showPortfolioList: true,
      showPortfolioDetail: false
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      showLoginForm: true,
      showPortfolioList: false,
      showPortfolioDetail: false,
      instrumentDetails: false,
      errorMessage: ""
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <LoginForm
          errorMessage={this.state.errorMessage}
          credentials={this.login}
          show={this.state.showLoginForm}
        />
        <PortfolioList
          portfolioListData={this.state.portfolioListData}
          getPortfolioId={this.getPortfolioDetails}
          show={this.state.showPortfolioList}
          logout={this.logout}
        />
        <PortfolioDetail
          show={this.state.showPortfolioDetail}
          portfolioDetailsData={this.state.portfolioDetailsData}
          back={this.backPortfolioList}
          getInstrId={this.getInstrumentDetails}
          logout={this.logout}
        />
        <InstrumentDetail
          show={this.state.instrumentDetails}
          instrumentDetails={this.state.instrumentDetailsData}
          back={this.backPortfolioDetail}
          logout={this.logout}
        />
      </div>
    );
  }
}

export default App;
