import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import loadBars from '../actions/bars-actions';
import { updateLocation } from '../actions/user-actions';


class SearchBar extends React.Component {
  /**
   * query -> Holds the current value of text field
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  searchForBars = () => {
    const getBarsData = () => {
      axios.get(`/api/bars?location=${this.state.query}`)
        .then((res) => {
          this.props.loadBars(res.data);
        })
        .catch(() => {
          this.props.loadBars([]);
        });
    };

    const onlyUpdateLocation = () => {
      this.props.updateLocation(this.state.query);
    };

    return this.props.userLoggedIn
      ? onlyUpdateLocation()
      : getBarsData();
  }

  /**
   * handleChange
   * @param {object} e Keyboard event object
   * Synchronise the values of this.state.query and the text field
   * @returns {undefined}
   */
  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div className="fullwidth center-items">
        <TextField
          hintText="Location..."
          value={this.state.query}
          onChange={this.handleChange}
        />
        <FlatButton
          label="Search"
          onClick={this.searchForBars}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  loadBars: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
  updateLocation: (location) => {
    dispatch(updateLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
