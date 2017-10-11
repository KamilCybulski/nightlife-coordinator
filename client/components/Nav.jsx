import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavElements from './NavElements';

const Nav = () => (
  <AppBar
    showMenuIconButton={false}
    iconElementRight={<NavElements />}
  />
);

export default Nav;
