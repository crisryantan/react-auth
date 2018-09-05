/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { USER_LOGOUT, USER_LOGIN_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: true,
  authorized: false,
  user: undefined,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return state
        .set('loading', false)
        .set('authorized', false)
        .set('error', false)
        .set('user', undefined);

    case USER_LOGIN_SUCCESS:
      return state
        .set('user', action.user)
        .set('authorized', true)
        .set('loading', false);

    default:
      return state;
  }
}

export default appReducer;
