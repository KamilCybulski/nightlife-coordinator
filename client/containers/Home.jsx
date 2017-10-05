import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import SearchBar from './SearchBar';
import BarListItem from '../components/BarListItem';

import { loadBars } from '../actions/bars-actions';


class Home extends React.Component {
  /**
   * componentDidMount
   * Calls get bars data. There is no need to place any conditions because
   * componentDidMount will only get called in two situations:
   *  1. User just got logged in and is redirected to Home. In this case user
   *     data is passed as props to Home before mounting and we can safely fetch
   *     bars data.
   *  2. User reloaded the page. In this case user data will be passed to the 
   *     component long after mounting and we need to handle bars updates in 
   *     componendDidUpdate
   * @returns {undefined}
   */
  componentDidMount = () => {
    this.getBarsData();
  }

  /**
   * componendDidUpdate
   * @param {object} prevProps Previous props of the component
   * Calls getBarsData only if user's location has been updated.
   * @returns {undefined}
   */
  componentDidUpdate = (prevProps) => {
    const oldLocation = prevProps.location;
    const newLocation = this.props.location;

    if (oldLocation !== newLocation) {
      this.getBarsData();
    }
  }

  /**
   * getBarsData
   * Fetches data about bars in the given location from the server and 
   * populates state with them. If it's unable to fetch data for any reason
   * it sets state.bars.places to an empty array
   * @returns {undefined}
   */
  getBarsData = () => {
    const user = this.props.userLoggedIn;
    const location = this.props.location;
    if (user && location) {
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
    const { userLoggedIn, location, places } = this.props;


    if (userLoggedIn && !location && places === null) {
      return <SearchBar />;
    }

    if (userLoggedIn && location && places === null) {
      return <Loader />;
    }

    if (userLoggedIn && location && places) {
      if (places.length === 0) {
        return (
          <div className="fullwidth flex-coulmn">
            <SearchBar />
            <p> EMPTY LIST!!! </p>
          </div>
        );
      }

      const barsToAttend = this.props.barsToAttend;
      return (
        <div className="fullwidth flex-column">
          <SearchBar />
          {places.map(p => (
            <BarListItem
              key={p.id}
              name={p.name}
              rating={p.rating}
              attendants={p.attendants_number || 0}
              btnLabel={barsToAttend.includes(p.id) ? 'Resign' : 'Attend'}
              btnFunc={() => { console.log('button pressed'); }}
            />
          ))}
        </div>
      );
    }

    if (!userLoggedIn && places) {
      return (
        <div className="fullwidth flex-column">
          <SearchBar />
          {places.map(p => (
            <BarListItem
              key={p.id}
              name={p.name}
              rating={p.rating}
              attendants={p.attendants_number || 0}
            />
          ))}
        </div>
      );
    }

    // If user not logged in and places === null
    return <SearchBar />;
  }
}

Home.defaultProps = {
  places: null,
};

Home.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  barsToAttend: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.object),
  loadBars: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
  barsToAttend: state.user.barsToAttend,
  location: state.user.location,
  places: state.bars.places,
});

const mapDispatchToProps = dispatch => ({
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

