import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Login from '../client/containers/Login';
import store from '../client/store';

describe('Login:', () => {
  const component = mount(
    <MuiThemeProvider>
      <MemoryRouter>
        <Login store={store} />
      </MemoryRouter>
    </MuiThemeProvider>,
  );

  it('Renders 2 TextFields', () => {
    expect(component.find(TextField)).toHaveLength(2);
  });

  it('Renders 1 button', () => {
    expect(component.find(RaisedButton)).toHaveLength(1);
  });
});
