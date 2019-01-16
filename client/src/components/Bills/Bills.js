import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import "./Bill.css";

function validate(billFor, amount) {
  // true means invalid, so our conditions got reversed
  return {
    billFor: billFor.length === 0,
    amount: amount.length === 0
  };
}

class Bills extends Component {
  constructor() {
    super();
    this.state = {
      billFor: "",
      amount: "",
      bill: "",
      newAmount: "",
      bills: {},
      showBills: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/bills")
      .then(response => {
        this.setState({
          showBills: response.data
        });
        const bills = response.data;
        let billname = [];
        let amount = [];
        bills.forEach(element => {
          billname.push(element.billFor);
          amount.push(element.amount);
        });
        this.setState({
          bills: {
            labels: billname,
            datasets: [
              {
                label: "Bills for 2019 Expenditure",
                data: amount,
                backgroundColor: [
                  "rgba(250,55,197,0.6)",
                  "rgba(155,100,210,0.6)",
                  "rgba(90,178,255,0.6)",
                  "rgba(240,134,67,0.6)",
                  "rgba(120,120,120,0.6)"
                ]
              }
            ]
          }
        });
      })
      .catch(error => {
        throw error;
      });
  }

  handleSubmit = e => {
    if (!this.canBeSubmitted()) {
      e.preventDefault();
      return;
    }
    const { billFor, amount } = this.state;
    alert(`Entered bill: ${billFor} amount: ${amount}`);
  };

  canBeSubmitted = () => {
    const errors = validate(this.state.billFor, this.state.amount);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  };

  addBill = e => {
    let { billFor, amount } = this.state;
    e.preventDefault();
    axios
      .post("/api/bills/add", { billFor, amount })
      .then(response => {
        console.log(response);
        this.setState({
          bill: response.data.billFor
        });
        this.setState({
          newAmount: response.data.amount
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let { bills } = this.state;
    let { showBills } = this.state;
    console.log(showBills);
    const errors = validate(this.state.billFor, this.state.amount);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div>
        <div className="container">
          <div className="bill-container">
            <h1>Add Bill</h1>
            <form type="submit" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  className={errors.billFor ? "error" : "Enter bill"}
                  type="text"
                  name="billFor"
                  onChange={this.handleChange}
                  value={this.state.billFor}
                  placeholder="Enter Bill"
                />
              </div>
              <div className="form-group">
                <input
                  className={errors.amount ? "error" : "Enter amount"}
                  validator="isEmpty"
                  type="text"
                  name="amount"
                  onChange={this.handleChange}
                  value={this.state.amount}
                  placeholder="Enter Amount"
                />
              </div>
              <button
                disabled={isDisabled}
                onClick={this.addBill}
                type="submit"
                className="btn btn-primary"
              >
                ADD
              </button>
            </form>
          </div>
          <div className="bill-list">
            {showBills.map(bill => (
              <div key={bill._id} className="bill-show">
                <div className="bills">
                  <span>{bill.billFor}</span> <span>{bill.amount}</span>
                </div>
              </div>
            ))}
          </div>
          <div id="graph" className="bill-graph">
            <Pie data={bills} options={{ maintainAspectRatio: false }} />
          </div>
          <div id="graph" className="bill-graph">
            <Doughnut data={bills} options={{ maintainAspectRatio: false }} />
          </div>
          <div id="graph" className="bill-graph">
            <Bar data={bills} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    );
  }
}
export default Bills;
