import { fromJS } from 'immutable';
import app2Reducer from '../reducer';

describe('app2Reducer', () => {
  it('returns the initial state', () => {
    expect(app2Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
