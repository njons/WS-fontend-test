import React from "react";
import { render } from "react-dom";
import LogoutButton from "./LogoutButton";

class InstrumentDetail extends React.Component {
  render() {
    if (this.props.show !== true) {
      return <div />;
    }

    const instrumentDetail = this.props.instrumentDetails;

    return (
      <div className="container">
        <div className="banner">
          <h1 className="title">
            {" "}
            Details of {instrumentDetail.name} (#{instrumentDetail.id})
          </h1>
          <div className="control-buttons">
            <button className="back" onClick={this.props.back}>
              {" "}
              {"◂ back"}
            </button>
            <LogoutButton logout={this.props.logout} />
          </div>
        </div>
        <div className="content">
          <p className="paragraph text">
            {instrumentDetail.company.description}
          </p>
          <div className="content">
            <table className="table">
              <thead>
                <tr className="row">
                  <td className="title">Symbol</td>
                  <td className="title">Kind</td>
                  <td className="title">Country</td>
                  <td className="title">Rating</td>
                </tr>
              </thead>
              <tbody>
                <tr className="row">
                  <td className="text">{instrumentDetail.symbol}</td>
                  <td className="text">{instrumentDetail.kind}</td>
                  <td className="text">{instrumentDetail.country}</td>
                  <td className="text">{instrumentDetail.rating}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="content header title">
              Yield in {instrumentDetail.currency}
            </h2>
            <table className="instruments-table">
              <thead>
                <tr className="row">
                  <td className="title">At open</td>
                  <td className="title">At close</td>
                  <td className="title">Highest</td>
                  <td className="title">Lowest</td>
                  <td className="title">Today</td>
                </tr>
              </thead>
              <tbody>
                <tr className="row">
                  <td className="text">{instrumentDetail.price_open}</td>
                  <td className="text">{instrumentDetail.price_close}</td>
                  <td className="text">{instrumentDetail.price_high}</td>
                  <td className="text">{instrumentDetail.price_low}</td>
                  <td className="text">{instrumentDetail.price_today}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default InstrumentDetail;
