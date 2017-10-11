import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavButtons from './NavButtons';

const NavElements = ({ checkedInDB }) => (
  checkedInDB
    ? <NavButtons />
    : null
);

NavElements.propTypes = {
  checkedInDB: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  checkedInDB: state.user.checkedInDB,
});

export default connect(mapStateToProps)(NavElements);
