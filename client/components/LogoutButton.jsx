import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import FlatWhiteButton from './FlatWhiteButton';

import { logUserOut } from '../actions/user-actions';
import { clearBars } from '../actions/bars-actions';

const LogoutButton = ({ logOut, clearPlaces }) => {
  const logout = () =>
    axios.get('api/logout')
      .then((res) => {
        if (res.data.success) {
          logOut();
          clearPlaces();
        }
      });

  return (
    <FlatWhiteButton
      label="Log out"
      onClick={logout}
    />
  );
};

LogoutButton.propTypes = {
  logOut: PropTypes.func.isRequired,
  clearPlaces: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch(logUserOut());
  },
  clearPlaces: () => {
    dispatch(clearBars());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
