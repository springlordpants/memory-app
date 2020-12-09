import React, { Component } from "react"
import { connect } from "react-redux"
import { addReminder, deleteReminder, clearReminders } from "./actions"
import moment from "moment"
import "./styles/styles.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      dueDate: "",
    }
  }

  addReminder() {
    console.log("this.state.dueDate", this.state.dueDate)
    this.props.addReminder(this.state.text, this.state.dueDate)
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  renderReminders() {
    const { reminders } = this.props
    return (
      <ul className="list-group col-sm-4">
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <p>{reminder.text}</p>
                <small>
                  <em>
                    {moment(new Date(reminder.dueDate)).to("2021-11-5")} from
                    the 5th of November
                  </em>
                </small>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Remember Remember</h1>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Guy Fawkes things..."
              onChange={(event) => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={(event) =>
                this.setState({ dueDate: event.target.value })
              }
            />
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Vendetta
          </button>
        </div>
        {this.renderReminders()}
        <button
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear Vendettas
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state,
  }
}

export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders,
})(App)
