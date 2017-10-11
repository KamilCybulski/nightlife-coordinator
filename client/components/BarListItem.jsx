import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * insertProperText
 * @param {number} attendants Number of attendants
 * @returns {string} Proper description of the number of attendants going to
 * a given bar
 */
const insertProperText = (attendants) => {
  switch (attendants) {
    case 0:
      return 'Nobody is going there.';

    case 1:
      return 'Only one person is going there.';

    default:
      return `${attendants} people are going there.`;
  }
};

const BarListItem = ({ name, rating, attendants, btnLabel, btnFunc, url }) => (
  <Paper
    zDepth={2}
    className="width300 horizontal-margin-20 padding20 height200 flex-column"
  >
    <h3 className="center-text medium-font padding20">
      {name}
    </h3>
    <p>This place&#39;s rating is {rating}.</p>
    <p>{insertProperText(attendants)}</p>
    <p><a href={url} className="undecorated-link">
      See their website
    </a></p>
    {!btnLabel && !btnFunc
      ? null
      : <RaisedButton
        className="width150"
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
