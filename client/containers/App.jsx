import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Nav from '../components/Nav';
import Home from '../components/Home';
import Login from './Login';
import Signup from './Signup';

injectTapEventPlugin();

const App = () => (
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

export default App;
