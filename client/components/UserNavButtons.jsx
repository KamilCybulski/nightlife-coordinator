import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import LogoutButton from './LogoutButton';

const UserNavButtons = ({ username }) => (
  <div>
    <div>
      Hello {username}!
      <FlatButton
        label="Home"
        containerElement={<Link to="/" />}
      />
      <LogoutButton />
    </div>
  </div>
);

UserNavButtons.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  username: state.user.name,
});

export default connect(mapStateToProps)(UserNavButtons);
