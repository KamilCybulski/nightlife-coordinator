import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Home from '../client/containers/Home';
import SearchBar from '../client/containers/SearchBar';
import BarListItem from '../client/components/BarListItem';
import Loader from '../client/components/Loader';

const prepareHomeComponent = (state) => {
  const store = createStore(s => s, state);
  return mount(
    <MuiThemeProvider>
      <Provider store={store}>
        <Home />
      </Provider>
    </MuiThemeProvider>,
  );
};


describe('Home (user logged, no location, no bars):', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: true,
      isLoggedIn: true,
      email: 'xxx',
      name: 'John',
      location: '',
    },
    bars: {
      places: null,
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(1);
  });

  it('Does not render any BarListItem', () => {
    expect(home.find(BarListItem)).toHaveLength(0);
  });

  it('Does not render Loader', () => {
    expect(home.find(Loader)).toHaveLength(0);
  });
});


describe('Home (user logged, location defined, no bars):', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: true,
      isLoggedIn: true,
      email: 'xxx',
      name: 'John',
      location: 'warsaw',
    },
    bars: {
      places: null,
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders Loader', () => {
    expect(home.find(Loader)).toHaveLength(1);
  });

  it('Does not render SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(0);
  });

  it('Does not render any BarListItem', () => {
    expect(home.find(BarListItem)).toHaveLength(0);
  });
});


describe('Home (user logged, both location and bars defined):', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: true,
      isLoggedIn: true,
      email: 'xxx',
      name: 'John',
      location: 'warsaw',
    },
    bars: {
      places: [
        {
          id: 'xxx-gdynia',
          name: 'xxx',
          rating: 5,
          attendants_number: 10,
        },
        {
          id: 'xyz-gdynia',
          name: 'xyz',
          rating: 1,
          attendants_number: 0,
        },
        {
          id: 'abc-gdynia',
          name: 'abc',
          rating: 3.5,
          attendants_number: 4,
        },
      ],
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(1);
  });

  it('Renders 3 BarListItems', () => {
    expect(home.find(BarListItem)).toHaveLength(3);
  });

  it('Does not render Loader', () => {
    expect(home.find(Loader)).toHaveLength(0);
  });
});


describe('Home (user logged, location defined, bars is empty array):', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: true,
      isLoggedIn: true,
      email: 'xxx',
      name: 'John',
      location: 'warsaw',
    },
    bars: {
      places: [],
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(1);
  });

  it('Does not render BarListItems', () => {
    expect(home.find(BarListItem)).toHaveLength(0);
  });

  it('Does not render Loader', () => {
    expect(home.find(Loader)).toHaveLength(0);
  });
});


describe('Home (user not logged, no bars):', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: false,
      isLoggedIn: false,
      email: '',
      name: '',
      location: '',
    },
    bars: {
      places: null,
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(1);
  });

  it('Does not render BarListItems', () => {
    expect(home.find(BarListItem)).toHaveLength(0);
  });

  it('Does not render Loader', () => {
    expect(home.find(Loader)).toHaveLength(0);
  });
});

describe('Home (user not logged, bars is array of 3', () => {
  const state = {
    user: {
      barsToAttend: [],
      checkedInDB: false,
      isLoggedIn: false,
      email: '',
      name: '',
      location: '',
    },
    bars: {
      places: [
        {
          id: 'xxx-gdynia',
          name: 'xxx',
          rating: 5,
          attendants_number: 10,
        },
        {
          id: 'xyz-gdynia',
          name: 'xyz',
          rating: 1,
          attendants_number: 0,
        },
        {
          id: 'abc-gdynia',
          name: 'abc',
          rating: 3.5,
          attendants_number: 4,
        },
      ],
    },
  };

  const home = prepareHomeComponent(state);

  it('Renders SearchBar', () => {
    expect(home.find(SearchBar)).toHaveLength(1);
  });

  it('Renders 3 BarListItems', () => {
    expect(home.find(BarListItem)).toHaveLength(3);
  });

  it('Does not render Loader', () => {
    expect(home.find(Loader)).toHaveLength(0);
  });
});
