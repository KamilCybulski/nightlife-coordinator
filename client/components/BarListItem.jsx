import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const BarListItem = ({ name, rating, attendants, btnLabel, btnFunc }) => (
  <Paper zDepth={2} className="width300 horizontal-margin-20">
    <p>{name}</p>
    <p>Number of attendants: {attendants}</p>
    <p>{`Rating: ${rating}`}</p>
    <RaisedButton
      label={btnLabel}
      onClick={btnFunc}
      primary
    />
  </Paper>
);

BarListItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  attendants: PropTypes.number.isRequired,
  btnLabel: PropTypes.string.isRequired,
  btnFunc: PropTypes.func.isRequired,
};

export default BarListItem;