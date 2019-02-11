import React from "react";
import { render } from "react-dom";

class InstrumentDetail extends React.Component {
  render() {
    if (this.props.instrumentDetails.length === 0) {
      return <div />;
    }
    const instrumentDetail = this.props.instrumentDetails;
    console.log("this is instrument details :", instrumentDetail);
    return (
      <div
        className="container"
        style={this.props.show ? {} : { display: "none" }}
      >
        <div className="banner">
          <h1 className="page-title">
            {" "}
            Details of {instrumentDetail.name} (#{instrumentDetail.id})
          </h1>
          <button className="back" onClick={this.props.back}>
            {" "}
            {"< back"}
          </button>
        </div>
        <h2>Details</h2>
        <p className="info">{instrumentDetail.company.description}</p>

        <table className="instruments-table">
          <thead>
            <tr>
              <td className="page-title">
                Yield in {instrumentDetail.currency}
              </td>
              <td className="page-title">Price Today</td>
              <td className="page-title">Allocation </td>
              <td className="page-title">Change</td>
            </tr>
          </thead>
          <tbody>
            <tr className="instrument-row">
              <td>
                {instrumentDetail.kind} {instrumentDetail.domestic_currency}
              </td>
            </tr>
          </tbody>
        </table>
        <div />
      </div>
      /* put code here */
    );
  }
}

export default InstrumentDetail;
