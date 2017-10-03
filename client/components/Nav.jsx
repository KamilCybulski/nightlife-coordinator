import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import { logUserOut } from '../actions/user-actions';
import { clearBars } from '../actions/bars-actions';

// TODO : Might be worth to refactor this stuff into 1 component!

const NavButtons = ({ username, logout, clearbars }) => {
  const logOut = () => {
    axios.get('/api/logout')
      .then((res) => {
        if (res.data.success) {
          clearbars();
          logout();
        }
      });
  };

  if (username) {
    return (
      <div>
        Hello {username}!
        <Link to="/"><FlatButton label="Home" /></Link>
        <FlatButton label="Logout" onClick={logOut} />
      </div>
    );
  }

  return (
    <div>
      <Link to="/"><FlatButton label="Home" /></Link>
      <Link to="/login"><FlatButton label="Login" /></Link>
      <Link to="/signup"><FlatButton label="Signup" /></Link>
    </div>
  );
};

NavButtons.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  clearbars: PropTypes.func.isRequired,
};

const Nav = props => (
  <AppBar
    showMenuIconButton={false}
    iconElementRight={<NavButtons username={props.user.name} logout={props.logOut} clearbars={props.clearBars} />}
  />
);

Nav.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
  clearBars: PropTypes.func.isRequired,
};

const mapPropsToState = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch(logUserOut());
  },
  clearBars: () => {
    dispatch(clearBars());
  },
});

export default connect(mapPropsToState, mapDispatchToProps)(Nav);
