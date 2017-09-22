import React from 'react';
import { shallow } from 'enzyme';

import App from '../client/containers/App';
import Nav from '../client/components/Nav';

describe('<App />', () => {
  it('Renders <Nav />', () => {
    expect(shallow(<App />).find(Nav).length).toBe(1);
  });
});
