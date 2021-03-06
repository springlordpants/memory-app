import React, { Component } from "react"
import { connect } from "react-redux"
import { addReminder, deleteReminder, clearReminders } from "./actions"
import moment from "moment"
import "./styles/styles.css"
import { BiListPlus } from "react-icons/bi"

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
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
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
        <h1 className="title">Memory App</h1>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Remember to..."
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
          <div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.addReminder()}
            >
              <BiListPlus size="1.5em" />
            </button>
          </div>
        </div>
        {this.renderReminders()}
        <button
          className="btn btn-danger clear-button"
          onClick={() => this.props.clearReminders()}
        >
          Clear Reminders
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
