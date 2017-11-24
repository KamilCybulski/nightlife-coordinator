import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { logUserIn } from '../actions/user-actions';
import { clearBars } from '../actions/bars-actions';

class Signup extends React.Component {
  /**
   * username, email, password -> control the values od relevant textfields
   * errMsg -> store the value of error messages
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      errMsg: '',
    };
  }

  /**
   * resetForm
   * Clears all the textfields
   * @returns {undefined}
   */
  resetForm = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      errMsg: '',
    });
  }

  /**
   * resetErrMsg
   * Clear the error messages
   * @returns {undefined}
   */
  resetErrMsg = () => {
    this.setState({ errMsg: '' });
  }

  /**
   * handleUsernameChange
   * @param {object} e Keyboard event object
   * Synchronise the value of this.state.username with username textfield
   * @returns {undefined}
   */
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  /**
   * handleEmailChange
   * @param {object} e Keyboard event object
   * Synchronise the value of this.state.email with email textfield
   * @returns {undefined}
   */
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  /**
   * handlePasswordChange
   * @param {object} e Keyboard event object
   * Synchronise the value of this.state.password with password textfield
   * @returns {undefined}
   */
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  /**
   * handleEnterKeyUp
   * @param {object} e Keyboard event object
   * Call this.sendData if user presses enter key
   * @returns {undefined}
   */
  handleEnterKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendData();
    }
  }

  /**
   * sendData
   * Sends data for registering a new user to the server;
   * Updates the redux state (logs user in) after recieving a response
   * @returns {undefined}
   */
  sendData = () => {
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    axios.post('/api/signup', { username, email, password })
      .then((res) => {
        if (res.data.success) {
          const name = res.data.username;
          const mail = res.data.email;
          const location = res.data.location;
          const barsToAttend = res.data.barsToAttend;
          this.props.logIn(name, mail, location, barsToAttend);
          this.props.clearBars();
        } else {
          this.setState({ errMsg: res.data.error });
        }
      })
      .catch(() => {
        this.setState({
          errMsg: 'Something went wrong. Please try again.',
        });
      });
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div className="fullwidth signup-form-container flex-column">
        <span className="form-title">
          Sign up with username and email here
        </span>
        <TextField
          hintText="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyUp={this.handleEnterKeyUp}
        />
        <TextField
          hintText="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onKeyUp={this.handleEnterKeyUp}
        />
        <TextField
          hintText="password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onKeyUp={this.handleEnterKeyUp}
        />
        <p className="warning-text">
          {this.state.errMsg}
        </p>
        <RaisedButton
          className="width256"
          label="Sign up!"
          primary
          onClick={this.sendData}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  logIn: PropTypes.func.isRequired,
  clearBars: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  logIn: (name, email, location, barsToAttend) => {
    dispatch(logUserIn(name, email, location, barsToAttend));
  },
  clearBars: () => {
    dispatch(clearBars());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
