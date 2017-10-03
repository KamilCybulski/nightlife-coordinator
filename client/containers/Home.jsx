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
   * conponentDidMount
   * Calls get bars data. The only condition for getBarsData to fetch new data
   * is for this.props.places to be null.
   * @returns {undefined}
   */
  componentDidMount = () => {
    if (this.props.places === null) {
      this.getBarsData();
    }
  }

  /**
   * componendDidUpdate
   * @param {object} prevProps Previous props of the component
   * Calls getBarsData after each update. getBarsData will fetch new data
   * in 3 cases:
   *  1. this.props.places is null
   *  2. this.props.location has changed
   *  3. this.props.places has changed // TODO
   * @returns {undefined}
   */
  componentDidUpdate = (prevProps) => {
    const oldLocation = prevProps.location;
    const newLocation = this.props.location;
    const places = this.props.places;

    if (places === null || newLocation !== oldLocation) {
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
        return <div> Empty list </div>;
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
        <div>
          {places.map(p => <p>{p.name}</p>)}
        </div>
      );
    }

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

