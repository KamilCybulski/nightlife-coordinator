import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatWhiteButton from './FlatWhiteButton';

import LogoutButton from './LogoutButton';

const UserNavButtons = ({ username }) => (
  <div className="fullwidth flex-row">
    <div className="width300 center-text primary-text-color">
      Hello {username}!
    </div>
    <div className="width300 flex-row-end">
      <FlatWhiteButton label="Home" containerElement={<Link to="/" />} />
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
