import { fromJS } from 'immutable';
import registerReducer from '../reducer';

describe('registerReducer', () => {
  it('returns the initial state', () => {
    expect(registerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
