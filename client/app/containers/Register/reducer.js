/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import { REGISTER_ACCT } from './constants';

export const initialState = fromJS({});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ACCT:
      return state;
    default:
      return state;
  }
}

export default registerReducer;
