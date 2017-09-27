import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const NavButtons = ({ username }) => {
  if (username) {
    return (
      <div>
        Hello {username}!
        <Link to="/"><FlatButton label="Home" /></Link>
        <FlatButton label="Logout" />
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
};

const Nav = props => (
  <AppBar
    showMenuIconButton={false}
    iconElementRight={<NavButtons username={props.user.name} />}
  />
);

Nav.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapPropsToState = state => ({ user: state.user });

export default connect(mapPropsToState)(Nav);
