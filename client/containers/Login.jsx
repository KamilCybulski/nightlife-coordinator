import React from 'react';
import PropTypes from 'prop-types';
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
   * @returns {object} React element
   */
  render() {
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
          onClick={() => {
            this.props.logIn('Janek', 'human@fromhell.stuff', 'wroclaw');
          }}
        />
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  logIn: (name, email, location) => {
    dispatch(logUserIn(name, email, location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
