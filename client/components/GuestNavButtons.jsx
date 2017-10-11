import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

export default () => (
  <div>
    <Link to="/"><FlatButton label="Home" /></Link>
    <Link to="/login"><FlatButton label="Login" /></Link>
    <Link to="/signup"><FlatButton label="Signup" /></Link>
  </div>
);
