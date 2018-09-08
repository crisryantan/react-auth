/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  // DELETE_USERS,
  // DELETE_USERS_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  users: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state.set('loading', true);

    case GET_USERS_SUCCESS:
      return state.set('loading', false).set('users', fromJS(action.users));

    default:
      return state;
  }
}

export default homePageReducer;
