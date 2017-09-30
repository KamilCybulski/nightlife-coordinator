import reducer from '../client/reducers/barsReducer';

describe('LOAD_BARS action:', () => {
  const action = {
    type: 'LOAD_BARS',
    payload: [
      {
        id: 'xxx-warsaw',
        name: 'xxx',
        rating: 5,
        attendants_number: 10,
      },
      {
        id: 'xyz-warsaw',
        name: 'xyz',
        rating: 1,
      },
      {
        id: 'abc-warsaw',
        name: 'abc',
        rating: 3.5,
        attendants_number: 4,
      },
    ],
  };

  const state = [];

  it('works as intended', () => {
    expect(reducer(state, action)).toEqual(expect.objectContaining({
      places: [
        {
          id: 'xxx-warsaw',
          name: 'xxx',
          rating: 5,
          attendants_number: 10,
        },
        {
          id: 'xyz-warsaw',
          name: 'xyz',
          rating: 1,
        },
        {
          id: 'abc-warsaw',
          name: 'abc',
          rating: 3.5,
          attendants_number: 4,
        },
      ],
    }));
  });
});
