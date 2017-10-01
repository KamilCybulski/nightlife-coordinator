import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import loadBars from '../actions/bars-actions';


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

  getBarsData = () => {
    axios.get(`/api/bars?location=${this.state.query}`)
      .then((res) => {
        this.props.loadBars(res.data);
      })
      .catch(() => {
        this.props.loadBars([]);
      });
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
          onClick={this.getBarsData}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  loadBars: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
