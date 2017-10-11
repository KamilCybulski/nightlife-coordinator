import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GuestNavButtons from './GuestNavButtons';
import UserNavButtons from './UserNavButtons';

const NavButtons = ({ userLoggedIn }) => (
  userLoggedIn
    ? <UserNavButtons />
    : <GuestNavButtons />
);

NavButtons.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(NavButtons);
