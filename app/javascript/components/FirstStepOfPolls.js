import React from "react"
import PropTypes from "prop-types"

import ProgressBar from "@ramonak/react-progress-bar";

import history from "./history";

class FirstStepOfPolls extends React.Component {
  constructor(props) {
    super(props)

    let year = ""
    let day = ""
    let month = ""
    if (this.props.poll_session.birth_date) {
      year = this.props.poll_session.birth_date.slice(0, 4)
      day = this.props.poll_session.birth_date.slice(8, 10)
      month = this.props.poll_session.birth_date.slice(5, 7)
    }

    this.state = {
      first_name: this.props.poll_session.first_name,

      birth_date_day: day,
      birth_date_month: month,
      birth_date_year: year,

      form_errors: {},
      poll_completed: Object.keys(this.props.poll_session).length,
      redirect_url: null,
    }

    this.form = React.createRef()

    this.handleNext = this.handleNext.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
  }

  handleChangeTextField = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  handleNext = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    const current_url = this.props.current_url;
    let data = new FormData(this.form.current);
    let object = Object.fromEntries(data.entries())

    const year = object["birth_date_year"];
    const month = object["birth_date_month"];
    const day = object["birth_date_day"];

    let fullDate = ""
    if (month.length > 0 && day.length > 0 && year.length > 0) {
      fullDate = `${year}-${parseInt(month) < 10 ? '0'+ parseInt(month) : month}-${parseInt(day) < 10 ? '0' + parseInt(day) : day}`
    }

    let formData = new FormData()

    formData.append("first_step_of_poll[first_name]", object["first_name"])
    formData.append("first_step_of_poll[birth_date]", fullDate)

    fetch(current_url, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': token
      },
      body: formData
    }).then(response => {
      if (response.status === 400) {
        response.json().then(
            (data) => {
              const errors = data.errors;
              this.setState({
                ...this.state,
                form_errors: {
                  ...this.state.form_errors,
                  errors
                }
              })
            }
        );
      } else if (response.status === 201) {
        this.setState({
          ...this.state,
          redirect_url: this.props.next_url
        })
      }
    })
  }

  render () {
    if (this.state.redirect_url) {
      history.push(this.state.redirect_url);
      location.reload();
    }
    return (
        <React.Fragment>
          <div className="wrapper">
            <div className="formWrapper">
              <form ref={this.form}>
                <ol>
                  <li className="first">
                    <p className="label">First name</p>
                    <div className="formMargin">
                      <input name="first_name" id="first_name" type="text" placeholder="Type your answer here..." value={this.state.first_name} onChange={(event) => this.handleChangeTextField(event)} />
                    </div>
                    {
                      this.state.form_errors && this.state.form_errors.errors && this.state.form_errors.errors.first_name && this.state.form_errors.errors.first_name.map((error, i) => {
                        return <p key={i}>{error}</p>
                      })
                    }
                  </li>
                  <li>
                    <p className="label">Birth date</p>
                    <div className="formMargin">
                      <div className="date-gropus">
                        <div className="date-group">
                          <label htmlFor="birth_date_month">Month</label>
                          <input name="birth_date_month" id="birth_date_month" type="text"
                                 value={this.state.birth_date_month}
                                 onChange={(event) => this.handleChangeTextField(event)}/>
                        </div>
                        <span className="slash">/</span>
                        <div className="date-group">
                          <label htmlFor="birth_date_day">Day</label>
                          <input name="birth_date_day" id="birth_date_day" type="text" value={this.state.birth_date_day}
                                 onChange={(event) => this.handleChangeTextField(event)}/>
                        </div>
                        <span className="slash">/</span>
                        <div className="date-group">
                          <label htmlFor="birth_date_year">Year</label>
                          <input name="birth_date_year" id="birth_date_year" type="text"
                                 value={this.state.birth_date_year}
                                 onChange={(event) => this.handleChangeTextField(event)}/>
                        </div>
                      </div>
                    </div>
                    {
                      this.state.form_errors && this.state.form_errors.errors && this.state.form_errors.errors.birth_date && this.state.form_errors.errors.birth_date.map((error, i) => {
                        return <p key={i}>{error}</p>
                      })
                    }
                  </li>
                </ol>
              </form>
            </div>
            <div className="navWrapper">
              <div className="progress">
                <span>{this.state.poll_completed} of 4 answered</span>
                <ProgressBar isLabelVisible={false} bgcolor="blue" height="5px" completed={this.state.poll_completed * 100 / 4} />
              </div>
              <button className="end-buttons end-buttons-left end-buttons-disabled">⮝</button>
              <button className="end-buttons end-buttons-right" onClick={(event) => this.handleNext(event)}>⮟</button>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default FirstStepOfPolls
