import {
  GET_USERS,
  GET_USERS_SUCCESS,
  UPDATE_USERS,
  DELETE_USERS,
} from './constants';

export function getUsers() {
  return {
    type: GET_USERS,
  };
}

export function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USERS,
    user,
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USERS,
    id,
  };
}
