import React from "react"
import PropTypes from "prop-types"

import history from "./history";
import ProgressBar from "@ramonak/react-progress-bar";

class ThirdStepOfPolls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      about_you: this.props.poll_session.about_you,
      form_errors: {},
      poll_completed: Object.keys(this.props.poll_session).length,
      redirect_url: null,
    }

    this.form = React.createRef()

    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeTextField = this.handleChangeTextField.bind(this);
  }

  handleChangeTextField = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  handlePrev = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    const current_url = this.props.current_url;
    let formData = new FormData(this.form.current);

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

  handleSubmit = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    const current_url = this.props.current_url;
    let formData = new FormData(this.form.current);

    formData.append("third_step_of_poll[submit]", true)

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
      } else if (response.status === 204) {
        this.setState({
          ...this.state,
          redirect_url: this.props.final_url
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
                  <li className="third">
                    <p className="label">Something about you (140 characters top)</p>
                    <div className="formMargin">
                      <input name="third_step_of_poll[about_you]" id="about_you" type="text" placeholder="Experienced dev with about ..." value={this.state.about_you} onChange={(event) => this.handleChangeTextField(event)} />
                      {
                        this.state.form_errors && this.state.form_errors.errors && this.state.form_errors.errors.about_you && this.state.form_errors.errors.about_you.map((error, i) => {
                          return <p key={i}>{error}</p>
                        })
                      }
                      <button className="submit-button" onClick={(event) => this.handleSubmit(event)}>Submit</button>
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
              <button className="end-buttons end-buttons-right end-buttons-disabled">⮟</button>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default ThirdStepOfPolls
