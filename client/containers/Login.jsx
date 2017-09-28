import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import logUserIn from '../actions/user-actions';


class Login extends React.Component {
  /**
   * username -> store the current value of username text field
   * password -> store the current value of password text field
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  /**
   * resetForm
   * Clear all the textfields
   * @returns {undefined}
   */
  resetForm = () => {
    this.setState({ username: '', password: '' });
  }

  /**
   * handlePasswordChange
   * @param {object} e Keyboard event object
   * Synchronise the values of this.state.password and password textfield
   * @returns {undefined}
   */
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  /**
   * handleUsernameChange
   * @param {object} e Keyboard event object
   * Synchronise the values of this.state.username and username textfield
   * @returns {undefined}
   */
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  /**
   * sendData
   * Sends data required for authentication to the server
   * @returns {undefined}
   */
  sendData = () => {
    const username = this.state.username;
    const password = this.state.password;

    axios.post('/api/login', { username, password })
      .then((res) => {
        this.props.logIn(res.data.username, res.data.email, res.data.location);
        this.resetForm();
      })
      .catch((err) => {
        console.log(err);
        this.resetForm();
      });
  }

  /**
   * @returns {object} React element
   */
  render() {
    if (this.props.userLoggedIn) {
      return (
        <div className="fullwidth center-items">
          You are already logged in
        </div>
      );
    }

    return (
      <div className="fullwidth flex-column">
        <TextField
          hintText="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <TextField
          hintText="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton
          label="Log in!"
          primary
          onClick={this.sendData}
        />
      </div>
    );
  }
}

Login.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logIn: (name, email, location) => {
    dispatch(logUserIn(name, email, location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
