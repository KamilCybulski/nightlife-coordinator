import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter, Link } from 'react-router-dom';

import initialStore from '../client/store';
import Nav from '../client/components/Nav';
import NavElements from '../client/components/NavElements';
import NavButtons from '../client/components/NavButtons';
import GuestNavButtons from '../client/components/GuestNavButtons';
import UserNavButtons from '../client/components/UserNavButtons';
import LogoutButton from '../client/components/LogoutButton';

// A function to mount the desired component wrapped in MuiThemeProvider, 
// MemoryRouter and Provider with given store
const mountWithStore = (component, store) => mount(
  <MuiThemeProvider>
    <MemoryRouter>
      <Provider store={store}>
        {component}
      </Provider>
    </MemoryRouter>
  </MuiThemeProvider>,
);

// A functions to mount the desired component wrapped in MuiThemeProvider and 
// MemoryRouter
const mountWithNoStore = component => mount(
  <MuiThemeProvider>
    <MemoryRouter>
      {component}
    </MemoryRouter>
  </MuiThemeProvider>,
);

// A dummy store to to simulate a situation where user is not logged in, and
// the app has already checked that
const userCheckedStore = createStore(s => s, {
  user: {
    checkedInDB: true,
    isLoggedIn: false,
    name: '',
    email: '',
    location: '',
    barsToAttend: [],
  },
  bars: {
    places: [],
  },
});

// A dummy store to simulate a situation where user is logged in
const userLoggedStore = createStore(s => s, {
  user: {
    checkedInDB: true,
    isLoggedIn: true,
    name: 'John',
    email: 'john@hell.com',
    location: '',
    barsToAttend: [],
  },
  bars: {
    places: [],
  },
});

describe('Nav', () => {
  const component = mountWithStore(<Nav />, initialStore);

  it('Renders an AppBar', () => {
    expect(component.find(AppBar)).toHaveLength(1);
  });
});


describe('NavElements', () => {
  const componentNotChecked = mountWithStore(<NavElements />, initialStore);
  const componentChecked = mountWithStore(<NavElements />, userCheckedStore);

  it('Does not render anything if user is not checked in DB', () => {
    expect(componentNotChecked.children()).toHaveLength(0);
  });

  it('Renders NavButtons if user is checked in DB', () => {
    expect(componentChecked.find(NavButtons)).toHaveLength(1);
  });
});


describe('NavButtons', () => {
  const componentUserLogged = mountWithStore(<NavButtons />, userLoggedStore);
  const componentUserNotLogged = mountWithStore(
    <NavButtons />,
    userCheckedStore,
  );

  it('Renders GuestNavButtons if user is not logged in', () => {
    expect(componentUserNotLogged.find(GuestNavButtons)).toHaveLength(1);
  });
  it('Does not render UserNavButtons if user is not logged in', () => {
    expect(componentUserNotLogged.find(UserNavButtons)).toHaveLength(0);
  });

  it('Renders UserNavButtons if user is logged in', () => {
    expect(componentUserLogged.find(UserNavButtons)).toHaveLength(1);
  });
  it('Does not render GuestNavButtons if user is logged in', () => {
    expect(componentUserLogged.find(GuestNavButtons)).toHaveLength(0);
  });
});


describe('GuestNavButtons', () => {
  const component = mountWithNoStore(<GuestNavButtons />);

  it('Renders three Links', () => {
    expect(component.find(Link)).toHaveLength(3);
  });

  it('Renders three FlatButtons', () => {
    expect(component.find(FlatButton)).toHaveLength(3);
  });
});

describe('UserNavButtons', () => {
  const component = mountWithStore(<UserNavButtons />, userLoggedStore);

  it('Renders one Link', () => {
    expect(component.find(Link)).toHaveLength(1);
  });

  it('Renders two FlatButtons', () => {
    // Two, because LogoutButton is, in fact, a FlatButton
    expect(component.find(FlatButton)).toHaveLength(2);
  });

  it('Renders one LogoutButton', () => {
    expect(component.find(LogoutButton)).toHaveLength(1);
  });

  it('Renders greeting', () => {
    expect(component.text()).toEqual(expect.stringMatching('Hello John!'));
  });
});
