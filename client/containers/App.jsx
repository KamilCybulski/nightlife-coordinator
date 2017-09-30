import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { logUserIn } from '../actions/user-actions';
import loadBars from '../actions/bars-actions';

import Nav from '../components/Nav';
import Home from '../containers/Home';
import Login from './Login';
import Signup from './Signup';

injectTapEventPlugin();

class App extends React.Component {
  /**
   * Check if the user is logged in. If so, update the state.
   * @returns {undefined}
   */
  componentDidMount = () => {
    // No rejection handler, cause no reason to do anything on rejection
    axios.get('/api/getuserdata')
      .then((res) => {
        if (res.data.success) {
          const username = res.data.user.username;
          const email = res.data.user.email;
          const location = res.data.user.location;
          this.props.logIn(username, email, location);
          this.props.loadBars(res.data.bars);
        }
      });
  }

  /**
   * @returns {object} React Element
   */
  render() {
    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Nav />
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/login"
                  render={() => (this.props.userLoggedIn ? <Redirect to="/" /> : <Login />)}
                />
                <Route
                  path="/signup"
                  render={() => (this.props.userLoggedIn ? <Redirect to="/" /> : <Signup />)}
                />
              </Switch>
            </main>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  logIn: PropTypes.func.isRequired,
  loadBars: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logIn: (name, email, location) => {
    dispatch(logUserIn(name, email, location));
  },
  loadBars: (bars) => {
    dispatch(loadBars(bars));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
