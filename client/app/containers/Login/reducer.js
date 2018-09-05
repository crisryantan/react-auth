/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { USER_LOGIN, USER_LOGIN_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state.set('loading', true);

    case USER_LOGIN_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default loginReducer;
