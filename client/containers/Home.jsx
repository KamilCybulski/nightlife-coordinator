import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import SearchBar from './SearchBar';
import BarListItem from '../components/BarListItem';
import HomeTitle from '../components/HomeTitle';

import {
  loadBars,
  addAttendant,
  removeAttendant,
} from '../actions/bars-actions';
import { visitBar, forgoVisitingBar } from '../actions/user-actions';


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
          if (res.data.error) {
            this.props.loadBars([]);
          } else {
            this.props.loadBars(res.data);
          }
        })
        .catch(() => {
          this.props.loadBars([]);
        });
    }
  }

  /**
   * markToVisit
   * @param {string} id Yelp ID of a place that user wants to visit
   * @param {string} name Name of that place
   * @param {number} rating Rating of that place
   * @param {number} index Index of the entry in the bars.places to be affected.
   * Marks a given place as intended to visit by a user. Sends a POST request
   * to the server and updates a user substate (barsToAttend prop) and
   * attendants_number of the relevant bar after recieving a response
   * @returns {undefined}
   */
  markToVisit = (id, name, rating, index) => {
    axios.post('/api/visit', { id, name, rating })
      .then(() => {
        this.props.visitBar(id);
        this.props.addAttendant(index);
      });
  };

  /**
   * unmarkToVisit
   * @param {string} placeID Yelp ID of a place that user does not want to 
   *                         visit anymore
   * @param {number} index Index of the entry in the bars.places to be affected.
   * Removes a given place from the list of places to visit by a user.
   * Sends a POST request to the server and removes a given bar
   * from user substate (barsToAttend prop) after recieving a response. Also,
   * decreases an attendans_number of the relevant bar
   * @returns {undefined}
   */
  unmarkToVisit = (placeID, index) => {
    axios.post('/api/unmark', { placeID })
      .then(() => {
        this.props.forgoVisitingBar(placeID);
        this.props.removeAttendant(index);
      });
  };

  /**
   * @returns {object} React element
   */
  render() {
    const { userLoggedIn, location, places } = this.props;


    if (userLoggedIn && !location && places === null) {
      return (
        <div>
          <HomeTitle />
          <SearchBar />;
        </div>
      );
    }

    if (userLoggedIn && location && places === null) {
      return (
        <div>
          <HomeTitle />
          <Loader />
        </div>
      );
    }

    if (userLoggedIn && location && places) {
      if (places.length === 0) {
        return (
          <div className="fullwidth flex-coulmn">
            <HomeTitle />
            <SearchBar />
            <p> Sorry, no results for this location </p>
          </div>
        );
      }

      const barsToAttend = this.props.barsToAttend;
      return (
        <div className="fullwidth flex-column">
          <HomeTitle />
          <SearchBar />
          {places.map((p, i) => (
            <BarListItem
              key={p.id}
              name={p.name}
              rating={p.rating}
              attendants={p.attendants_number || 0}
              url={p.url}
              btnLabel={barsToAttend.includes(p.id) ? 'Resign' : 'Attend'}
              btnFunc={barsToAttend.includes(p.id)
                ? () => this.unmarkToVisit(p.id, i)
                : () => this.markToVisit(p.id, p.name, p.rating, i)}
            />
          ))}
        </div>
      );
    }

    if (!userLoggedIn && places) {
      return (
        <div className="fullwidth flex-column horizontal-margin-20">
          <HomeTitle />
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
    return (
      <div>
        <HomeTitle />
        <SearchBar />
      </div>
    );
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
  visitBar: PropTypes.func.isRequired,
  forgoVisitingBar: PropTypes.func.isRequired,
  addAttendant: PropTypes.func.isRequired,
  removeAttendant: PropTypes.func.isRequired,
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
  visitBar: (id) => {
    dispatch(visitBar(id));
  },
  forgoVisitingBar: (id) => {
    dispatch(forgoVisitingBar(id));
  },
  addAttendant: (index) => {
    dispatch(addAttendant(index));
  },
  removeAttendant: (index) => {
    dispatch(removeAttendant(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

