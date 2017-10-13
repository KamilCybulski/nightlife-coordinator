import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { mount } from 'enzyme';

import BarListItem from '../client/components/BarListItem';

describe('BarListItem', () => {
  const userLoggedProps = {
    name: 'Honolulu',
    rating: 5,
    attendants: 10,
    url: 'www.google.com',
    address: 'Hoza 10',
    phone: '666 666 666',
    imgUrl: 'https://dummyimage.com/mediumrectangle/222222/eeeeee',
    btnLabel: 'Attend',
    btnFunc: jest.fn(),
  };

  const userNotLoggedProps = {
    name: 'Honolulu',
    rating: 5,
    attendants: 1,
    url: 'www.google.com',
    address: 'Hoza 10',
    phone: '666 666 666',
    imgUrl: 'https://dummyimage.com/mediumrectangle/222222/eeeeee',
  };

  const noAttendantsProps = {
    name: 'Honolulu',
    rating: 5,
    attendants: 0,
    url: 'www.google.com',
    address: 'Hoza 10',
    phone: '666 666 666',
    imgUrl: 'https://dummyimage.com/mediumrectangle/222222/eeeeee',
  };

  const userLoggedItem = mount(
    <MuiThemeProvider>
      <BarListItem {...userLoggedProps} />
    </MuiThemeProvider>,
  );
  const userNotLoggedItem = mount(
    <MuiThemeProvider>
      <BarListItem {...userNotLoggedProps} />
    </MuiThemeProvider>,
  );
  const noAttendantsItem = mount(
    <MuiThemeProvider>
      <BarListItem {...noAttendantsProps} />
    </MuiThemeProvider>,
  );

  it('Renders a bars name', () => {
    expect(userLoggedItem.text()).toEqual(expect.stringMatching('Honolulu'));
    expect(userNotLoggedItem.text()).toEqual(expect.stringMatching('Honolulu'));
  });

  it('Properly describes the number of attendants', () => {
    expect(userLoggedItem.text()).toEqual(expect.stringMatching('10 people are going there.'));
    expect(userNotLoggedItem.text()).toEqual(expect.stringMatching('Only one person is going there'));
    expect(noAttendantsItem.text()).toEqual(expect.stringMatching('Nobody is going there.'));
  });

  it('Shows bars rating', () => {
    expect(userLoggedItem.text()).toEqual(expect.stringMatching('Rating 5'));
    expect(userNotLoggedItem.text()).toEqual(expect.stringMatching('Rating 5'));
  });

  it('Renders an anchor tag', () => {
    expect(userLoggedItem.find('a')).toHaveLength(1);
  });

  it('Renders an image', () => {
    expect(userNotLoggedItem.find('img')).toHaveLength(1);
  });

  it('Displays an address', () => {
    expect(noAttendantsItem.text()).toEqual(expect.stringMatching('Hoza 10'));
  });

  it('Displays a phone number', () => {
    expect(noAttendantsItem.text()).toEqual(expect.stringMatching('666 666 666'));
  });

  it('Renders a FlatButton if user is logged in', () => {
    expect(userLoggedItem.find(FlatButton)).toHaveLength(1);
  });

  it('Does not render FlatButton if user not logged in', () => {
    expect(userNotLoggedItem.find(FlatButton)).toHaveLength(0);
  });
});
