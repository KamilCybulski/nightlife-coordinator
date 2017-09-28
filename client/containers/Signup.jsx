import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import logUserIn from '../actions/user-actions';

class Signup extends React.Component {
  /**
   * username, email, password -> control the values od relevant textfields
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
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
    });
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
      .then((r) => {
        if (r.data.success) {
          this.props.logIn(r.data.username, r.data.email, r.data.location);
          this.resetForm();
        } else {
          // TODO : Add an actual error handling
          console.log(r.data.error);
        }
      })
      .catch((err) => {
        this.resetForm();
        console.log(err);
      });
  }

  /**
   * @returns {object} React element
   */
  render() {
    if (this.props.userLoggedIn) {
      return (
        <div className="fullwidth center-items">
          You are already logged in.
        </div>
      );
    }

    return (
      <div className="fullwitdh flex-column">
        <TextField
          hintText="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <TextField
          hintText="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <TextField
          hintText="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton
          label="Sign up!"
          primary
          onClick={this.sendData}
        />
      </div>
    );
  }
}

Signup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
