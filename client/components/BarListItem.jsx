import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const BarListItem = ({ name, rating, attendants, btnLabel, btnFunc, url }) => (
  <Paper
    zDepth={2}
    className="width300 horizontal-margin-20 padding20 height200 flex-column"
  >
    <h3 className="center-text medium-font padding20">
      {name}
    </h3>
    <p>This place&#39;s rating is {rating}.</p>
    <p>{attendants} people are going there.</p>
    <p><a href={url}>See the website</a></p>
    {!btnLabel && !btnFunc
      ? null
      : <RaisedButton
        label={btnLabel}
        onClick={btnFunc}
        primary
      />}
  </Paper>
);

BarListItem.defaultProps = {
  btnLabel: undefined,
  btnFunc: undefined,
};

BarListItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  attendants: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  btnLabel: PropTypes.string,
  btnFunc: PropTypes.func,
};

export default BarListItem;
