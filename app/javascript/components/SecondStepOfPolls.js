import React from "react"
import PropTypes from "prop-types"

import history from "./history";
import Select from 'react-select';
import ProgressBar from "@ramonak/react-progress-bar";

class SecondStepOfPolls extends React.Component {
  constructor(props) {
    super(props)

    this.options = [
      { value: 1, label: 'Mac OS' },
      { value: 2, label: 'Linux' },
      { value: 3, label: 'Windows' },
    ];

    this.state = {
      form_errors: [],
      poll_completed: Object.keys(this.props.poll_session).length,
      redirect_url: null,
      selectedOption: this.props.poll_session.os_version,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState({
      ...this.state,
      selectedOption: selectedOption.value
    })
  }

  handlePrev = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    const current_url = this.props.current_url;

    let formData = new FormData()
    formData.append("second_step_of_poll[os_version]", this.state.selectedOption)

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
          redirect_url: this.props.prev_url
        })
      }
    })
  }

  handleNext = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    const current_url = this.props.current_url;

    let formData = new FormData()
    formData.append("second_step_of_poll[os_version]", this.state.selectedOption)

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
              <form>
                <ol>
                  <li className="second">
                    <p className="label">OS of choice</p>
                    <div className="formMargin">
                      <Select onChange={this.handleChange} placeholder="Type or select an option" options={this.options} value={this.options.filter(({value}) => value === this.state.selectedOption)} />
                      {
                        this.state.form_errors && this.state.form_errors.errors && this.state.form_errors.errors.os_version && this.state.form_errors.errors.os_version.map((error, i) => {
                          return <p key={i}>{error}</p>
                        })
                      }
                    </div>
                  </li>
                </ol>
              </form>
            </div>
            <div className="navWrapper">
              <div className="progress">
                <span>{this.state.poll_completed} of 4 answered</span>
                <ProgressBar isLabelVisible={false} bgcolor="blue" height="5px" completed={this.state.poll_completed * 100 / 4} />
              </div>
              <button className="end-buttons end-buttons-left" onClick={(event) => this.handlePrev(event)}>⮝</button>
              <button className="end-buttons end-buttons-right" onClick={(event) => this.handleNext(event)}>⮟</button>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default SecondStepOfPolls
