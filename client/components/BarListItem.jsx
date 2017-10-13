import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText } from 'material-ui/Card';

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

const BarListItem = (props) => {
  const { name, rating, attendants, url, imgUrl, btnLabel, btnFunc, phone, address } = props;

  return (
    <Card className="horizontal-margin-20 thumbnail">
      <CardMedia
        overlay={<CardTitle title={name} subtitle={`Rating ${rating}`} />}
      >
        <img src={imgUrl} alt="Ooops" />
      </CardMedia>
      <CardText>
        <p className="top-margin-5">
          {address}
        </p>
        <p className="top-margin-5">
          {phone}
        </p>
        <p className="top-margin-5">
          {insertProperText(attendants)}
        </p>
        <p className="top-margin-5">
          <a href={url} className="undecorated bold">
            Click to see their website
          </a>
        </p>

      </CardText>
      {!btnLabel && !btnFunc
        ? null
        : <CardActions>
          <FlatButton
            primary
            label={btnLabel}
            onClick={btnFunc}
          />
        </CardActions>
      }
    </Card>
  );
};

BarListItem.defaultProps = {
  btnLabel: undefined,
  btnFunc: undefined,
  imgUrl: 'http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png',
};

BarListItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  attendants: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  btnLabel: PropTypes.string,
  btnFunc: PropTypes.func,
};

export default BarListItem;
