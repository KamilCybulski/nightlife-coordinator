import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import logUserIn from '../actions/user-actions';


class Login extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = { msg: 'Want to log in?' };
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div>
        {this.state.msg}
        <RaisedButton
          label="Log in!"
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
