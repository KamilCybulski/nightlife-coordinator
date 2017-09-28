import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logUserIn from '../actions/user-actions';

import Nav from '../components/Nav';
import Home from '../components/Home';
import Login from './Login';
import Signup from './Signup';

injectTapEventPlugin();

class App extends React.Component {
  /**
   * Check if the user is loggeg in. If so, update the state.
   * @returns {undefined}
   */
  componentDidMount = () => {
    // No rejection handler, cause no reason to do anything on rejection
    axios.get('/api/auth')
      .then((res) => {
        if (res.data.username) {
          const { username, email, location } = res.data;
          this.props.logIn(username, email, location);
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
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
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
};

const mapStateToProps = state => ({
  userLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  logIn: (name, email, location) => {
    dispatch(logUserIn(name, email, location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
