import reducer from '../client/reducers/userReducer';


describe('LOG_IN action:', () => {
  const action = {
    type: 'LOG_IN',
    payload: {
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
    },
  };

  const state = {
    checkedInDB: false,
    isLoggedIn: false,
    name: '',
    email: '',
    location: undefined,
  };

  it('works as intended', () => {
    expect(reducer(state, action)).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: true,
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
    }));
  });
});


describe('LOG_OUT action:', () => {
  const action = { type: 'LOG_OUT' };

  const state = {
    checkedInDB: true,
    isLoggedIn: true,
    name: 'Marek',
    email: 'xxxxx',
    location: 'bumretch',
  };

  it('works as intended', () => {
    expect(reducer(state, action)).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: false,
      name: '',
      email: '',
      location: undefined,
    }));
  });
});

