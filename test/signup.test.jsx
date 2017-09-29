import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Signup from '../client/containers/Signup';
import store from '../client/store';

describe('Signup:', () => {
  const component = mount(
    <MuiThemeProvider>
      <MemoryRouter>
        <Signup store={store} />
      </MemoryRouter>
    </MuiThemeProvider>,
  );

  it('Renders 3 TextFields', () => {
    expect(component.find(TextField)).toHaveLength(3);
  });

  it('Renders 1 button', () => {
    expect(component.find(RaisedButton)).toHaveLength(1);
  });
});
