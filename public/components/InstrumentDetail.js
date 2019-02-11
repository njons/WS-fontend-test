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
              {"back"}
            </button>
            <LogoutButton logout={this.props.logout} />
          </div>
        </div>
        <div className="content">
          <p className="paragraph text">
            {instrumentDetail.company.description}
          </p>
          <div className="content">
            <table className="instruments-table">
              <thead>
                <tr>
                  <td className="title">
                    Yield in {instrumentDetail.currency}
                  </td>
                  <td className="title">Price Today</td>
                  <td className="title">Allocation </td>
                  <td className="title">Change</td>
                </tr>
              </thead>
              <tbody>
                <tr className="instrument-row">
                  <td className="text">{instrumentDetail.kind}</td>
                  <td className="text">{instrumentDetail.domestic_currency}</td>
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
