import reducer from '../client/reducers/userReducer';


describe('LOG_IN action:', () => {
  const action1 = {
    type: 'LOG_IN',
    payload: {
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
      barsToAttend: [],
    },
  };

  const action2 = {
    type: 'LOG_IN',
    payload: {
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
      barsToAttend: ['bar1-id', 'bar2-id'],
    },
  };

  const state = {
    checkedInDB: false,
    isLoggedIn: false,
    name: '',
    email: '',
    location: '',
    barsToAttend: [],
  };

  it('Logs in user with no bars to attend', () => {
    const newState = reducer(state, action1);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: true,
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
    }));
    expect(newState.barsToAttend).toHaveLength(0);
  });

  it('Logs in user with 2 bars to attend', () => {
    const newState = reducer(state, action2);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: true,
      name: 'Marek',
      email: 'ziuziu@ziu.pl',
      location: 'warsaw',
      barsToAttend: expect.arrayContaining(['bar1-id', 'bar2-id']),
    }));
    expect(newState.barsToAttend).toHaveLength(2);
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
    barsToAttend: ['bar1-id', 'bar2-id'],
  };

  it('Logs user out', () => {
    const newState = reducer(state, action);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: false,
      name: '',
      email: '',
      location: '',
    }));
    expect(newState.barsToAttend).toHaveLength(0);
  });
});

describe('MARK_USER_CHECKED action:', () => {
  const action = { type: 'MARK_USER_CHECKED' };

  const state = {
    checkedInDB: false,
    isLoggedIn: false,
    name: '',
    email: '',
    location: '',
    barsToAttend: [],
  };

  it('Only marks the user as checked in DB', () => {
    const newState = reducer(state, action);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: false,
      name: '',
      email: '',
      location: '',
    }));
    expect(newState.barsToAttend).toHaveLength(0);
  });
});

describe('UPDATE_LOCATION action:', () => {
  const state1 = {
    checkedInDB: true,
    isLoggedIn: true,
    name: 'Marek',
    email: 'xxxxx',
    location: 'bumretch',
    barsToAttend: ['bar1-id', 'bar2-id'],
  };

  const state2 = {
    checkedInDB: true,
    isLoggedIn: true,
    name: 'Marek',
    email: 'aaaaaa',
    location: '',
    barsToAttend: [],
  };

  const action = {
    type: 'UPDATE_LOCATION',
    payload: 'gdynia',
  };

  it('Replaces the old location', () => {
    const newState = reducer(state1, action);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: true,
      name: 'Marek',
      email: 'xxxxx',
      location: 'gdynia',
      barsToAttend: expect.arrayContaining(['bar1-id', 'bar2-id']),
    }));
    expect(newState.barsToAttend).toHaveLength(2);
  });

  it('Assigns a new location if user didn\'t have one', () => {
    const newState = reducer(state2, action);

    expect(newState).toEqual(expect.objectContaining({
      checkedInDB: true,
      isLoggedIn: true,
      name: 'Marek',
      email: 'aaaaaa',
      location: 'gdynia',
    }));
    expect(newState.barsToAttend).toHaveLength(0);
  });
});

