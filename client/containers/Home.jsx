import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import SearchBar from './SearchBar';

import loadBars from '../actions/bars-actions';


class Home extends React.Component {
  componentDidMount = () => {
    const user = this.props.userLoggedIn;
    const location = this.props.userLocation;
    const checkedInDB = this.props.placesCheckedInDB;

    if (user && location && !checkedInDB) {
      axios.get(`/api/bars?location=${location}`)
        .then((res) => {
          this.props.loadBars(res.data);
        })
        .catch(() => {
          this.props.loadBars([]);
        });
    }
  }

  /**
   * @returns {object} React element
   */
  render() {
    if (!this.props.userCheckedInDB) {
      return <Loader />;
    }

    if (!this.props.userLoggedIn || !this.props.userLocation) {
      return <SearchBar />;
    }

    if (!this.props.placesCheckedInDB) {
      return <Loader />;
    }

    if (this.props.userLocation.length === 0) {
      return <div>Places array is empty</div>;
    }

    return (
      <div>
        <p>{this.props.places.map(i => <p>{i.name}</p>)}</p>
      </div>
    );
  }
}


Home.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  userLocation: PropTypes.string.isRequired,
  userCheckedInDB: PropTypes.bool.isRequired,
  placesCheckedInDB: PropTypes.bool.isRequired,
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadBars: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
  userLocation: state.user.location,
  userCheckedInDB: state.user.checkedInDB,
  placesCheckedInDB: state.bars.checkedInDB,
  places: state.bars.places,
});

const mapDispatchToProps = dispatch => ({
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

