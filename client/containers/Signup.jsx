import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
        />
      </div>
    );
  }
}

Signup.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Signup);
