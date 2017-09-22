import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const navButtons = (
  <div>
    <Link to="/"><FlatButton label="Home" /></Link>
    <Link to="/login"><FlatButton label="Log In" /></Link>
    <Link to="/signup"><FlatButton label="Sign Up" /></Link>
  </div>
);

const Nav = () => (
  <AppBar
    showMenuIconButton={false}
    iconElementRight={navButtons}
  />
);

export default Nav;
