import {
  GET_USERS,
  GET_USERS_SUCCESS,
  UPDATE_USERS,
  UPDATE_USERS_SUCCESS,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
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

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USERS_SUCCESS,
    user,
  };
}

export function deleteUser(user) {
  return {
    type: DELETE_USERS,
    user,
  };
}

export function deleteUserSuccess(user) {
  return {
    type: DELETE_USERS_SUCCESS,
    user,
  };
}
