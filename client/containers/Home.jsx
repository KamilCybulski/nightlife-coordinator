import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import SearchBar from './SearchBar';
import BarListItem from '../components/BarListItem';

import { loadBars } from '../actions/bars-actions';


class Home extends React.Component {
  componentDidMount = () => {
    this.getBarsData();
  }

  componentDidUpdate = () => {
    this.getBarsData();
  }

  getBarsData = () => {
    const user = this.props.userLoggedIn;
    const location = this.props.location;
    const places = this.props.places;

    if (user && location && places === null) {
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

      return (
        <div className="fullwidth flex-column">
          <SearchBar />
          {places.map(p => (
            <BarListItem
              key={p.id}
              name={p.name}
              rating={p.rating}
              attendants={p.attendants_number || 0}
              btnLabel={'Ima button'}
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
  location: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.object),
  loadBars: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
  location: state.user.location,
  places: state.bars.places,
});

const mapDispatchToProps = dispatch => ({
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

