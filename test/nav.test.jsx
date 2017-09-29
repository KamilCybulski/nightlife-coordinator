import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MemoryRouter, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import Nav from '../client/components/Nav';
import userNotLoggedIn from '../client/store';

const userLoggedIn = {
  user: {
    checkedInDB: true,
    isLoggedIn: true,
    name: 'Marek',
    email: 'ziuziu@ziu.com',
    location: 'warsaw',
  },
};

const userLoggedInStore = createStore(state => state, userLoggedIn);

describe('Nav (user logged in):', () => {
  const navbar = mount(
    <MuiThemeProvider>
      <MemoryRouter>
        <Nav store={userLoggedInStore} />
      </MemoryRouter>
    </MuiThemeProvider>,
  );

  it('Renders 2 buttons', () => {
    expect(navbar.find(FlatButton)).toHaveLength(2);
  });

  it('Renders 1 Link', () => {
    expect(navbar.find(Link)).toHaveLength(1);
  });

  it('Displays greeting', () => {
    expect(navbar.text()).toEqual(expect.stringMatching('Hello Marek!'));
  });
});

describe('Nav (user not logged in:', () => {
  const navbar = mount(
    <MuiThemeProvider>
      <MemoryRouter>
        <Nav store={userNotLoggedIn} />
      </MemoryRouter>
    </MuiThemeProvider>,
  );

  it('Renders 3 buttons', () => {
    expect(navbar.find(FlatButton)).toHaveLength(3);
  });

  it('Renders 3 Links', () => {
    expect(navbar.find(Link)).toHaveLength(3);
  });

  it('Does not display greeting', () => {
    expect(navbar.text()).not.toEqual(expect.stringMatching('Hello'));
  });
});
