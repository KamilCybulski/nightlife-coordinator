import reducer from '../client/reducers/barsReducer';
import { addAttendant, removeAttendant } from '../client/actions/bars-actions';

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
        attendants_number: 0,
      },
      {
        id: 'abc-warsaw',
        name: 'abc',
        rating: 3.5,
        attendants_number: 4,
      },
    ],
  };

  const state1 = {
    places: null,
  };

  const state2 = {
    places: [],
  };

  const state3 = {
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
  };

  it('Replaces null with new bars', () => {
    const newState = reducer(state1, action);

    expect(newState.places[0].id).toBe('xxx-warsaw');
    expect(newState.places[1].id).toBe('xyz-warsaw');
    expect(newState.places[2].id).toBe('abc-warsaw');
    expect(newState.places).toHaveLength(3);
  });

  it('Replaces empty array with new bars', () => {
    const newState = reducer(state2, action);

    expect(newState.places[0].id).toBe('xxx-warsaw');
    expect(newState.places[1].id).toBe('xyz-warsaw');
    expect(newState.places[2].id).toBe('abc-warsaw');
    expect(newState.places).toHaveLength(3);
  });

  it('Replaces a populated array with new bars', () => {
    const newState = reducer(state3, action);

    expect(newState.places[0].id).toBe('xxx-warsaw');
    expect(newState.places[1].id).toBe('xyz-warsaw');
    expect(newState.places[2].id).toBe('abc-warsaw');
    expect(newState.places).toHaveLength(3);
  });
});


describe('CLEAR_BARS action:', () => {
  const action = { type: 'CLEAR_BARS' };

  const state1 = {
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
        attendants_number: 0,
      },
      {
        id: 'abc-warsaw',
        name: 'abc',
        rating: 3.5,
        attendants_number: 4,
      },
    ],
  };

  const state2 = {
    places: [],
  };

  const state3 = {
    places: null,
  };

  it('Replaces populated array with null', () => {
    const newState = reducer(state1, action);
    expect(newState.places).toBe(null);
  });

  it('Replaces empty array with null', () => {
    const newState = reducer(state2, action);
    expect(newState.places).toBe(null);
  });

  it('If places array is empty, does not change it', () => {
    const newState = reducer(state3, action);
    expect(newState.places).toBe(null);
  });
});


describe('ADD_ATTENDANT action:', () => {
  const state = {
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
        attendants_number: 0,
      },
      {
        id: 'abc-warsaw',
        name: 'abc',
        rating: 3.5,
        attendants_number: 4,
      },
    ],
  };

  const action = addAttendant(0);

  it('Increases the attendants number in correct bar entry', () => {
    const newState = reducer(state, action);

    expect(newState.places[0].attendants_number).toBe(11);
    expect(newState.places[1].attendants_number).toBe(0);
    expect(newState.places[2].attendants_number).toBe(4);
  });
});


describe('REMOVE_ATTENDANT action:', () => {
  const state = {
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
        attendants_number: 0,
      },
      {
        id: 'abc-warsaw',
        name: 'abc',
        rating: 3.5,
        attendants_number: 4,
      },
    ],
  };

  const action = removeAttendant(2);

  it('Decreases the attendants number in correct bar entry', () => {
    const newState = reducer(state, action);

    expect(newState.places[0].attendants_number).toBe(10);
    expect(newState.places[1].attendants_number).toBe(0);
    expect(newState.places[2].attendants_number).toBe(3);
  });
});
