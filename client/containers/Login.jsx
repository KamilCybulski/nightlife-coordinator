import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { logUserIn } from '../actions/user-actions';
import { clearBars } from '../actions/bars-actions';


class Login extends React.Component {
  /**
   * username -> store the current value of username text field
   * password -> store the current value of password text field
   * errMsg -> store the current error message
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errMsg: '',
    };
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
   * Sends data required for authentication to the server
   * @returns {undefined}
   */
  sendData = () => {
    const username = this.state.username;
    const password = this.state.password;

    axios.post('/api/login', { username, password })
      .then((res) => {
        if (res.data.success) {
          const name = res.data.username;
          const email = res.data.email;
          const location = res.data.location;
          const barsToAttend = res.data.barsToAttend;
          this.props.logIn(name, email, location, barsToAttend);
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
      <div className="fullscreen flex-column">
        <div
          className="width256 height60 center-items primary-background-color small-border-radius"
        >
          <span className="primary-text-color big-font">
            Log in form
          </span>
        </div>
        <TextField
          hintText="username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onKeyUp={this.handleEnterKeyUp}
        />
        <TextField
          hintText="password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onKeyUp={this.handleEnterKeyUp}
        />
        {this.state.errMsg}
        <RaisedButton
          className="width256"
          label="Log in!"
          primary
          onClick={this.sendData}
        />
      </div>
    );
  }
}

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
