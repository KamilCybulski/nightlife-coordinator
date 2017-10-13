// import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import whiteText from '../hocs/whiteText';

const FlatWhiteButton = props => whiteText(FlatButton)(props);

export default FlatWhiteButton;
