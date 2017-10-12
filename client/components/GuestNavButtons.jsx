import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

export default () => (
  <div className="width300 flex-row">
    <FlatButton
      label="Home"
      containerElement={<Link to="/" />}
    />
    <FlatButton
      label="Login"
      containerElement={<Link to="/login" />}
    />
    <FlatButton
      label="Signup"
      containerElement={<Link to="/signup" />}
    />
  </div>
);
