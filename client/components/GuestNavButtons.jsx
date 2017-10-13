import React from 'react';
import { Link } from 'react-router-dom';
import FlatWhiteButton from './FlatWhiteButton';

export default () => (
  <div className="width300 flex-row">
    <FlatWhiteButton
      label="Home"
      containerElement={<Link to="/" />}
    />
    <FlatWhiteButton
      label="Login"
      containerElement={<Link to="/login" />}
    />
    <FlatWhiteButton
      label="Signup"
      containerElement={<Link to="/signup" />}
    />
  </div>
);
