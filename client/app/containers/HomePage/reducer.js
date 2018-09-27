/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  UPDATE_USERS,
  UPDATE_USERS_SUCCESS,
  FAILED_REQUEST,
} from './constants';

export const initialState = fromJS({
  loading: false,
  users: [],
});

function findIndex(list, user) {
  return list.findIndex(listItem => listItem.get('_id') === user._id);
}

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
    case DELETE_USERS:
    case UPDATE_USERS:
      return state.set('loading', true);

    case GET_USERS_SUCCESS:
      return state.set('loading', false).set('users', fromJS(action.users));

    case UPDATE_USERS_SUCCESS:
      const indexOfUser = findIndex(state.get('users'), action.user);
      return state
        .set('loading', false)
        .setIn(['users', indexOfUser], fromJS(action.user));

    case DELETE_USERS_SUCCESS: {
      return state
        .set('loading', false)
        .set(
          'users',
          state.get('users').filter(user => user.get('_id') !== action.id),
        );
    }

    case FAILED_REQUEST:
      return state.set('loading', false);

    default:
      return state;
  }
}

export default homePageReducer;
